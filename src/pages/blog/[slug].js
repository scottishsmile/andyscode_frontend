import styles from '@/styles/blog/PostPage.module.scss'
import BlogLayout from '@/shared/blog/BlogLayout';
import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs';           // Node.js file system module. Runs on server not frontend client. Can only be used inside server functions like getStaticProps().
import path from 'path';
import matter from 'gray-matter';          // Grey Matter turns markdown front matter into an object. npm install gray-matter
import CategoryLabel from '@/components/blog/CategoryLabel';
import { marked } from 'marked';                                    // Parse markdown. npm install marked.

const PostPage = ({ frontmatter: { title, meta_desc, meta_keywords, date, excerpt, cover_image, category, author, author_image }, content, slug }) => {

    return (
        <BlogLayout
            title={`${title}`}
            description={`${meta_desc}`}
            keywords={`${meta_keywords}`}
        >
            <div className={styles.pagecontainer}>
               <div className="row align-items-center justify-content-center pt-4">
                    <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 rounded p-4 shadow bg-white">
                        <div className={styles.mainContainer }>
                            <Link href='/blog'> Go Back </Link>
                            <h1 className={styles.title}>{title}</h1>
                            <CategoryLabel className={styles.categoryLabel}>{category}</CategoryLabel>
                        </div>
                        <div className={styles.coverImgContainer} >
                            <Image src={cover_image} className={styles.coverImg} height={50} width={50} layout="responsive" objectFit="contain" alt='' />
                        </div>
                        <div>
                            <div className={styles.authorBarContainer}>
                                <div className={styles.authorImgContainer}>
                                    <Image src={author_image} className={styles.authorImg} height={50} width={50} alt='' />
                                    <h4>{author}</h4>
                                </div>
                                <div className={styles.date}>
                                    {date}
                                </div>
                            </div>
                        </div>
                        <div className={styles.blogText}>
                            <div dangerouslySetInnerHTML={{ __html: marked(content) }} ></div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </BlogLayout>
    )
}
    
export default PostPage;


export async function getStaticPaths(){

    const files = fs.readdirSync(path.join('src/blogposts'));

    // Get the url path, same as the file path '/my-slug-name.md' except without the '.md' at the end
    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.md', '')
        }
    }))

    return {
        paths,
        fallback: false                                     // Get a 404 if the route path doesn't exist
    }
}


export async function getStaticProps({params: {slug}}){

    const markdownMeta = fs.readFileSync(path.join('src/blogposts', slug + '.md'), 'utf-8');

    // Rename data to frontmatter
    // Grab the Blog Meta titles using gray-matter
    // Grab the blog post content as well using gray-matter
    const {data: frontmatter, content} = matter(markdownMeta)

    return {
        props: {
            frontmatter,
            content,
            slug
        },
    }
}