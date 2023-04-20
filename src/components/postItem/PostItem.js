import React, { useState,useContext ,useEffect} from 'react';
import './postitem.scss';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../helpers/helpers.ts";
import EditPostButtons from '../editPostButtons/EditPostButtons.js';
import {AuthContext} from '../../context/AuthContext';
import defaultusericon from '../../assets/images/defaultusericon.avif';
import { getCommunities } from '../../services/blogger-service';
import TagChip from '../tagChip/TagChip';

const PostItem = ({ post, displayImage }) => {
    const [loadingImage, setLoadingImage] = useState(true);
    const {user} = useContext(AuthContext);
    const [communities, setCommunities] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        const getUserCommunities = async () => {
            const response =await  getCommunities(post.user.userId);
            setCommunities(response.data);
        }
        getUserCommunities();
    },[setCommunities]);

    if(post.shadow){
        return (
            <></>
        );
    }

    return (
        <div onClick={() => navigate(`/posts/${post.postId}`)} className={"postItem"}>
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
                        <img src={post.user.profilePicture? post.user.profilePicture : defaultusericon} alt="avatar" />
                        <div className={"authorDescription"}>
                            <span className={"authorName"}>
                                {post.user.bloggerName}
                            </span>
                            <span className={"postDate"}>
                                {formatDate(post.createdDateTime)}
                            </span>
                            <div className={'postTags'}>
                             {communities.map((community,i) => 
                        i<=1 && <TagChip key={community.communityId} tag={community.communityName} />
                    )}
                    </div>
                        </div>
                    </div>
                    {user?.userId === post.user.userId && <EditPostButtons post={post} />}
                </div>

                <div className={"postInfoTitle"}>
                    <h2>{post.title}</h2>
                    {/* <div dangerouslySetInnerHTML={{
               __html: post.data.replace(/\n/g, "<br />"),
             }}></div> */}
                </div>
                {/* <div className={'postTags'}>
                    {post.tags.map((tag, i) => i <= 3 && <TagChip key={tag.id} tag={tag} />)}
                </div> */}
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

export default PostItem;