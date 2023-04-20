
import { Editor } from 'react-draft-wysiwyg';
import './createpost.scss';
import Button from '../../components/common/button/Button.tsx';
import { CircularProgress } from '@mui/material';
import {ContentState, convertFromHTML, convertToRaw, EditorState} from "draft-js";
import React, { useContext, useEffect,  useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import FormGroup from "../../components/common/formgroup/FormGroup.tsx";
import FileUpload from "../../components/fileUpload/FileUpload.tsx";
import draftToHtml from "draftjs-to-html";
import {createPost,updatePost,findById} from '../../services/post-service';
import {useNavigate, useParams} from "react-router-dom";
import NotFound from '../404/NotFound.tsx';
import {useForm} from "react-hook-form";
import { AuthContext } from '../../context/AuthContext';


const CreatePost = () => {
    //use states here
    const {postId} = useParams();
    const [file,setFile] = useState(null);

    const {user, isAuth} = useContext(AuthContext);

    const [currentPost, setCurrentPost] = useState({});
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [error,setError] = useState('');
    const [notFound,setNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(postId){
            findById(postId)
                .then(response => {
                    if(isAuth && response.user.userId !== user.userId){
                        setNotFound(true)
                        return
                    }
                    setCurrentPost(response)
                    
                    setEditorState(EditorState.createWithContent(
                        ContentState.createFromBlockArray(convertFromHTML(response.data).contentBlocks)
                     ))
                })
                .catch((err) => setNotFound(true))
        }
    }, [])

    const onSubmit = async (data) => {
        let response
        const stringFromHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        setIsLoading(true)
        // console.log(file.image.currentSrc);
        let image = file? file : currentPost? currentPost.postImage : null;

        try {
            if (postId) {
                response = await updatePost(postId, image, title? title : currentPost.title, stringFromHtml, user.userId);
            } else {
                response = await createPost(image, title, stringFromHtml, user.userId);
            }
            navigate(`/posts/${response.data.postId}`)
        } catch (e) {
            const response = e.response?.data.message
            if (Array.isArray(response)) setError(response[0])
            else setError(response)
            console.log(e);
        } finally {
            setIsLoading(false)
        }
    }

    if(notFound){
        return <NotFound/>
    }

        return (
            <div className='createPost'>
                <div className='postInner'>
                    <h2>{postId ? 'Edit post' : 'Create new post'}</h2>

                    <FileUpload
                        defaultImageURL={Object.keys(currentPost).length > 0 ? currentPost.postImage : null}
                        displayImage={true}
                        handleFile={(file) => setFile(file)}
                    />

                    <form onSubmit={onSubmit}>
                        <div className={'formGroup'}>
                            <div className={'formGroupInfo'}>
                                <label htmlFor='title'>Title</label>
                            </div>
                            <input type='text' value={title} placeholder={postId? currentPost.title :'Enter title...'} 
                            onChange={(event)=>{setTitle(event.target.value)}}required />
                        </div>

                        <div className='editor'>
                            <Editor
                                editorState={editorState}
                                toolbarClassName={'toolbarClassName'}
                                wrapperClassName={'wrapperClassName'}
                                editorClassName={'editorClassName'}
                                onEditorStateChange={(state) => setEditorState(state)}
                            />
                        </div>
                        <div className='createBottom'>
                            <div className='createButton'>
                                {/* you can call handleSubmit here */}
                                <Button
                                    handleClick={handleSubmit(onSubmit)}
                                    type={'submit'}
                                    text={postId ? 'Save' : 'Create'}
                                    progress={isLoading && <CircularProgress style={{ color: 'white' }} size={20} />}
                                />
                            </div>
                            {error && <div className={'alert danger'}>{error}</div>}
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    export default CreatePost;