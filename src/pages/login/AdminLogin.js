import React from 'react';
import LoginForm from '../../components/loginform/LoginForm';

const AdminLogin = () => {
    // const [userName, setUserName] = useState("");
    // const [password, setPassword] = useState("");

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const response = await loginService("admin", userName,password);
    //     console.log(response.data.adminName);
    // };

    return(
    //     <div>
    //     <form onSubmit={handleSubmit}>
    //       <label>
    //         Username:
    //         <input
    //           type="text"
    //           value={userName}
    //           onChange={(event) => setUserName(event.target.value)}
    //         />
    //       </label>
    //       <br />
    //       <label>
    //         Password:
    //         <input
    //           type="password"
    //           value={password}
    //           onChange={(event) => setPassword(event.target.value)}
    //         />
    //       </label>
    //       <br />
    //       <button type="submit">Login</button>
    //     </form>
    //   </div>  
        <LoginForm role="admin" />

    );
};

export default AdminLogin;