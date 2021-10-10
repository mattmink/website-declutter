const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

const jsonResponse = (response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
};

export const get = (url, { headers } = {}) => fetch(
    url,
    {
        method: 'GET',
        headers,
    }
).then(jsonResponse);

export const post = (url, body) => fetch(
    url,
    {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    }
).then(jsonResponse);

const http = { post, get };

export default http;

