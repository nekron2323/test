import { useState, useEffect } from "react"

import styles from './styles.module.css'

const Photo = ({ photo, setPhoto }) => {
    const [val, setVal] = useState()
    const [file, setFile] = useState()
    const [picked, setPicked] = useState(false)

    useEffect(_ => {
        if (picked) {
            let reader = new FileReader()
            reader.onloadend = () => {
                setVal(reader.result)
            }
            reader.readAsDataURL(file)
            setPicked(false)
        }
    }, [picked, file])

    return (
        <div className={styles.container}>
            <img className={styles.img} src={val ?? photo} />
            <label className={styles.label} onChange={onChange}>
                <input id='photo' type='file' className={styles.input} />
            </label>
        </div>
    )

    function onChange(e) {
        e.preventDefault()
        const { files } = e.target
        let fd = new FormData()
        fd.append('photo', files[0])
        setPhoto(files[0])
        setPicked(true)
        setFile(files[0])
    }
}

export default Photo