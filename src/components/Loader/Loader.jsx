import React from 'react'
import styles from './Loader.module.scss'


const Loader = () => {
    return (
        <div className={`container ${styles.container}`}>
            <p className={styles.text}>Loading</p>
        </div>
    )
}


export default Loader