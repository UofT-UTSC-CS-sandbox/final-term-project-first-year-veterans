const express = require('express');
const router = express.Router();

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

router.get('/api/posts/fetch', async function (req, res) {
  const session = getSession();
  // tx is a transaction object, make sure either complete all the queries or none
  const tx = session.beginTransaction();

  console.log("Fetching Post Data");

  try {
    let result = await tx.run(
      `
      MATCH (p:Post)
      RETURN p as node
      ORDER BY id(p) DESC
      `, {});

    result.records.forEach(record => {
      //store results of query into list
      let nodeProperties = record.get('node').properties;
      nodeProperties = convertNeo4jTypes(nodeProperties);
      postsList.push(nodeProperties);
    });
    //this is the part where we add the comments
    for (let i = 0; i < postsList.length; i++){
      let comments = await tx.run(
      `
      UNWIND $results AS result 
      MATCH (p)-[:HAS_COMMENT]->(c)
      WHERE id(p) = result.id
      RETURN c AS node
      `, {});
      commentList = [];
      comments.records.forEach(record => {
        //store results of query into list
        let nodeProperties = record.get('node').properties;
        nodeProperties = convertNeo4jTypes(nodeProperties);
        commentList.push(nodeProperties);
      });//turn the comments into a list
      postsList[i]["comments"] = commentList;//attach the comments into the post object
    }
    res.status(200).json(postsList); //return the posts
  } catch (error) {
    await tx.rollback();
    console.error('Error fetching posts: ', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await session.close();
  }
});

router.get('/api/posts/fetch_newest', async function (req, res) {
  const session = getSession();
  // tx is a transaction object, make sure either complete all the queries or none
  const tx = session.beginTransaction();

  console.log("Fetching Newest");

  try {
    let result = await tx.run(
      `
      MATCH (p:Post)
      RETURN p as node
      ORDER BY id(p) DESC
      LIMIT 1
      `, {}).toObject();
    const latestPost = result.records[0].get('node').properties;
    let comments = await tx.run(
      `
      UNWIND $results AS result 
      MATCH (p)-[:HAS_COMMENT]->(c)
      WHERE id(p) = result.id
      RETURN c AS node
      `, {results: latestPost});
    commentList = [];
    comments.records.forEach(record => {
      //store results of query into list
      let nodeProperties = record.get('node').properties;
      nodeProperties = convertNeo4jTypes(nodeProperties);
      commentList.push(nodeProperties);
    });//turn the comments into a list
    latestPost["comments"] = commentList;//attach the comments into the post object
    res.status(200).json(latestPost); //return the post
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
  const ID = post_data.userID;
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
      + "T" + date.getUTCHours().toString().padStart(2, '0') + ":" + date.getUTCMinutes.toString().padStart(2, '0') + ":" + date.getUTCSeconds().toString().padStart(2, '0')
      + "." + date.getUTCMilliseconds().toString();

  try {
      let result = await tx.run(
          `
          CREATE (p:Post {title: $title, content: $content, comments_count: 0, likes: 0, pid: 0, saves: 0, timestamp: datetime($timestamp), visibility: 'public'})
          SET p.pid = id(p);
          MATCH (u:User {uid: $uid})
          CREATE (u)-[:POSTED]->(p)
          RETURN p AS node
          `, { title: title, content: body, uid: ID, timestamp: timestamp });
      res.status(200).json({ message: 'Post Created', result: result}); //return the post created
  } catch (error) {
      await tx.rollback();
      console.error('Error creating post: ', error);
      res.status(500).json({ message: 'Internal server error' });
  } finally {
      await session.close();
  }
});

router.post('/api/posts/update_like/:postId', async function (req, res) {
  const postId = parseInt(req.params.postId, 10);
  const newLikeCount = req.body.likeCount;

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

    let query2 = `MATCH (p:Post {pid: $pid})
                  SET p.likes = $newLikeCount;
                  RETURN p as node
                  `;
    let params2 = {newLikeCount: newLikeCount, pid: postId};
    let updated_post = await tx.run(query2, params2);
    console.log(`Updating likes on post ${postId}`);
    res.status(200);
    res.json(updated_post); //return the updated post
  }
  catch {
    await tx.rollback();
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  finally {
    await session.close();
  }
});

router.post('/api/posts/add_new_comment/:postId', async function (req, res) {
  const postId = parseInt(req.params.postId, 10);
  const { userId, comment } = req.body; // Destructure userId and comment from req.body directly

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

    let query2 = `CREATE (n:Comment {uid: $userId, content: $comment})
                  MATCH (p:Post {pid: $pid})
                  CREATE (p)-[:HAS_COMMENT]->(n)
                  MATCH (u:User {uid: $userId})
                  CREATE (u)-[:COMMENTED]->(n)
                  SET p.comments_count = p.comments_count + 1;
                  RETURN n as node
                  `;
    let params2 = {userId: userId, comment: comment, pid: postId};
    let new_comment = await tx.run(query2, params2);
    console.log(`Adding new comment to post ${postId}`);
    res.status(200);
    res.json(new_comment); //this now sends the new comment rather than the post
  }
  catch {
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

    let query2 = `MATCH (p:Post {pid: $pid})-[:HAS_COMMENT]->(n:Comment)
                  RETURN n AS node
                  `;
    let params2 = {pid: postId};
    let result = await tx.run(query2, params2);
    comments = [];
    result.records.forEach(record => {
      //store results of query into list
      // console.log(record.get('node').properties);
      let nodeProperties = record.get('node').properties;
      nodeProperties = convertNeo4jTypes(nodeProperties);
      comments.push(nodeProperties);
  });
    console.log(`Retrieving comments from post ${postId}`);
    res.status(200);
    res.json(comments); //send the comments over
  }
  catch {
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
