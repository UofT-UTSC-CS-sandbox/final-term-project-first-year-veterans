const cookie_api = require('./routes/cookie_api');
const signin_api = require('./routes/signin_api');
const search_api = require('./routes/search_api');
const profile_fetch_api = require('./routes/profile_fetch_api');
const api_profile_update = require('./routes/profile_update_api');
const calenda_api = require('./routes/calendar_api');
const profile_update_api = require('./routes/profile_update_api');
const friend_fetch_api = require('./routes/friendListApi/friend_fetch_api'); 
const friend_remove_api = require('./routes/friendListApi/friend_remove_api');
const follow_fetch_api = require('./routes/friendListApi/follow_fetch_api');
const user_unfollow_api = require('./routes/friendListApi/user_unfollow_api');
const follower_fetch_api = require('./routes/friendListApi/follower_fetch_api');
const user_followback_api = require('./routes/friendListApi/user_followback_api');
const friendRequests_fetch_api = require('./routes/friendListApi/friendRequests_fetch_api');
const friendRequests_accept_api = require('./routes/friendListApi/friendRequests_accept_api');
const friendRequests_reject_api = require('./routes/friendListApi/friendRequests_reject_api');
const friendList_search_api = require('./routes/friendListApi/friendList_search_api');
const posts_api = require('./routes/posts_api');
const projects_api = require('./routes/projects_api');
const chat_fetch_api = require('./routes/chatApi/chat_fetch_api');
const message_fetch_api = require('./routes/chatApi/message_fetch_api');
const message_send_api = require('./routes/chatApi/message_send_api');

module.exports = (app) => {
    app.use('', cookie_api);
    app.use('', signin_api);
    app.use('', search_api);
    app.use('', profile_fetch_api);
    app.use('', api_profile_update);
    app.use('', calenda_api);
    app.use('', profile_update_api);
    app.use('', friend_fetch_api);
    app.use('', friend_remove_api);
    app.use('', follow_fetch_api);
    app.use('', user_unfollow_api);
    app.use('', follower_fetch_api);
    app.use('', user_followback_api);
    app.use('', friendRequests_fetch_api);
    app.use('', friendRequests_accept_api);
    app.use('', friendRequests_reject_api);
    app.use('', friendList_search_api);
    app.use('', posts_api);
<<<<<<< HEAD
    app.use('', chat_fetch_api);
    app.use('', message_fetch_api);
    app.use('', message_send_api);
    app.use('', notes_api);
=======
    app.use('', projects_api);
    app.use('', chat_fetch_api);
    app.use('', message_fetch_api);
    app.use('', message_send_api);
>>>>>>> DEV-4
};
