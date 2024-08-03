async function api_all_videos_fetch(cb) {
    let url = "/api/videos";
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

async function api_fetch_notes(id,cb) {
    let url = `/api/videos/notes/${id}`;
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
        cb(data);
    } catch (error) {
        console.log(error);
    }
}

async function api_fetch_a_video(id, cb) {
    let url = `/api/videos/${id}`;
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
        cb(data);
    } catch (error) {
        console.log(error);
    }
}

async function api_create_note(note, cb) {
    let url = "/api/notes";
    try {
        let response = await fetch(url, {
            method: "POST",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(note),
        });
        let data = await response.json();
        cb(data);
    } catch (error) {
        console.log(error);
    }
}   

export { api_all_videos_fetch, api_fetch_notes, api_fetch_a_video, api_create_note };