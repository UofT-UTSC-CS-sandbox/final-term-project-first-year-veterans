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
