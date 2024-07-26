import styles from './styles.module.css'

const Radio = ({ title, data, name, act, checked }) => {
    if (!data?.length) return null
    return (
        <div className={styles.container}>
            <label className={styles.label}>{title}</label>
            <div className={styles.box}>
                {data.map((el, i) => <div
                    key={i}
                    className={styles.input}>
                    <label htmlFor={el.id}>{el.name}</label>
                    <input
                        id={el.id}
                        type='radio'
                        value={el.value}
                        name={name}
                        onChange={e => act(e.target.value)}
                        checked={el.value.toString() == checked.toString()}
                    />
                </div>)}
            </div>
        </div>
    )
}

export default Radio