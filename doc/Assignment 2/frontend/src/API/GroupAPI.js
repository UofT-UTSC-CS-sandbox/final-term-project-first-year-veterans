const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

function api_group_fetch(group_data, cb) {
    let url = `${API_BASE_URL}/api/group/fetch`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(group_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_group_create(groupData, cb) {
    let url = `${API_BASE_URL}/api/group/create`;
    console.log(groupData);
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupData),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

export {
    api_group_fetch,
    api_group_create,
};
