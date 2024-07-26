import styles from './styles.module.css'

const logo = require('../../images/logo.png')

const Logo = () => {
    return (
        <img src={logo} className={styles.img} alt='logo' />
    )
}

export default Logo