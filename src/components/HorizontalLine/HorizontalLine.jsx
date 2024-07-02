import styles from './HorizontalLine.module.scss'


const HorizontalLine = ({ className }) => {
    return (
        <hr className={`${styles.horLine} ${className}`} />
    )
}


export default HorizontalLine