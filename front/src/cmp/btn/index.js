import cn from 'classnames'
import styles from './styles.module.css'

const Btn = ({ title, act, submit, className }) => {
    return (
        <button
            className={cn(styles.btn, className)}
            onClick={act}
            type={submit ? 'submit' : 'button'}
        >
            {title}
        </button>
    )
}

export default Btn