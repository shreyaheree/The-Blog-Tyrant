import React, {useEffect, useState} from 'react';
import './userpostlist.scss'
import PostItem from '../postItem/PostItem';
import {getPostByUserId} from '../../services/post-service';

const UserPostList = ({user }) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const getPosts = async () => {
            try{
                const response = await getPostByUserId(user.userId)
                setPosts(response)
            }catch(e){
                console.log('Error fetching user`s posts')
            }
        }
        getPosts()
    }, [user])
    return (
        <div className={'userPostList'}>
            {
                posts.length > 0 ? posts.map(post =>
                    <div key={post.postId} className={'userPostListItem'}>
                        <PostItem post={post}/>
                    </div>
                ) : <div className={'noPostsCreatedByUser'}>You haven't created posts yet</div>
            }
        </div>
    );
};

export default UserPostList;