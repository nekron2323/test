import styles from './styles.module.css';

const Title = ({text, img}) => {
	return (
		<div className={styles.title}>
			<img className={styles.img} src={img} alt="" />
			<p className={styles.text}>{text}</p>
		</div>
	);
}

export default Title