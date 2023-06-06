import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/blog/SearchResultsBox.module.scss'

const SearchResultsBox = ({ title, text, error }) => {


    return (
        <>
        <div className={styles.postContainer}>
            <div className={styles.text}>
                <span className={styles.errorTitle}>{ title }</span>
            </div>
            <div className={styles.content}>
                <p className={styles.errorText}>{ text }</p>
                <p className={styles.errorText}>{ error }</p>
            </div>
        </div>
        </>
    )
}

export default SearchResultsBox;