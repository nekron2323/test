import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Btn, Field, Title } from "../../../cmp"

import styles from './styles.module.css'

const logo = require('../../../images/login.png')
const email_p = require('../../../images/email_p.png')
const pass_p = require('../../../images/pass_p.png')

export default function Auth({ setAuth, onSignIn }) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [mes, setMes] = useState('')
    const user = localStorage.getItem('user')
    useEffect(_ => {
        if (user) navigate('/account')
    }, [])
    return (
        <div className={styles.container}>
            <Title text='Авторизация' img={logo} />
            <div className={styles.fields}>
                <Field
                    title='E-mail'
                    placeholder="Введите почту"
                    img={email_p}
                    act={setEmail}
                    type="email"
                    required
                />
                <Field
                    title='Пароль'
                    placeholder="Введите пароль"
                    img={pass_p}
                    type="password"
                    act={setPass}
                    required
                />
            </div>
            {mes && <p className={styles.message}>{mes}</p>}
            <div className={styles.btn_fields}>
                <Btn title='Войти' act={signin} />
                <Btn title='Регистрация' act={_ => setAuth(false)} />
            </div>
        </div>
    )

    function signin() {
        if (!email) return setMes('Заполните почту!')
        if (!pass) return setMes('Заполните пароль!')
        onSignIn({ email, password: pass })
            .then(_ => navigate('/account'))
            .catch(err => setMes(err))
    }
}