import styles from '@/styles/blog/BlogPage.module.scss'
import BlogLayout from '@/shared/blog/BlogLayout';
import Link from 'next/link'
import fs from 'fs';           // Node.js file system module. Runs on server not frontend client. Can only be used inside server functions like getStaticProps().
import path from 'path';
import Post from '@/components/blog/Post';
import GetPosts from '@/components/blog/GetPosts';
import Pagination from '@/components/blog/Pagination';
import CategoryList from '@/components/blog/CategoryList';
import { sortByDate } from '@/utils/SortByDate' ;
import { BLOG_POSTS_PER_PAGE } from '@/constants/constants';
import Search from '@/components/blog/Search';


const BlogPage = ({ posts, numPages, currentPage, categories }) => {

    return (
        <BlogLayout
            title='Blog'
            description='News and Articles'
            keywords=''
        >
            <div className={styles.pagecontainer}>

                <div className={styles.columnContainer}>

                    <div className={styles.leftColumn}>
                        <h1 className={styles.headerH1}>Blog</h1>
                        <div className={styles.postsContainer}>
                            {posts.map((post, index) => (
                                <Post key={index} post={post} />
                            ))}
                        </div>
                        <Pagination currentPage={currentPage} numPages={numPages} />
                    </div>

                    <div className={styles.rightColumn}>
                        <CategoryList categories={categories} />
                        <Search />
                    </div>
                </div>
            </div>
            <br />
        </BlogLayout>
    )
}
    
export default BlogPage;


export async function getStaticPaths() {

    const files = fs.readdirSync(path.join('src/blogposts'));

    // Pagination. How many posts per page on the Blog Homepage ?
    // Total pages = Total markdown files divided by how many posts we want per page.
    const numPages = Math.ceil(files.length / BLOG_POSTS_PER_PAGE);

    // Generate the page route urls based on how many blog posts per page.
    // Dynamic   /blog/page/[page_index].js
    // Page 1 is /blog/page/1
    // Page 2 is /blog/page/2
    let paths = []

    // Fill the paths array with our page indexes.
    // { params: { page_index: '1' } }
    // { params: { page_index: '2' } }
    // { params: { page_index: '3' } }
    for(let i = 1; i <= numPages; i++){
        paths.push({
            params: {page_index: i.toString()}
        })
    }

    return {
        paths,
        fallback: false
    }

}


export async function getStaticProps({params}){

    // Check for page index, if it doesn't exist then make it page 1
    // So if you enter /blog/page/1000 and it doesn't exist you are taken to page 1
    const page = parseInt((params && params.page_index) || 1);

    const posts = GetPosts();

    const files = fs.readdirSync(path.join('src/blogposts'));
    const numPages = Math.ceil(files.length / BLOG_POSTS_PER_PAGE);
    const pageIndex = page - 1;
    const orderedPosts = posts
        .sort(sortByDate)                                                                       // Sort the posts by earliest date first
        .slice(pageIndex * BLOG_POSTS_PER_PAGE, (pageIndex + 1) * BLOG_POSTS_PER_PAGE)          // slice(0,3) takes the first 3 pages. So we want to slice by groupings of the posts per page
                                                                                                // Use page 1 as example - slice( 1 * 6, 2 * 6) is slice(6, 12) so take from post 6 - 12 as the next page.

    // Sidebar
    // Build array of Category names from all of the posts
    const categories = posts.map(post => post.frontmatter.category);

    // There will be duplicates, so filter them out.
    const uniqueCategories = [...new Set(categories)]

    return {
        props: {
            posts: orderedPosts,
            numPages,
            currentPage: page,
            categories: uniqueCategories
        },
    }
}