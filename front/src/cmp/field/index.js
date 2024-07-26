import styles from './styles.module.css'

const Field = ({ id, title, placeholder, type, img, required, act, value }) => {
    return (
        <div className={styles.container}>
            <label htmlFor={id} className={styles.label}>
                {title}
            </label>
            <div className={styles.field}>
                <input
                    id={id}
                    className={styles.input}
                    placeholder={placeholder}
                    onChange={e => act(e.target.value)}
                    value={value}
                    type={type}
                    required={required}
                />
                {img && <div
                    className={styles.img}
                    style={{ backgroundImage: `url(${img})` }}
                ></div>}
            </div>
        </div>
    )
}

export default Field