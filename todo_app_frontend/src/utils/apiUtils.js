const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getRequest = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  return response.json();
};

export const postRequest = async (endpoint, body) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return response.json();
};

export const putRequest = async (endpoint, body) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  return response.json();
};

export const deleteRequest = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE'
  });
  return response.json();
};

// API header authorization
const getHeader = () => {
  const token = localStorage.getItem('token');
  return token == null ? {
    'Content-Type': 'application/json'
  } : {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'x-refresh-token': localStorage.getItem('refreshToken')
  };
}

// API interceptor
const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
  // request interceptor
  let [resource, config] = args;
  config = {
    ...config,
    headers: getHeader()
  }
  const response = await originalFetch(resource, config);
  // response interceptor
  if (!response.ok) {
    const json = () =>
      response
        .clone()
        .json()
        .then((data) => {
          if (data && data.error) {
            if (data.error === 'Relogin') {
              window.alert('Session expired! Please re-login!');
            }
            throw new Error(data.error);
          }
        });
  
    response.json = json;
  }
  return response;
}
