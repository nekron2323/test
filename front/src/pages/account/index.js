import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import api from "../../api"

import { Btn, Field, Win } from "../../cmp"

import styles from './styles.module.css'
import Photo from "./photo"

const login_p = require('../../images/login_p.png')
const pass_p = require('../../images/pass_p.png')


export default function Account({ onSignIn }) {
    const navigate = useNavigate()
    const [data, setData] = useState();
    const user = localStorage.getItem('user')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState()
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')
    const [mes, setMes] = useState('')

    useEffect(_ => {
        if (!user) return navigate('/')
        if (user) api.getAccount({ id: JSON.parse(user)._id })
            .then(setData)
            .catch(console.log)
    }, [])

    useEffect(_ => {
        if (data) {
            setName(data.name)
            setEmail(data.email)
        }
    }, [data])

    if (!data) return null
    return (
        <Win className={styles.container}>
            <Photo photo={data.img} setPhoto={setPhoto} />
            <div className={styles.info}>
                <Field
                    title='Имя'
                    value={name}
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
                <Field
                    title='Повторите пароль'
                    placeholder="Введите пароль"
                    img={pass_p}
                    act={setPass2}
                    type="password"
                    required
                />
                <p className={styles.text}>Email: <span className={styles.text_value}>{data.email}</span></p>
                <p className={styles.text}>Дата рождения: <span className={styles.text_value}>{new Date(data.born).toLocaleDateString()}</span></p>
                <p className={styles.text}>Пол: <span className={styles.text_value}>{data.sex ? 'Муж' : "Жен"}</span></p>
                {mes && <p className={styles.message}>{mes}</p>}
                <Btn className={styles.btn} title='Сохранить' act={onchange} />
            </div>
        </Win>
    )

    function onchange() {
        if (pass1 !== pass2) return setMes('Пароли должны совпадать!')
        let fd = new FormData()
        fd.append('name', name)
        fd.append('email', email)
        if (pass1) fd.append('password', pass1)
        if (photo) fd.append('photo', photo)
        api.editAccount(fd)
            .then(_ => onSignIn({ email, password: pass1 }))
            .then(_ => navigate('/account'))
            .catch(error => setMes(error))
    }
}