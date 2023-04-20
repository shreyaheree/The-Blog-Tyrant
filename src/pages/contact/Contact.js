import React, {FC} from 'react';
import './contact.scss'
import Button from "../../components/common/button/Button.tsx";
import {Link} from "react-router-dom";

const Contact =  () => {
    return (
        <div className={'contact'}>
            <Link to={'/about'} className={'link'}>
                <Button text={'Visit about page'}/>
            </Link>
        </div>
    );
};

export default Contact;