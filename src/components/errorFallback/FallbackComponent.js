import React from 'react';
import Button from "../common/button/Button.tsx";
import './fallbackcomponent.scss'

const FallbackComponent = (props) => {
    const {error, resetErrorBoundary} = props
    return (
        <div className={'fallback'}>
            <div className={'fallbackMessage'}>
                <p>Something went wrong</p>
                <p>{error.message}</p>
            </div>
            <div className={'fallbackButton'}>
                <Button handleClick={resetErrorBoundary} text={'To Home'}/>
            </div>

        </div>
    );
};

export default FallbackComponent;