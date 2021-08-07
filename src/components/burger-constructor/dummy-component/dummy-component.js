import React, { useMemo } from 'react'
import styles from './dummy-component.module.css';
import PropTypes from 'prop-types';


function DummyComponent({ children, type }) {

    const style = useMemo(() => {
        switch (type) {
            case 'top':
                return [styles.dummy, styles.dummy_top].join(' ');
            case 'bottom':
                return [styles.dummy, styles.dummy_bottom].join(' ');
            default:
                return styles.dummy;
        }
    }, [type]);

    return (
        <div className={style}>
            <p className="text text_type_main-default">{children}</p>
        </div>
    );
}

DummyComponent.propTypes = {
    children: PropTypes.string,
    type: PropTypes.string,
}

export default DummyComponent