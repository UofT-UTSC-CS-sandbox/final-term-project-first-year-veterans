
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

function api_logout(signin_data, cb){
	let url="/api/logout";
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
    let url="/api/post/create/";
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
		// body: JSON.stringify(), // body data type must match "Content-Type" header
	})
	.then(response=>response.json())
	.then(data=>cb(data)) // cb is a callback function run after the fetch is completed
	.catch(error=>console.log(error));
}

function api_fetch_posts(cb) {
    let url = "/api/posts/fetch";
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
    })
    .then(response => response.json())
    .then(data => cb(data)) // cb is a callback function run after the fetch is completed
    .catch(error => console.log(error));
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

export {api_search, api_signin, api_checkAuth, api_profile_fetch, api_profile_update, api_create_post, api_fetch_posts, api_calendar_fetch, api_create_event, api_update_event, api_delete_event, api_logout};
