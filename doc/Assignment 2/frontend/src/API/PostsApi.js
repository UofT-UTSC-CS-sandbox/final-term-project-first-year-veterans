const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

function api_create_post(post_data, cb) {
    let url = `${API_BASE_URL}/api/posts/create`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_fetch_posts(uid, cb) {
    let url = `${API_BASE_URL}/api/posts/fetch/${uid}`;
    fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
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

function api_fetch_newest_post(uid, cb) {
    let url = `${API_BASE_URL}/api/posts/fetch_newest/${uid}`;
    fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => cb(data))
    .catch(error => {
        console.error('Error fetching newest post:', error);
        cb([]); // Handle error by passing an empty array or appropriate default value
    });
}

function api_fetch_random(uid, cb) {
    let url = `${API_BASE_URL}/api/posts/fetch_random/${uid}`;
    fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => cb(data))
    .catch(error => {
        console.error('Error fetching random post:', error);
        cb([]); // Handle error by passing an empty array or appropriate default value
    });
}

function api_update_post_like(postData, cb) {
    let url = `${API_BASE_URL}/api/posts/update_like`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_add_new_comment(commentData, cb) {
    let url = `${API_BASE_URL}/api/posts/add_new_comment/${commentData.postidentification}`;
    console.log("API URL:", url);
    console.log("Comment Data:", commentData);
  
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => {
        console.log("Response status:", response.status);
        if (!response.ok) {
            return response.json().then(errorData => {
                console.error('Error response data:', errorData);
                throw new Error('Network response was not ok');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log("API response data:", data);
        cb(null, data);
    })
    .catch(error => {
        console.error('Error adding new comment:', error);
        cb(error);
    });
}

function api_fetch_comments(postId, cb) {
    let url = `${API_BASE_URL}/api/posts/${postId}/comments`;
    fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
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
    let url = `${API_BASE_URL}/api/expandedposts/${postId}/`;
    fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
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
    api_create_post,
    api_fetch_posts,
    api_fetch_newest_post,
    api_update_post_like,
    api_add_new_comment,
    api_fetch_comments,
    api_handle_expand_post,
    api_fetch_random
};
