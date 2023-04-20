import React, { useState } from 'react';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import './editpostbuttons.scss'
import {deletePost} from '../../services/post-service';
import {useNavigate} from "react-router-dom";

const EditPostButtons = ({post, postPage}) => {
    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.stopPropagation()
        navigate(`/edit/${post.postId}`)
    }
    const handleDelete = async (e) => {
        e.stopPropagation()
        try{
            await deletePost(post.postId)
            navigate('/postdeleted');
        }catch(e){
            console.log(e)
        }
        if(postPage){
            navigate('/')
        }
    }
    return (
        <div className={'postUpdateActions'}>
            <div onClick={handleUpdate} className={'postUpdate edit'}>
                <EditIcon className={'postUpdateIcon'}/>
                <span>Edit</span>
            </div>
            <div onClick={handleDelete} className={'postUpdate delete'}>
                <DeleteIcon className={'postUpdateIcon'}/>
                <span>Delete</span>
            </div>
        </div>
    );
};

export default EditPostButtons;