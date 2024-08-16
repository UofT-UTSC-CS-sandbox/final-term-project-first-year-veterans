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

async function api_fetch_notes(videoID,cb) {
    let url = `/api/videos/notes/${videoID}`;
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

async function api_create_note(videoID, note, cb) {
    let url = `/api/${videoID}/notes`;
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

async function api_create_new_video(video, cb) {
    let url = "/api/create/video";
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
            body: JSON.stringify(video),
        });
        let data = await response.json();
        cb(data);
    } catch (error) {
        console.log(error);
    }
}

async function api_delete_video(videoID, cb) {
    let url = `/api/delete/video/${videoID}`;
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
        cb(data);
    } catch (error) {
        console.log(error);
    }
}

async function api_delete_note(noteID, cb) {
    let url = `/api/delete/note/${noteID}`;
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
        cb(data);
    } catch (error) {
        console.log(error);
    }
}


export { api_all_videos_fetch, api_fetch_notes, api_fetch_a_video, api_create_note, api_create_new_video, api_delete_video, api_delete_note };