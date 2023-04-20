import axios from 'axios';

const loginService = async (userType, userName, password) => {

    let LOGIN_API;

    if(userType === "blogger"){
        LOGIN_API = "http://localhost:8080/login";
    }
    else if(userType === "admin"){
        LOGIN_API = "http://localhost:8080/admin/login";
    }
    else{
        LOGIN_API = "http://localhost:8080/mod/login";
    }

    const payload = {userName,
                    password};

    // const response = await axios.post(LOGIN_API,payload).then(
    //     (response) => {
    //        console.log(response.data);
    //     }
    // ).catch((error) => {
    //     console.log(error.response.data);
    // });

    return await axios.post(LOGIN_API,payload)

    // return response;
};

export default loginService;
