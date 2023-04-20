import React, { useState,useContext } from 'react';
import './postitem.scss';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../helpers/helpers.ts";
import EditPostButtons from '../editPostButtons/EditPostButtons.js';
import {AuthContext} from '../../context/AuthContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { shadowPost } from '../../services/post-service';
import defaultusericon from '../../assets/images/defaultusericon.avif';

const ModPostItem = ({ post, displayImage }) => {
    const [loadingImage, setLoadingImage] = useState(true);
    const {user} = useContext(AuthContext);
    const [shadow, setShadow ] = useState(post.shadow);
    // displayImage = true;
    const navigate = useNavigate();

    const handleShadowClick = async () => {
        await shadowPost(post.postId).then((response)=> {
            setShadow(prevShadow => !prevShadow);
        }).catch((error) => {
            console.log("Error Shadowing post", error);
        });

    }

    return (
        <div className={"postItem"}>
            {displayImage && (
                <img
                    style={{
                        display: loadingImage ? 'none' : 'unset'
                    }}
                    width={700}
                    height={270}
                    className={"postImg"}
                    src={`${post.postImage}`}
                    alt="postPicture"
                    onLoad={() => setLoadingImage(false)}
                />
            )}

            {loadingImage && displayImage && <div className={'imgSkeleton'} />}
            <div className={"previewInfo"}>
                <div className={'previewInfoTop'}>
                    <div className={"authorInfo"}>
                        <img src={post.user.profilePicture ? post.user.profilePicture : defaultusericon} alt="avatar" />
                        <div className={"authorDescription"}>
                            <span className={"authorName"}>
                                {post.user.bloggerName}
                            </span>
                            <span className={"postDate"}>
                                {formatDate(post.createdDateTime)}
                            </span>
                        </div>
                        <div onClick={handleShadowClick}>{shadow? <VisibilityOffIcon /> : <VisibilityIcon /> }</div>
                    </div>
                    {/* {user?.userId === post.user.userId && <EditPostButtons post={post} />} */}
                </div>

                <div className={"postInfoTitle"}>
                    <h2>{post.title}</h2><br />
                    <div dangerouslySetInnerHTML={{
               __html: post.data.replace(/\n/g, "<br />"),
             }}></div>
                </div>
            </div>
            <div className={'postBottom'}>
                <div className={"postReactions"}>
                    <div className={"postReactionsInfo"}>
                        <FavoriteBorderIcon className={"postReactionsIcon"} />
                        <span>{post.votes} Likes</span>
                    </div>
                    <div className={"postReactionsInfo"}>
                        <ChatBubbleOutlineIcon className={"postReactionsIcon"} />
                        <span>{post.comments.length} Comments</span>
                    </div>
                </div>
            </div>
        </div>
            );
}

export default ModPostItem;