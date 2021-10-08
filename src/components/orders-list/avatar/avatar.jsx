import styles from './styles.module.css';
import PropTypes from 'prop-types';

function ComponentAvatar({ image, alt }) {
    return (
        <div className={styles.avatar}>
            <img src={image} className={styles.img} alt={ alt || 'unknown ingredient' } />
        </div>
    );
}

ComponentAvatar.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
}

export default ComponentAvatar; 