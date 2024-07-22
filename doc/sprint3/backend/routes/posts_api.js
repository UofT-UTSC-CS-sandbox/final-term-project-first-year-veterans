const express = require('express');
const router = express.Router();
const { convertNeo4jTypes } = require('../helper_functions/neo4jTypes');

router.use(express.json());

// connect to neo4j
const { driver, getSession } = require("../neo4j.js");

let id = 3;

let commentList = [];
let postsList = [];

let DB = [
  { postid: 1, userId: "Richie_Hsieh", postTitle: "Introduction 1", postMessage: "My name is Richie! This is my first post", likeCount: 100, comments: [{userId: "Andy", comment: "Love it!", postidentification: 1}, {userId: "Ethan", comment: "Love it as well!", postidentification: 1}] },
  { postid: 2, userId: "Andy", postTitle: "Introduction 2", postMessage: "My name is Andy! This is my first post", likeCount: 0, comments: [{userId: "Richie_Hsieh", comment: "Love it!", postidentification: 2}] }
];

router.get('/api/posts/fetch/:uid', async function (req, res) {
  const session = getSession();
  // tx is a transaction object, make sure either complete all the queries or none
  const tx = session.beginTransaction();

  console.log("Fetching Post Data");
  const searcher_uid = parseInt(req.params.value, 10);

  try {
    let result = await tx.run(
      `
      MATCH (p:Post)
      RETURN p as node
      ORDER BY id(p) DESC
      `, {});
    postsList = [];
    result.records.forEach(record => {
      //store results of query into list
      let nodeProperties = record.get('node').properties;
      nodeProperties = convertNeo4jTypes(nodeProperties);
      postsList.push({postid: nodeProperties.pid, postTitle: nodeProperties.title, postMessage: nodeProperties.content, likeCount: nodeProperties.likes});
    });
    //this is the part where we add the comments
    for (let i = 0; i < postsList.length; i++){
      let comments = await tx.run(
      `
      MATCH (p:Post)-[:HAS_COMMENT]->(c:Comment)
      WHERE id(p) = $results
      RETURN c AS node
      `, {results: postsList[i].postid});
      let result2 = await tx.run(`
        MATCH (u:User)-[:POSTED]->(p:Post)
        WHERE id(p) = $results
        RETURN u AS node
        `, {results: postsList[i].postid});
      let uid = convertNeo4jTypes(result2.records[0].get('node').properties);
      postsList[i]["userId"] = uid.uid;
      commentList = [];
      comments.records.forEach(record => {
        //store results of query into list
        let nodeProperties2 = record.get('node').properties;
        nodeProperties2 = convertNeo4jTypes(nodeProperties2);
        commentList.push({comment: nodeProperties2.content, postidentification: postsList[i].postid});
      });//turn the comments into a list
      //we're gonna need to add uid to comments
      for (let j = 0; j < commentList.length; j++) {
        let result3 = await tx.run(`
          MATCH (u:User)-[:COMMENTED]->(c:Comment)<-[:HAS_COMMENT]-(p:Post)
          WHERE p.pid = $results AND c.content = $results2
          RETURN u AS node
          `, {results: postsList[i].postid, results2: commentList[j].comment});
        let cuid = convertNeo4jTypes(result3.records[0].get('node').properties);
        commentList[j]["userId"] = cuid.uid; // Error here
      }
      postsList[i]["comments"] = commentList;//attach the comments into the post object

      //time to check for liked or not
      let result4 = await tx.run(`
        MATCH (u:User)-[c:LIKED]->(p:Post)
        WHERE u.uid = $uid AND p.pid = $pid
        RETURN count(c) AS number
        `, {uid: searcher_uid, pid: postsList[i].postid});
      let liked = convertNeo4jTypes(result4.records[0].get('number').low);
      if (parseInt(liked) > 0) {
        postsList[i]["isLikedByMe"] = 1;
      }
      else {
        postsList[i]["isLikedByMe"] = 0;
      }
    }
    console.log(postsList);
    res.status(200).json(postsList); //return the posts
  } catch (error) {
    await tx.rollback();
    console.error('Error fetching posts: ', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await session.close();
  }
});

router.get('/api/posts/fetch_newest/:uid', async function (req, res) {
  const session = getSession();
  // tx is a transaction object, make sure either complete all the queries or none
  const tx = session.beginTransaction();

  console.log("Fetching Newest");
  
  const searcher_uid = parseInt(req.params.value, 10);

  try {
    let result = await tx.run(
      `
      MATCH (p:Post)
      RETURN p as node
      ORDER BY id(p) DESC
      LIMIT 1
      `, {});
    const latestPost = convertNeo4jTypes(result.records[0].get('node').properties);
    let comments = await tx.run(
      `
      MATCH (p:Post)-[:HAS_COMMENT]->(c:Comment)
      WHERE id(p) = $results
      RETURN c AS node
      `, {results: latestPost.pid});
      let result2 = await tx.run(`
        MATCH (u:User)-[:POSTED]->(p:Post)
        WHERE id(p) = $results
        RETURN u AS node
        `, {results: latestPost.pid});
      let uid = convertNeo4jTypes(result2.records[0].get('node').properties);
    commentList = [];
    comments.records.forEach(record => {
      //store results of query into list
      let nodeProperties = record.get('node').properties;
      nodeProperties = convertNeo4jTypes(nodeProperties);
      commentList.push({comment: nodeProperties.content, postidentification: latestPost.pid});
    });//turn the comments into a list
    //we're gonna need to add uid to comments
    for (let j = 0; j < commentList.length; j++) {
      let result3 = await tx.run(`
        MATCH (u:User)-[:COMMENTED]->(c:Comment)<-[:HAS_COMMENT]-(p:Post)
        WHERE p.pid = $results AND c.content = $results2
        RETURN u AS node
        `, {results: latestPost.pid, results2: commentList[j].comment});
      let cuid = convertNeo4jTypes(result3.records[0].get('node').properties);
      commentList[j]["userId"] = cuid.uid;
    }
    
    //time to check for liked or not
    let result4 = await tx.run(`
      MATCH (u:User)-[c:LIKED]->(p:Post)
      WHERE u.uid = $uid AND p.pid = $pid
      RETURN count(c) AS number
      `, {uid: searcher_uid, pid: latestPost.pid});
    let liked = convertNeo4jTypes(result4.records[0].get('number').low);
    let likedByMe = 0;
    if (parseInt(liked) > 0) {
      likedByMe = 1;
    }
    const parsedPost = {postid: latestPost.pid, postTitle: latestPost.title, postMessage: latestPost.content, likeCount: latestPost.likes, userId: uid.uid, comments: commentList, isLikedByMe: likedByMe};
    console.log(parsedPost);
    res.status(200).json(parsedPost); //return the post
} catch (error) {
    await tx.rollback();
    console.error('Error fetching post: ', error);
    res.status(500).json({ message: 'Internal server error' });
} finally {
    await session.close();
}
});

router.post('/api/posts/create', async function (req, res) {
  console.log('Server received: POST /api/post/create');
  let post_data = req.body;
  const userId = post_data.userId;
  const title = post_data.postTitle;
  const body = post_data.postMessage;

  const session = getSession();
  // tx is a transaction object, make sure either complete all the queries or none
  const tx = session.beginTransaction();

  // for some reason a post has a timestamp
  // note that time is in UTC for consistency
  // format is YYYY-MM-DDThh:mm:ss.mili (T is just the letter T, as a way to demarcate between date and time) as a string
  // who decided this was a good idea
  const date = new Date();
  const timestamp = date.getUTCFullYear().toString() + "-" + (date.getUTCMonth() + 1).toString().padStart(2, '0') + "-" + date.getUTCDate().toString().padStart(2, '0')
      + "T" + date.getUTCHours().toString().padStart(2, '0') + ":" + date.getUTCMinutes().toString().padStart(2, '0') + ":" + date.getUTCSeconds().toString().padStart(2, '0')
      + "." + date.getUTCMilliseconds().toString();

  try {
    let result = await tx.run(
        `
        CREATE (p:Post {title: $title, content: $content, comments_count: 0, likes: 0, pid: 0, saves: 0, timestamp: datetime($timestamp), visibility: 'public'})
        SET p.pid = id(p)
        RETURN p AS node
        `, { title: title, content: body, uid: userId, timestamp: timestamp });
    let post = convertNeo4jTypes(result.records[0].get('node').properties);
    console.log(post);
    await tx.run(
      `
      MATCH (u:User {uid: $uid}), (p:Post {pid: $pid})
      CREATE (u)-[:POSTED]->(p)
      `,{uid: userId, pid: post.pid});
    await tx.commit();
    res.status(200).json({postid: post.pid, postTitle: post.title, postMessage: post.content, likeCount: 0, userId: userId, comments: [], isLikedByMe: 0}); //return the post created
  } catch (error) {
      await tx.rollback();
      console.error('Error creating post: ', error);
      res.status(500).json({ message: 'Internal server error' });
  } finally {
      await session.close();
  }
});

router.post('/api/posts/update_like', async function (req, res) {
  const pid = req.body.pid;
  const uid = req.body.uid;

  console.log(`Updating likes on post ${pid}`)

  const session = getSession();
  // tx is a transaction object, make sure either complete all the queries or none
  const tx = session.beginTransaction();

  try {
    let query1 = `MATCH (n:Post {pid: $pid})<-[:LIKED]-(u:User {uid: $uid})
                  RETURN n AS node`;
    const params1 = { uid: uid, pid: pid }; // Use params to plog in search_data.query to prevent SQL injection
    let post = await tx.run(query1, params1);

    console.log('length: ', post.records.length);

    let query2;
    let nowlike = 0;

    if (post.records.length === 0) {
      nowlike = 1;
      query2 = `MATCH (p:Post {pid: $pid}), (u:User {uid: $uid})
                CREATE (u)-[:LIKED]->(p)
                SET p.likes = p.likes + 1
                RETURN p as node`;
    } else {
      nowlike = 0;
      query2 = `MATCH (p:Post {pid: $pid})<-[r:LIKED]-(u:User {uid: $uid})
                DELETE r
                WITH p
                SET p.likes = p.likes - 1
                RETURN p as node`;
    }
    console.log('nowlike:', nowlike);
    let params2 = {uid: uid, pid: pid};
    let result = await tx.run(query2, params2);

    let updated_post = convertNeo4jTypes(result.records[0].get('node').properties);
    console.log(updated_post);

    await tx.commit();
    console.log(`successfully updated post ${pid}`);
    res.status(200);
    res.json({updated_post: updated_post, nowlike: nowlike}); //return the updated post
  }
  catch (error) {
    await tx.rollback();
    console.error("error liking: ", error);
    res.status(500).send('Internal Server Error');
  }
  finally {
    await session.close();
  }
});

router.post('/api/posts/add_new_comment/:postId', async function (req, res) {
  const postId = parseInt(req.params.postId, 10);
  const { userId, comment } = req.body; // Destructure userId and comment from req.body directly
  console.log(userId);
  const session = getSession();
  // tx is a transaction object, make sure either complete all the queries or none
  const tx = session.beginTransaction();
  console.log(postId);
  try {
    let query1 = "MATCH (n:POST {pid: $pid}) RETURN n AS node ";
    const params1 = {pid: postId}; // Use params to plog in search_data.query to prevent SQL injection
    let post = await tx.run(query1, params1);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    let result = await tx.run(
      `
      CREATE (c:Comment {content: $comment, timestamp: datetime(), likes: 0, dislikes: 0})
      RETURN c AS node, id(c) AS id
      `, { userId: userId, comment: comment, pid: postId });
    let newcomment = convertNeo4jTypes(result.records[0].get('node').properties);
    console.log(result.records[0].get('id').low);
    await tx.run(
      `
      MATCH (u:User {uid: $uid}), (c:Comment)
      WHERE id(c) = $id
      CREATE (u)-[:COMMENTED]->(c)
      `,{uid: userId, id: result.records[0].get('id').low});
    await tx.run(
      `
      MATCH (p:Post {pid: $pid}), (c:Comment)
      WHERE id(c) = $id
      CREATE (p)-[:HAS_COMMENT]->(c)
      `,{pid: postId, id: result.records[0].get('id').low});
    await tx.commit();
    console.log(`Adding new comment to post ${postId}`);
    res.status(200).json({userId: userId, comment: comment, postidentification: postId}); //return the comment created
  }
  catch (error) {
    await tx.rollback();
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  finally {
    await session.close();
  }
});



router.get('/api/posts/:postId/comments', async function (req, res) {
  const postId = parseInt(req.params.postId, 10);

  const session = getSession();
  // tx is a transaction object, make sure either complete all the queries or none
  const tx = session.beginTransaction();

  try {
    let query1 = "MATCH (n:POST {pid: $pid}) RETURN n AS node ";
    const params1 = {pid: postId}; // Use params to plog in search_data.query to prevent SQL injection
    let post = await tx.run(query1, params1);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    let comments = await tx.run(
      `
      MATCH (p:Post)-[:HAS_COMMENT]->(c:Comment)
      WHERE id(p) = $results
      RETURN c AS node
      `, {results: postId});
    commentList = [];
    comments.records.forEach(record => {
      //store results of query into list
      let nodeProperties2 = record.get('node').properties;
      nodeProperties2 = convertNeo4jTypes(nodeProperties2);
      commentList.push({comment: nodeProperties2.content, postidentification: postId});
    });//turn the comments into a list
    //we're gonna need to add uid to comments
    for (let j = 0; j < commentList.length; j++) {
      let result3 = await tx.run(`
        MATCH (u:User)-[:COMMENTED]->(c:Comment)<-[:HAS_COMMENT]-(p:Post)
        WHERE p.pid = $results AND c.content = $results2
        RETURN u AS node
        `, {results: postId, results2: commentList[j].comment});
      let cuid = convertNeo4jTypes(result3.records[0].get('node').properties);
      commentList[j]["userId"] = cuid.uid;
    }
    console.log(`Retrieving comments from post ${postId}`);
    res.status(200);
    res.json(commentList); //send the comments over
  }
  catch (error) {
    await tx.rollback();
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  finally {
    await session.close();
  }
});

// Need to fix
router.get('/api/expandedposts/:postId', (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const post = DB.find(p => p.postid === postId);

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  res.status(200).send(post);
});

module.exports = router;