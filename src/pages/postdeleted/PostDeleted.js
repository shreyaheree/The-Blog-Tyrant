import React from 'react';
import './postdeleted.scss'
import Button from "../../components/common/button/Button.tsx";
import {Link} from "react-router-dom";


const PostDeleted = () => {
    return (
        <div className={'notFound'}>
            <h1>Post Deleted</h1>
            <Link to={'/'} className={'link'}>
                <Button text={'Return to home'}/>
            </Link>

        </div>
    );
};

export default PostDeleted;