import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/blog/CategoryLabel.module.scss'

const CategoryLabel = ({children}) => {


    return (
        <div className={styles.categoryContainer}>
            <Link href={`/blog/category/${children.toLowerCase()}`} className={styles.categoryLink}>{children}</Link>
        </div>
    )
}

export default CategoryLabel;