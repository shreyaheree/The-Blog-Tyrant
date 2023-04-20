import React, { useState, useEffect, useContext } from 'react';
import './post.scss';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { formatDate } from "../../helpers/helpers.ts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModalWindow from "../../components/modalWindow/ModalWindow.tsx";
import NotFound from "../404/NotFound.tsx";
import Loader from "../../components/loader/Loader.tsx";
import EditPostButtons from "../../components/editPostButtons/EditPostButtons";
import Comment from "../../components/comment/Comment";
import CommentForm from "../../components/commentForm/CommentForm";
import { findById, upvotePost } from '../../services/post-service';
import { Link, useParams } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import defaultusericon from '../../assets/images/defaultusericon.avif';
import { getCommunities } from '../../services/blogger-service';
import TagChip from '../../components/tagChip/TagChip';


const Post = () => {
    const [fetchedTodayPosts, setFetchedTodayPosts] = useState([]);
    const [post, setPost] = useState({})
    const [error, setError] = useState('')
    // const {todayPosts} = useAppSelector(state => state.posts)
    // const {user, isAuth} = useAppSelector(state => state.auth)
    const { user, isAuth } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false)
    //use Post ID
    const { postId } = useParams();
    //    useTitle(post.title)


    useEffect(() => {
        const getPost = async () => {
            try {
                const fetchedPost = await findById(postId);
                setPost(fetchedPost)
            } catch (e) {
                setError(e.response.data.message)
            }
        }
        getPost()

    }, [postId]);


    const addComment = (comment) => {


        setPost(prev => ({
            ...prev,
            comments: [comment].concat(prev.comments)
        }))
    }

    const likePost = async () => {
        if (!isAuth) {
            setShowModal(true)
            return;
        }
        try {
            const response = await upvotePost(user.userId, post.postId)
            setPost(prev => ({
                ...prev,
                blogUpVoters: prev.blogUpVoters.concat([response.data]),
                votes: prev.votes + 1
            }))
        } catch (e) {
            console.log('Error liking post', e)
        }
    }


    if (error) {
        return <NotFound />
    }

    if (Object.keys(post).length === 0) {
        return <Loader />
    }

    return (
        <div className={"postWrapper"}>
            <ModalWindow showModal={showModal} setShowModal={setShowModal} />
            <div className={"postInner"}>
                <div className={"postDescription"}>
                    {post.postImage ? <img src={`${post.postImage}`} alt="postPicture" /> : <></>}

                    {/* <img src={`${post.postImage}`} alt="postPicture"/> */}

                    <Link to={"/"} className={"link"}>
                        <button className={"back"}>
                            <KeyboardBackspaceIcon className={"backIcon"} />
                            <span>Home</span>
                        </button>
                    </Link>
                    <div className={"postInfo"}>
                        <div className={'postInfoWrapper'}>
                            <div className={"author"}>
                                {/* <LazyLoad> */}
                                <img src={post.user.profilePicture ? post.user.profilePicture : defaultusericon} alt="postPicture" />
                                {/* </LazyLoad> */}

                                <div className={"authorDetails"}>
                                    <span className={"name"}>
                                        {post.user.bloggerName}
                                    </span>
                                    <span className={"date"}>
                                        {formatDate(post.createdDateTime)}
                                    </span>
                            </div>

                                </div>
                            {/* use this to show the edit post buttons */}
                            {user?.userId === post.user.userId && <EditPostButtons postPage={true} post={post} />}
                        </div>

                        <h1>{post.title}</h1>
                    </div>
                    <div
                        className={"postText"}
                        dangerouslySetInnerHTML={{
                            __html: post.data.replace(/\n/g, "<br />"),
                        }}
                    />
                    <div className={"postActionsInfo"}>
                        <div className={"postLike"}>
                            {/* check if user has liked post */}
                            {console.log('like detected : executing post check')}
                            {console.log(post.blogUpVoters)}
                            {(post.blogUpVoters.find(like => like.userId === user?.userId)) !== undefined ? (
                                <FavoriteIcon className={"liked"} />
                            ) : (
                                <FavoriteBorderIcon
                                    onClick={likePost}
                                    className={"postActionsIcon like"}
                                />
                            )}
                            <span>{post.votes}</span>
                        </div>
                        <div className={"postLike"}>
                            <ChatBubbleOutlineIcon className={"postActionsIcon"} />
                            <span>{post.comments.length}</span>
                        </div>
                    </div>
                </div>
                <div className={"postComments"}>
                    <h2>Comments</h2>
                    <CommentForm addComment={addComment} postId={post.postId} />
                    <div className={"commentsList"}>
                        {post.comments.length > 0 ? (
                            post.comments.map((comment) => (
                                <Comment key={comment.commentId} comment={comment} />
                            ))
                        ) : (
                            <div className={"noComments"}>No comments yet</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Post;
