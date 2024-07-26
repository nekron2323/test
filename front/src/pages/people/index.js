import { useEffect, useState } from "react"
import api from "../../api"
import Card from "./card"

export default function People() {
    const [data, setData] = useState(null)
    const user = localStorage.getItem('user')
    useEffect(_ => {
        api.getPeople({ id: JSON.parse(user)?._id ?? '' })
            .then(setData)
            .catch(console.log)
    }, [user])
    if (!data) return null
    return (
        <>
            {data.map((el, key) => <Card key={key} name={el.name} age={el.age} img={el.img}/>)}
        </>
    )
}