import { Win } from '../../../cmp'
import styles from './styles.module.css'

const Card = ({name, img, age}) => {
    return (
        <Win>
            <div className={styles.container}>
                <img src={img} className={styles.img} alt=''/>
                <span className={styles.name}>{name}</span>
                <span className={styles.age}>{age + ' ' + suffix(age)}</span>
            </div>
        </Win>
    )
}

export default Card

function suffix(age) {
    let count = age % 100
    if (count >= 5 && count <= 20) return "лет"
    count %= 10
    if (count === 1) return "год"
    if (count >= 2 && count <= 4) return "года"
    return "лет"
}