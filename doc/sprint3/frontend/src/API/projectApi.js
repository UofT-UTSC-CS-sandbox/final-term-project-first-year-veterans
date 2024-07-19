function api_create_project(formData, cb) {
    let url = "/api/project/create";
    fetch(url, {
      method: "POST",
      mode: "same-origin",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        // 'Content-Type': 'multipart/form-data', // Not needed, browser sets this automatically with FormData
      },
      body: formData,
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
  }  
  
  function api_fetch_all_projects(cb) {
    let url = "/api/project/fetchall";
    fetch(url, {
      method: "GET",
      mode: "same-origin",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then(response => response.json())
      .then(data => cb(data))
      .catch(error => console.error('Error:', error));
  }
  
  function api_join_project(userId, projectId, cb) {
    let url = `/api/project/join`;
    fetch(url, {
      method: "POST",
      mode: "same-origin",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, projectId }),
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then(response => response.json())
      .then(data => cb(data))
      .catch(error => console.error('Error:', error));
  }
  
  function api_edit_project(formData, cb) {
    let url = "/api/project/edit";
    fetch(url, {
      method: "POST",
      mode: "same-origin",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        // 'Content-Type': 'multipart/form-data', // Not needed, browser sets this automatically with FormData
      },
      body: formData,
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
  }
  
  export { api_create_project, api_fetch_all_projects, api_join_project, api_edit_project };
  