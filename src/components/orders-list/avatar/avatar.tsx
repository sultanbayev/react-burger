import React from 'react';
import styles from './styles.module.css';

const ComponentAvatar: React.FC<{ image: string; alt: string }> = ({ image, alt }) => {
    return (
        <div className={styles.avatar}>
            <img src={image} className={styles.img} alt={ alt || 'unknown ingredient' } />
        </div>
    );
}

export default React.memo(ComponentAvatar); 