import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Btn, Field, Radio, Title, Photo } from "../../../cmp"

import styles from './styles.module.css'
import api from "../../../api"

const logo = require('../../../images/signup.png')
const login_p = require('../../../images/login_p.png')
const email_p = require('../../../images/email_p.png')
const pass_p = require('../../../images/pass_p.png')

export default function Registration({ setAuth, onSignIn }) {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')
    const [born, setBorn] = useState(null)
    const [sex, setSex] = useState(true)
    const [photo, setPhoto] = useState(null)
    const [mes, setMes] = useState('')

    return (
        <div className={styles.container}>
            <Title text='Регистрация' img={logo} />
            <div className={styles.fields}>
                <Field
                    title='Имя'
                    placeholder="Введите имя"
                    img={login_p}
                    act={setName}
                    type="text"
                    required
                />
                <Field
                    title='Пароль'
                    placeholder="Введите пароль"
                    img={pass_p}
                    act={setPass1}
                    type="password"
                    required
                />
            </div>
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
                    title='Повторите пароль'
                    placeholder="Введите пароль"
                    img={pass_p}
                    act={setPass2}
                    type="password"
                    required
                />
            </div>
            <div className={styles.fields}>
                <Field
                    title='Дата рождения'
                    type="date"
                    act={setBorn}
                    required
                />
            </div>
            <div className={styles.fields}>
                <Radio
                    title='Пол'
                    data={[
                        {
                            id: 'male',
                            value: true,
                            name: 'Муж'
                        },
                        {
                            id: 'female',
                            value: false,
                            name: 'Жен'
                        }
                    ]}
                    name='sex'
                    checked={sex}
                    act={setSex}
                />

            </div>
            <Photo setPhoto={setPhoto} />
            {mes && <p className={styles.message}>{mes}</p>}
            <div className={styles.btn_fields}>
                <Btn title='Регистрация' act={signup} />
                <Btn title='Отмена' act={_ => setAuth(true)} />
            </div>
        </div>
    )

    function signup() {
        if (!name) return setMes('Заполните имя!')
        if (!email) return setMes('Заполните почту!')
        if (!pass1) return setMes('Заполните пароль!')
        if (pass1 !== pass2) return setMes('Пароли должны совпадать!')
        if (!photo) return setMes('Выберите фото!')
        if (!born) return setMes('Заполните дату рождения!')
        let fd = new FormData()
        fd.append('name', name)
        fd.append('email', email)
        fd.append('password', pass1)
        fd.append('born', born)
        fd.append('sex', sex)
        fd.append('photo', photo)

        api.signUp(fd)
            .then(_ => onSignIn({ email, password: pass1 }))
            .then(_ => navigate('/account'))
            .catch(error => setMes(error))
    }
}