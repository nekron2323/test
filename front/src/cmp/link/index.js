import { Link } from 'react-router-dom'
import cn from 'classnames'
import styles from './styles.module.css'

const LinkComponent = ({ href, className, title }) => {
    return (
        <Link className={cn(styles.link, className)} to={href}>
            {title}
        </Link>
    )
}

export default LinkComponent