import React from 'react';
import './comment.scss';
import {formatDate} from '../../helpers/helpers.ts';
import defaultusericon from '../../assets/images/defaultusericon.avif';

const Comment = ({comment}) => {
    return (
        <div className = {'comment'}>
          <img src={comment.blogger.profilePicture? comment.blogger.profilePicture : defaultusericon} alt="avatar"/>
            <div className={'commentAuthor'}>
                <span className={'commentAuthorName'}>{comment.blogger.bloggerName} • <span className={'commentDate'}>{formatDate(comment.createdDateTime)}</span></span>
                <div className={'commentText'}>{comment.commentDescription}</div>
            </div>  
        </div>
    );
};

export default Comment;