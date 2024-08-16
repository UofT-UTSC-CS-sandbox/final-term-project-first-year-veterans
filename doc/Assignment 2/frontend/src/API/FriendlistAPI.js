const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

function api_friend_fetch(friendList_data, cb){
    let url = `${API_BASE_URL}/api/friend/fetch`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(friendList_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_friend_remove(friendList_data, cb){
    let url = `${API_BASE_URL}/api/friend/remove`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(friendList_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_follow_fetch(followList_data, cb){
    let url = `${API_BASE_URL}/api/follow/fetch`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(followList_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_user_unfollow(friendList_data, cb){
    let url = `${API_BASE_URL}/api/user/unfollow`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(friendList_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_follower_fetch(followerList_data, cb){
    let url = `${API_BASE_URL}/api/follower/fetch`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(followerList_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_user_followback(friendList_data, cb){
    let url = `${API_BASE_URL}/api/user/followback`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(friendList_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_friendRequests_fetch(friendList_data, cb){
    let url = `${API_BASE_URL}/api/friendRequests/fetch`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(friendList_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_friendRequests_accept(friendList_data, cb){
    let url = `${API_BASE_URL}/api/friendRequests/accept`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(friendList_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_friendRequests_reject(friendList_data, cb){
    let url = `${API_BASE_URL}/api/friendRequests/reject`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(friendList_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_friendList_search(friendList_data, cb){
    let url = `${API_BASE_URL}/api/friendList/search`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(friendList_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

export {
    api_friend_fetch,
    api_friend_remove,
    api_follow_fetch,
    api_user_unfollow,
    api_follower_fetch,
    api_user_followback,
    api_friendRequests_fetch,
    api_friendRequests_accept,
    api_friendRequests_reject,
    api_friendList_search,
};
