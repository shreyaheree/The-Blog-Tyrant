import React, { useContext, useState } from 'react';
import { CircularProgress } from '@mui/material';
import Button from '../../components/common/button/Button.tsx';
import Hr from '../../components/common/hr/Hr.tsx';
import './register.scss'
import {Navigate} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const isLoading = false;
    const {isAuth, register} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        register(userName, password).then((response) => {
          //set usernames here
          //navigate to whichever profile here
        }).catch((err) => {
          setError(err.response.data);
        });
    
      };

      if(isAuth){
        return <Navigate to={'/'}/>
    }
    

      return (
        <div className='register'>
          <h2 className={'registerTitle'}>Welcome to The Daily Scribbles</h2>
          <Hr dataContent={'Sign Up'} />
          {error && <div className={'registerError'}>
            {error}
          </div>}
    
          <div className='registerForm'>
            <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label className='formGroupInfo'>
                Username
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                  minLength = {3}
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
                  minLength = {8}
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

export default Register;