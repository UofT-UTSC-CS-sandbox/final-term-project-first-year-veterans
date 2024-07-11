
// SEARCH API'S
function api_search(search_data, cb){
    let url="/api/search";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify(search_data),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

// SIGN_IN AND AUTHENTICATION API'S

function api_signin(signin_data, cb){
	let url="/api/signin";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(signin_data),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_checkAuth(cb){
	let url="/api/check-auth";
	fetch(url, {
		method: "GET", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

// PROFILE API'S

function api_profile_fetch(profile_data, cb){
	let url="/api/profile/fetch";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(profile_data),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_profile_update(profile_data, cb){
	let url="/api/profile/update";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(profile_data),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

// POST API'S

function api_create_post(post_data, cb){
    let url="/api/posts/create";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify(post_data),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_fetch_posts(cb) {
    let url = "/api/posts/fetch";
    fetch(url, {
        method: "GET",
        mode: "same-origin",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => cb(data))
    .catch(error => {
        console.error('Error fetching posts:', error);
        cb([]); // Handle error by passing an empty array or appropriate default value
    });
}


function api_fetch_newest_post(cb) {
    let url = "/api/posts/fetch_newest";
    fetch(url, {
        method: "GET",
        mode: "same-origin",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => cb(data))
    .catch(error => {
        console.error('Error fetching posts:', error);
        cb([]); // Handle error by passing an empty array or appropriate default value
    });
}

function api_update_post_like(postData, cb) {
    let url = `/api/posts/update_like`;
    fetch(url, {
        method: "POST",
        mode: "same-origin",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(postData) // Send the new like count in the request body
    })
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_add_new_comment(commentData, cb) {
    let url = `/api/posts/add_new_comment/${commentData.postIdentification}`;
    fetch(url, {
        method: "POST",
        mode: "same-origin",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(commentData) // Directly send commentData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => cb(data))
    .catch(error => {
        console.error('Error adding new comment:', error);
        cb(null);
    });
}


function api_fetch_comments(postId, cb) {
    let url = `/api/posts/${postId}/comments`;
    fetch(url, {
        method: "GET",
        mode: "same-origin",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => cb(data))
    .catch(error => {
        console.error('Error fetching comments:', error);
        cb([]); // Handle error by passing an empty array or appropriate default value
    });
}

function api_handle_expand_post(postId, cb) {
    let url = `/api/expandedposts/${postId}/`;
    fetch(url, {
        method: "GET",
        mode: "same-origin",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => cb && cb(data)) // Ensure cb is called if it's a function
    .catch(error => {
        console.error('Error fetching expanded post:', error);
        cb && cb(null); // Handle error by passing null or appropriate default value
    });
}


// CALENDAR API's
function api_calendar_fetch(cb){
	let url="/api/events";
	fetch(url, {
		method: "GET", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_create_event(eventInfo, cb){
	let url="/api/AddEvents";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(eventInfo),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_update_event(eventId, eventInfo, cb) {
    let url = `/api/UpdateEvent/${eventId}`;
    fetch(url, {
        method: "PUT", 
        mode: "same-origin", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventInfo),
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
    .then(response => response.json())
    .then(data => cb(data)) // cb is a callback function run after the fetch is completed
    .catch(error => console.log(error));
}

function api_delete_event(eventId, cb) {
    let url = `/api/DeleteEvent/${eventId}`;
    fetch(url, {
        method: "DELETE", 
        mode: "same-origin", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
    .then(response => response.json())
    .then(data => cb(data)) // cb is a callback function run after the fetch is completed
    .catch(error => console.log(error));
}

function api_friend_fetch(friendList_data, cb){
	let url="/api/friend/fetch";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(friendList_data),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_friend_remove(friendList_data, cb){
	let url="/api/friend/remove";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(friendList_data),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_follow_fetch(followList_data, cb){
	let url="/api/follow/fetch";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(followList_data),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_user_unfollow(friendList_data, cb){
	let url="/api/user/unfollow";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(friendList_data),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_follower_fetch(followerList_data, cb){
	let url="/api/follower/fetch";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(followerList_data),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_user_followback(friendList_data, cb){
	let url="/api/user/followback";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(friendList_data),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_friendRequests_fetch(friendList_data, cb){
	let url="/api/friendRequests/fetch";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(friendList_data),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_friendRequests_accept(friendList_data, cb){
	let url="/api/friendRequests/accept";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(friendList_data),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_friendRequests_reject(friendList_data, cb){
	let url="/api/friendRequests/reject";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(friendList_data),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_friendList_search(friendList_data, cb){
	let url="/api/friendList/search";
	fetch(url, {
		method: "POST", 
		mode: "same-origin", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(friendList_data),
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

export {api_search, 
        api_signin, 
        api_checkAuth, 
        api_profile_fetch, 
        api_profile_update, 
        api_create_post, 
        api_fetch_posts, 
        api_fetch_newest_post, 
        api_update_post_like, 
        api_add_new_comment, 
        api_fetch_comments, 
        api_handle_expand_post, 
        api_calendar_fetch, 
        api_create_event, 
        api_update_event, 
        api_delete_event,
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
