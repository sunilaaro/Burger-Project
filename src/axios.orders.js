import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-project-d8bac.firebaseio.com/'
});

export default instance;