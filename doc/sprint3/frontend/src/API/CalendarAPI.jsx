async function api_calendar_fetch(cb) {
    let url = "/api/events";
    try {
        let response = await fetch(url, {
            method: "GET",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
        let data = await response.json();
        cb(data); // cb is a callback function run after the fetch is completed
    } catch (error) {
        console.log(error);
    }
}

async function api_create_event(eventInfo, cb) {
    let url = "/api/AddEvents";
    try {
        let response = await fetch(url, {
            method: "POST",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventInfo),
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
        let data = await response.json();
        cb(data); // cb is a callback function run after the fetch is completed
    } catch (error) {
        console.log(error);
    }
}

async function api_update_event(eventId, eventInfo, cb) {
    let url = `/api/UpdateEvent/${eventId}`;
    try {
        let response = await fetch(url, {
            method: "PUT",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventInfo),
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
        let data = await response.json();
        cb(data); // cb is a callback function run after the fetch is completed
    } catch (error) {
        console.log(error);
    }
}

async function api_delete_event(eventId, cb) {
    let url = `/api/DeleteEvent/${eventId}`;
    try {
        let response = await fetch(url, {
            method: "DELETE",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
        let data = await response.json();
        cb(data); // cb is a callback function run after the fetch is completed
    } catch (error) {
        console.log(error);
    }
}

export { api_calendar_fetch, api_create_event, api_update_event, api_delete_event };
