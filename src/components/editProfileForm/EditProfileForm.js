import React, {useContext, useEffect, useState} from 'react';
import './editprofileform.scss'
import Button from "../common/button/Button.tsx";
import {updateUser} from '../../services/blogger-service.js';
import { AuthContext } from '../../context/AuthContext';


const EditProfileForm = ({file, setFile}) => {
    // const dispatch = useAppDispatch()
    // const {user} = useAppSelector(state => state.auth)
    const [userInfo, setUserInfo] = useState({userName: ''})
    const [message, setMessage] = useState('')

    const {user, setUser} = useContext(AuthContext);

    useEffect(() => {
        // setFile(null)
        //for trial only
        if(Object.keys(user).length > 0){
            setUserInfo({userName : user.bloggerName})
        }

        //add user dependency in the end
    }, [user,setFile])

    const onSubmit = (e) => {
        e.preventDefault()
        setMessage('')
        if(user.bloggerName === userInfo.userName && !file
        ){
            setMessage('Please edit fields!')
        }else{
                updateUser(user.userId, userInfo.userName ,file)
                .then(response => {
                    //update the global user here for all the other pages
                    // dispatch(setUser(response.data)) 
                    setUser(response.data);
                    setMessage('Changes saved!')
                })
                .catch(error => setMessage(error.message))
        }
    }
    const onChange = (e) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
    }
    return (
        <form className={'editProfileForm'}>
            <label className="field field_v2">
                <input
                    name={'userName'}
                    value={userInfo.userName}
                    onChange={onChange}
                    className="field__input"
                    required
                />
                <span className="field__label-wrap">
                    <span className="field__label">User Name</span>
                </span>
            </label>
            
            <div className={'submitProfileChanges'}>
                <div className={'profileSaveBtn'}>
                    <Button handleClick={onSubmit} type={'submit'}  text={'Save'}/>
                </div>
                {message &&
                    <span className={message === 'Changes saved!' ? 'submitSuccess' : 'submitError'}>
                        {message}
                    </span>
                }
            </div>
        </form>
    );
};

export default EditProfileForm;