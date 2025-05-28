import axios from './axiosConfig';

const handleResponseError = (error) => {
    if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_data');
            setTimeout(() => {
                window.location.href='/login';
            }, 1000);
            throw Object.assign(new Error(`${data.message}`), { statusCode: 401 });
        } else if (status === 403) {  
            throw Object.assign(new Error(`${data.message}`), { statusCode: 403 });
        } else if (status === 404 && !data.message) {
            throw new Error(`(Not Found) Incorrect API call - ${error}`);
        } else if (data.message) {
            throw new Error(`${data.message}`);
        } else {
            throw new Error(`${data.detail}`);
        }
    } else if (error.request) {
        throw new Error(`No response received: Network Error (Couldn't connect to the server)`);
    } else {
        throw new Error(`Client error: Error setting up the request - ${error}`);
    }
};

const getAPI = async (path) => {
    try {
        const response = await axios.get(path);
        return response.data;
    } catch (error) {
        handleResponseError(error);
    }
};

const postAPI = async (path, data) => {
    try {
        const response = await axios.post(path, data);
        return response.data;
    } catch (error) {
        handleResponseError(error);
    }
};

const postAPIMedia = async (path, formData) => {
    try {
        const response = await axios.post(path, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        handleResponseError(error);
    }
};

const blobFetchURL = async (path) => {
    try {
        const response = await axios.get(path, { responseType: 'blob' });
        return response.data;
    } catch (error) {
        handleResponseError(error);
    }
}

export { getAPI, postAPI, postAPIMedia, blobFetchURL };