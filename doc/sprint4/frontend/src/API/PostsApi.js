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

function api_fetch_posts(uid,cb) {
    let url = `/api/posts/fetch/${uid}`;
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


function api_fetch_newest_post(uid,cb) {
    let url = `/api/posts/fetch_newest/${uid}`;
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
	// Construct the API endpoint URL with the post ID
	let url = `/api/posts/add_new_comment/${commentData.postidentification}`;
	
	// Log the API URL and the comment data for debugging purposes
	console.log("API URL:", url);
	console.log("Comment Data:", commentData);
  
	// Make a POST request to the API endpoint with the comment data
	fetch(url, {
		method: "POST", // Specify the request method
		mode: "same-origin", // Ensure requests are made to the same origin
		cache: "no-cache", // Disable caching for this request
		credentials: "same-origin", // Include credentials with the request
		headers: {
			'Content-Type': 'application/json', // Set the content type to JSON
		},
		redirect: "follow", // Follow any redirects
		referrerPolicy: "no-referrer", // Do not send a referrer
		body: JSON.stringify(commentData) // Convert commentData to JSON string for the request body
	})
	.then(response => {
		// Log the response status for debugging
		console.log("Response status:", response.status);
		
		// Check if the response is not OK (status code outside the range 200-299)
		if (!response.ok) {
			// If the response is not OK, parse and log the error data
			return response.json().then(errorData => {
				console.error('Error response data:', errorData);
				// Throw an error to be caught in the catch block
				throw new Error('Network response was not ok');
			});
		}
		
		// If the response is OK, parse the response JSON data
		return response.json();
	})
	.then(data => {
		// Log the API response data for debugging
		console.log("API response data:", data);
		// Call the callback function with the response data
		cb(null, data);
	})
	.catch(error => {
		// Log any errors that occurred during the fetch or in the response processing
		console.error('Error adding new comment:', error);
		// Call the callback function with the error
		cb(error);
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



export {
	api_fetch_posts,
	api_create_post,
	api_fetch_newest_post,
	api_update_post_like,
	api_add_new_comment,
	api_fetch_comments,
	api_handle_expand_post,
};
