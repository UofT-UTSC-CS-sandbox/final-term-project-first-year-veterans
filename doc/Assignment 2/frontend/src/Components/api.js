const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

function api_search(search_data, cb){
    let url = `${API_BASE_URL}/api/search`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(search_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_signin(signin_data, cb){
    let url = `${API_BASE_URL}/api/signin`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signin_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_logout(logout_data, cb){
    let url = `${API_BASE_URL}/api/logout`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(logout_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_checkAuth(cb){
    let url = `${API_BASE_URL}/api/check-auth`;
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
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_profile_fetch(profile_data, cb){
    let url = `${API_BASE_URL}/api/profile/fetch`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_profile_update(profile_data, cb){
    let url = `${API_BASE_URL}/api/profile/update`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

export {
    api_search,
    api_signin,
    api_checkAuth,
    api_profile_fetch,
    api_profile_update,
    api_logout
};
