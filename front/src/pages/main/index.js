import { useState } from "react"
import { Win } from "../../cmp"

import styles from './styles.module.css'
import Auth from "./auth"
import Registration from "./reg"

export default function Main({ onSignIn }) {
    const [auth, setAuth] = useState(true)

    return (
        <Win>
            {auth ?
                <Auth setAuth={setAuth} onSignIn={onSignIn} />
                :
                <Registration setAuth={setAuth} onSignIn={onSignIn} />
            }
        </Win>
    )
}