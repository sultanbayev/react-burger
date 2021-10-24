import { useMemo, FC, memo } from 'react'
import styles from './styles.module.css';

interface IDummyComponentProps {
    type?: string;
    children: React.ReactNode;
}

const DummyComponent: FC<IDummyComponentProps> = ({ children, type }) => {

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

export default memo(DummyComponent);