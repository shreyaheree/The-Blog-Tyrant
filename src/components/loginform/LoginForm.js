import React, { useContext, useState } from 'react';
import loginService from '../../services/login-service';
import { CircularProgress } from '@mui/material';
import Button from '../../components/common/button/Button.tsx';
import Hr from '../common/hr/Hr.tsx';
import './LoginForm.scss'
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import { AuthContext } from '../../context/AuthContext';

const LoginForm = ({ role }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // let isAuth = false;
  const {isAuth,isAdmin,isModerator,login} = useContext(AuthContext);

  //use this to set loading later
  const isLoading = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(role, userName, password).then((response) => {
      //handle response here
    }).catch((err) => {
      setError(err.response.data);
    });

  };

  //call authorization function here

  if(isAuth){
    if(role==='blogger')
    return <Navigate to={'/'}/>
}

  if(isAdmin){
    if(role==='admin'){
      return <Navigate to={'../admin/home'} />;
    }
  }
  if(isModerator){
  if(role==='moderator'){
    return <Navigate to={'../mod/home'} />;
  }
}

  return (
    <div className='login'>
      <h2 className={'loginTitle'}>{role==='admin'?'Admin Login':'Welcome to The Daily Scribbles'}</h2>
      <Hr dataContent={'Login'} />
      {error && <div className={'registerError'}>
        {error}
      </div>}

      <div className='loginForm'>
        <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className='formGroupInfo'>
            Username
            </label>
            <input
              type="text"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <br />
          <div className="formGroup">
          <label className='formGroupInfo'>
            Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <Button
            type={'submit'}
            progress={isLoading ?
              <CircularProgress style={{ color: 'white' }} size={20} /> : null}
            text={'Continue'}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;