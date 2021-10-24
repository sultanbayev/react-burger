import React from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';

interface IBaseLayoutProps {
    children: React.ReactNode;
}

const BaseLayout: React.FC<IBaseLayoutProps> = ({ children }) => {
    return (
        <>
            <AppHeader />
            <Main>
                { children }
            </Main>
        </>
    )
}

export default React.memo(BaseLayout);