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

export {api_search, api_signin, api_checkAuth, api_profile_fetch, api_profile_update, api_friend_fetch, api_friend_remove, api_follow_fetch, api_follower_fetch};