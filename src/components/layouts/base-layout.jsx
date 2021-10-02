import React from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import PropTypes from 'prop-types';

function BaseLayout({ children }) {
    return (
        <>
            <AppHeader />
            <Main>
                { children }
            </Main>
        </>
    )
}

BaseLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default React.memo(BaseLayout);