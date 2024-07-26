import cn from 'classnames'
import styles from './styles.module.css'

const Win = ({ children, className }) => {
    return (
        <div className={cn(styles.container, className)}>
            {children}
        </div>
    )
}

export default Win