import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./pages/main";
import Account from "./pages/account";
import People from "./pages/people";
import api from "./api";
import { AuthContext, UserContext } from './contexts';
import { Header } from "./cmp"

import './App.css';


export default function App() {
    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(null)
    const [user, setUser] = useState(null)

    const authorization = ({ email, password }) => {
        return new Promise((resolve, reject) => {
            api.signIn({ email, password })
                .then(res => {
                    localStorage.setItem('user', JSON.stringify(res.user))
                    setLoggedIn(true)
                    setUser(res.user)
                    resolve()
                })
                .catch(err => {
                    console.log('Login error', err.toString());
                    setLoggedIn(false)
                    onSignOut()
                    reject(err)
                })
        })

    }

    const onSignOut = () => {
        localStorage.clear()
        setLoggedIn(false)
        navigate('/')
    }

    useEffect(_ => {
        if (localStorage.user) {
            try {
                setUser(JSON.parse(localStorage.getItem('user')))
                setLoggedIn(true)
            } catch (err) {
                onSignOut()
            }
        }
    }, [])


    return (
        <AuthContext.Provider value={loggedIn}>
            <UserContext.Provider value={user}>
                <Header loggedIn={loggedIn} onSignOut={onSignOut} name={user?.name} />
                <Routes>
                    <Route path='/' element={<Main onSignIn={authorization} />} />
                    <Route path='/account' element={<Account onSignIn={authorization}/>} />
                    <Route path='/people' element={<People />} />
                </Routes>
            </UserContext.Provider>
        </AuthContext.Provider>
    )
}