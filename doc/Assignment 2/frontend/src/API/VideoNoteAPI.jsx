const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

async function api_all_videos_fetch(cb) {
    let url = `${API_BASE_URL}/api/videos`;
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

async function api_fetch_notes(videoID, cb) {
    let url = `${API_BASE_URL}/api/videos/notes/${videoID}`;
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

async function api_fetch_a_video(id, cb) {
    let url = `${API_BASE_URL}/api/videos/${id}`;
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

async function api_create_note(videoID, note, cb) {
    let url = `${API_BASE_URL}/api/${videoID}/notes`;
    try {
        let response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: "follow",
            referrerPolicy: "no-referrer-when-downgrade",
            body: JSON.stringify(note),
        });
        let data = await response.json();
        cb(data);
    } catch (error) {
        console.log(error);
    }
}

async function api_create_new_video(video, cb) {
    let url = `${API_BASE_URL}/api/create/video`;
    try {
        let response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: "follow",
            referrerPolicy: "no-referrer-when-downgrade",
            body: JSON.stringify(video),
        });
        let data = await response.json();
        cb(data);
    } catch (error) {
        console.log(error);
    }
}

async function api_delete_video(videoID, cb) {
    let url = `${API_BASE_URL}/api/delete/video/${videoID}`;
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

async function api_delete_note(noteID, cb) {
    let url = `${API_BASE_URL}/api/delete/note/${noteID}`;
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

export { 
    api_all_videos_fetch, 
    api_fetch_notes, 
    api_fetch_a_video, 
    api_create_note, 
    api_create_new_video, 
    api_delete_video, 
    api_delete_note 
};
