import React from 'react';
import './about.scss'
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const About = () => {
    // useTitle('About')
    return (
        <div className={'aboutWrapper'}>
            <div className={'about'}>
                <h1>About</h1>
                <div className={'aboutInfo'}>
                    <p>Hello everyone, this is the Daily Scribbles Team.</p>
                    <p>Team Members : Puthin Kumar, Aayush Mangal, Nikhil Sunkad, Kuruba Naveen</p>
                    <p>This is a full-stack blog application built in React⚛️ and Spring Boot.</p>
                    <div className={'aboutFeatures'}>
                        <div className={'aboutFeaturesLeft'}>
                            <h4>App features:</h4>
                            <ul className={'dashed'}>
                                <li>Authentication/Authorization system</li>
                                <li>Creating posts</li>
                                <li>Editing user info</li>
                                <li>View list of posts</li>
                                <li>View single post</li>
                                <li>View latest posts</li>
                                <li>Creating comments</li>
                                <li>Validation of fields</li>
                                <li>Likes system</li>
                                <li>Content Moderation</li>
                                <li>Role Management</li>
                            </ul>
                        </div>
                    </div>
                    <h4 className={'aboutStack'}>Stack of technologies used for building this app:</h4>
                    <p>React, PostgreSQL, SCSS, TypeScript, Axios, Spring Boot</p>
                    <h3>Contact Us :</h3>
                    <div className={'aboutSocials'}>
                        <div className={'aboutSocialsItem'}>
                            <MailOutlineIcon className={'socialIcon'}/>
                            <span className={'socialItemSpan'}>thedailyscribbles@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;