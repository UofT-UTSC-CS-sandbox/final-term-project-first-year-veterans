const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

function api_create_project(formData, cb) {
  let url = `${API_BASE_URL}/api/project/create`;
  fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
          // 'Content-Type': 'multipart/form-data', // Not needed, browser sets this automatically with FormData
      },
      body: formData,
      redirect: "follow",
      referrerPolicy: "no-referrer-when-downgrade",
  })
  .then(response => response.json())
  .then(data => cb(data))
  .catch(error => console.log(error));
}

function api_fetch_all_projects(uid, cb) {
  let url = `${API_BASE_URL}/api/project/fetchall`;
  fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid }),
      redirect: "follow",
      referrerPolicy: "no-referrer-when-downgrade",
  })
  .then(response => response.json())
  .then(data => cb(data))
  .catch(error => console.error('Error:', error));
}

function api_join_project(userId, projectId, cb) {
  let url = `${API_BASE_URL}/api/project/join`;
  fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, projectId }),
      redirect: "follow",
      referrerPolicy: "no-referrer-when-downgrade",
  })
  .then(response => response.json())
  .then(data => cb(data))
  .catch(error => console.error('Error:', error));
}

function api_edit_project(formData, cb) {
  let url = `${API_BASE_URL}/api/project/edit`;
  fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
          // 'Content-Type': 'multipart/form-data', // Not needed, browser sets this automatically with FormData
      },
      body: formData,
      redirect: "follow",
      referrerPolicy: "no-referrer-when-downgrade",
  })
  .then(response => response.json())
  .then(data => cb(data))
  .catch(error => console.log(error));
}

export { api_create_project, api_fetch_all_projects, api_join_project, api_edit_project };
