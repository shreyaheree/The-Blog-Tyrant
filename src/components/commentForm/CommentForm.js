import React, {useContext, useState} from 'react';
import './commentform.scss'
import Button from "../common/button/Button.tsx";
import {createComment} from '../../services/post-service';
import { AuthContext } from '../../context/AuthContext';


const CommentForm = ({addComment, postId}) => {
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    //set up user and isAuth here
    const {user, isAuth} = useContext(AuthContext);

    const onSubmit = async () => {
            setError('');
            setText('');
            try{
                const response = await createComment(text, postId, user.userId);
                addComment(response.data)
            }catch(e){
                setError(e.response.data.message)
            }
    }

    return (
        <div className={'commentForm'}>
            {error && <div className={'commentValidationError'}>{error}</div>}
            <textarea
                value={text}
                disabled={!isAuth}
                onChange={(e) => setText(e.target.value)}
                placeholder={isAuth ? 'Share your expressions...' : 'Please, log in.'}
                className={'commentFormArea'}
            />
            <div className={'sendButton'}><Button disabled={!isAuth} handleClick={onSubmit} text={'Send'}/></div>
        </div>
    );
};

export default CommentForm;