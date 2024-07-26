import { Logo, LinkComponent, Account } from '../index'
import styles from "./styles.module.css"

const Header = ({ loggedIn, onSignOut, name }) => {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <LinkComponent href='/' title={<Logo />} />                
                <LinkComponent href='/people' title='Пользователи' />                
                <Account onSignOut={onSignOut} name={name} />
            </div>
        </header>
    )
}

export default Header