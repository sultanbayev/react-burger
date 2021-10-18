import styles from './styles.module.css';
import ComponentAvatar from '../avatar/avatar';
import PropTypes from 'prop-types';

function ComponentAvatarGroup({ items, max }) {

    const renderItems = [ ...items ].reverse();

    if (max && renderItems.length > max) {

        const rest = renderItems.length - max + 1;

        return (
            <div className={styles.group}>
                <div className={styles.more}>
                    <p className="text text_type_main-default">{`+${rest}`}</p>
                    <div className={styles.avatar}>
                        <ComponentAvatar
                            image={renderItems[renderItems.length - max].image}
                            alt={renderItems[renderItems.length - (max - 1)].name} />
                    </div>
                </div>
                { renderItems
                    .slice(renderItems.length - (max - 1), renderItems.length)
                    .map((item, index) => {
                        return (
                            <div key={index} className={styles.avatar}>
                                <ComponentAvatar image={item.image} alt={item.name} />
                            </div>
                        );
                }) }
            </div>
        );
    }

    return (
        <div className={styles.group}>
            { renderItems.map((item, index) => {
                return (<div key={index} className={styles.avatar}>
                    <ComponentAvatar image={item.image} alt={item.name} />
                    </div>);
            }) }
        </div>
    );
}

ComponentAvatarGroup.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
    })),
    max: PropTypes.number,
}

export default ComponentAvatarGroup; 