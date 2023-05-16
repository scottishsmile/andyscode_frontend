import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/blog/CategoryLabel.module.scss'
import { HOMEPAGE_URL } from '@/constants/constants'

const CategoryLabel = ({children}) => {


    return (
        <div className={styles.categoryContainer}>
            <Link href={`${HOMEPAGE_URL}/blog/category/${children.toLowerCase()}`} className={styles.categoryLink}>{children}</Link>
        </div>
    )
}

export default CategoryLabel;