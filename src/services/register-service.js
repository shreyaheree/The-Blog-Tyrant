import axios from 'axios';

const registerService = async (userName, password) => {
    const REGISTER_API = 'http://localhost:8080/register';

    const payload = {
        password:password,
        bloggerName:userName
    }
    return await axios.post(REGISTER_API,payload)
};

export default registerService;