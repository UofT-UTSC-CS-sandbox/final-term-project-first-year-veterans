const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

async function api_calendar_fetch(cb) {
    let url = `${API_BASE_URL}/api/events`;
    try {
        let response = await fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: "follow",
            referrerPolicy: "no-referrer-when-downgrade",
        });
        let data = await response.json();
        cb(data);
    } catch (error) {
        console.log(error);
    }
}

async function api_create_event(eventInfo, cb) {
    let url = `${API_BASE_URL}/api/AddEvents`;
    try {
        let response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventInfo),
            redirect: "follow",
            referrerPolicy: "no-referrer-when-downgrade",
        });
        let data = await response.json();
        cb(data);
    } catch (error) {
        console.log(error);
    }
}

async function api_update_event(eventId, eventInfo, cb) {
    let url = `${API_BASE_URL}/api/UpdateEvent/${eventId}`;
    try {
        let response = await fetch(url, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventInfo),
            redirect: "follow",
            referrerPolicy: "no-referrer-when-downgrade",
        });
        let data = await response.json();
        cb(data);
    } catch (error) {
        console.log(error);
    }
}

async function api_delete_event(eventId, cb) {
    let url = `${API_BASE_URL}/api/DeleteEvent/${eventId}`;
    try {
        let response = await fetch(url, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: "follow",
            referrerPolicy: "no-referrer-when-downgrade",
        });
        let data = await response.json();
        cb(data);
    } catch (error) {
        console.log(error);
    }
}

export { api_calendar_fetch, api_create_event, api_update_event, api_delete_event };
