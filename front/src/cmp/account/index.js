import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { LinkComponent } from '../index'

import styles from './styles.module.css'

const logout = require('../../images/logout.png')

const Account = ({ onSignOut, name }) => {
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return (
            <div className={styles.menu}>
                <LinkComponent
                    className={styles.menuLink}
                    href='/'
                    title='Войти' />
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <a
                className={styles.menuLink}
                onClick={_ => navigate('/account')}
            >
                <span className={styles.name}>{name}</span>
            </a>
            <a
                className={styles.menuLink}
                onClick={onSignOut}
                title='Выйти'
            >
                <div className={styles.logout}>
                    <img src={logout} className={styles.img} alt='logout' />
                </div>
            </a>
        </div>
    )
}
export default Account