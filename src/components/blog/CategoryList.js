import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/blog/CategoryList.module.scss'

const CategoryList = ({ categories }) => {


    // Sort the category array alphabetically.
    const sortedCategories = categories.sort();

    return (
        <>
        <div className={styles.categoryListContainer}>
            <h4>Categories</h4>
            <ul>
                {sortedCategories.map((category, index) => (
                    <li key={index}><Link href={`/blog/category/${category.toLowerCase()}`} className={styles.categoryLink}>{category}</Link></li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default CategoryList;