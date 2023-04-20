import React, {FC, ReactNode} from 'react';
import './layout.scss'
import Navbar from "../navbar/NavBar";
import Footer from "../footer/Footer";

interface LayoutProps{
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {

    return (
        <div className={'layout'}>
            <Navbar/>
            <div className={'main'}>
                <div className={'mainWrapper'}>
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;