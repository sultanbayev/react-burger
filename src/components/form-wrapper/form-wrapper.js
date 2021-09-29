import styles from './style.module.css';
import PropTypes from 'prop-types';

function FormWrapper({ children }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                { children }
            </div>
        </div>
    );
}

export default FormWrapper;

FormWrapper.propTypes = {
    children: PropTypes.node.isRequired,
}