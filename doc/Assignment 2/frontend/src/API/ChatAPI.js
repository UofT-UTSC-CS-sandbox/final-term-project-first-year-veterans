const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

function api_chat_fetch(chat_data, cb){
    let url = `${API_BASE_URL}/api/chat/fetch`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(chat_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_message_fetch(chat_data, cb){
    let url = `${API_BASE_URL}/api/message/fetch`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(chat_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

function api_message_send(chat_data, cb){
    let url = `${API_BASE_URL}/api/message/send`;
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(chat_data),
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}

export {
    api_chat_fetch,
    api_message_fetch,
    api_message_send,
};
