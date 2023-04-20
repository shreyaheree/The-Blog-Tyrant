import React, {useState, useContext, useEffect} from 'react';
import './profile.scss'
import FileUpload from "../../components/fileUpload/FileUpload.tsx";
import UserPostList from "../../components/userPostList/UserPostList";
import EditProfileForm from "../../components/editProfileForm/EditProfileForm";
import { AuthContext } from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import defaultUserIcon from '../../assets/images/defaultusericon.avif';

const Profile = () => {
    // const {user} = useAppSelector(state => state.auth)
    const [file, setFile] = useState(null);
    const {user} = useContext(AuthContext);
    return (
        <div className={'profileWrapper'}>
            <div className={'profile'}>
                <h1>Welcome, {user.bloggerName}</h1>
                <div className={'profileInfo'}>
                    <div className={'profileLeft'}>
                        <div className={'profileImage'}>
                            <img
                                src={file ? file : user.profilePicture ? user.profilePicture : defaultUserIcon}
                                alt="profileAvatar"/>
                        </div>
                        <div className={'profileImageUpload'}>
                            <FileUpload
                                displayImage={false}
                                handleFile={(file) => setFile(file)}/>
                        </div>
                    </div>
                    <div className={'profileRight'}>
                        <h3>Information</h3>
                        <div className={'profileCredentials'}>
                            <EditProfileForm setFile={setFile} file={file}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'userPosts'}>
                <h3>Your posts</h3>
                {Object.keys(user).length > 0 && <UserPostList user={user}/>}
            </div>
        </div>
    );
};

export default Profile;