import React, {useContext} from "react";
import "./postlist.scss";
import PostItem from "../postItem/PostItem.js";
import { AuthContext } from "../../context/AuthContext";
import ModPostItem from '../postItem/ModPostItem';

const PostList = ({posts,error}) => {
  
  const {isModerator} = useContext(AuthContext);
  
  return (
        <div className={"postList"}>
          {!isModerator ? 
            error ? <div className={'errorFetching'}>Error fetching posts</div> :
            posts.map((post, index) => (
                <PostItem
                    key={post.postId}
                    // displayImage={index === 0}
                    displayImage={true}
                    post={post}
                />
            )) :
            
            error ? <div className={'errorFetching'}>Error fetching posts</div> :
            posts.map((post, index) => (
                <ModPostItem
                    key={post.postId}
                    // displayImage={index === 0}
                    displayImage={true}
                    post={post}
                />
            ))
          }
        </div>
    )
}

export default PostList;