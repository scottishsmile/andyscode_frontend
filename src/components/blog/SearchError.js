import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/blog/SearchError.module.scss'

const SearchError = ({ error }) => {


    return (
        <>
        <div className={styles.postContainer}>
            <div className={styles.text}>
                <span className={styles.errorTitle}>Error</span>
            </div>
            <div className={styles.content}>
                <p className={styles.errorText}>Oops! Something has went wrong with our search bar... Use the category links above instead!</p>
                <p className={styles.errorText}>{ error }</p>
            </div>
        </div>
        </>
    )
}

export default SearchError;