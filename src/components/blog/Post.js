import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/blog/Posts.module.scss'
import CategoryLabel from './CategoryLabel'

const Post = ({ post, compact }) => {


    return (
        <>
        { compact ?
        /* Compact Search Result */
        <div className={styles.postContainer}>
            <div className={styles.text}>
                <span className={styles.compactDate}>{post.frontmatter.date}</span>
            </div>
            <div className={styles.Content}>
                <Link href={`/blog/${post.slug}`} className={styles.compactLink} >{post.frontmatter.title}</Link>
                <p className={styles.compactContentText}>{post.frontmatter.excerpt}</p>
            </div>
        </div>
        :
        /* Full Result */
        <div className={styles.postContainer}>
                <Link href={`/blog/${post.slug}`}><Image src={post.frontmatter.cover_image} className={styles.postImage} height={250} width={350} layout="responsive" objectFit="contain" alt='' /></Link>
            <div className={styles.text}>
                <span className={styles.date}>{post.frontmatter.date}</span>
                <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
            </div>
            <div className={styles.content}>
                <Link href={`/blog/${post.slug}`} className={styles.link} >{post.frontmatter.title}</Link>
                <p className={styles.contentText}>{post.frontmatter.excerpt}</p>
            </div>
                <div className={styles.readMoreContainer}>
                    <Link href={`/blog/${post.slug}`} className={styles.readMoreLink} >Read More...</Link>
                    <div className={styles.authorPicAndName}>
                        <div className={styles.authorImgContainer}>
                                <Image src={post.frontmatter.author_image} className={styles.authorImg} height={50} width={50} layout="responsive" objectFit="contain" alt='' />
                        </div>
                        <p>{post.frontmatter.author}</p>
                    </div>
                </div>
        </div>

    }
        </>
    )
}

export default Post;