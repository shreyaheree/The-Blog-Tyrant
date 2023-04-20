import React, {FC} from 'react';
import './notfound.scss'
import Button from "../../components/common/button/Button.tsx";
import {Link} from "react-router-dom";


const NotFound: FC = () => {
    return (
        <div className={'notFound'}>
            <h1>Page not found</h1>
            <Link to={'/'} className={'link'}>
                <Button text={'Return to home'}/>
            </Link>

        </div>
    );
};

export default NotFound;