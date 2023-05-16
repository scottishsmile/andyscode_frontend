import styles from '@/styles/blog/CategoryBlogPage.module.scss'
import BlogLayout from '@/shared/blog/BlogLayout';
import Link from 'next/link'
import fs from 'fs';           // Node.js file system module. Runs on server not frontend client. Can only be used inside server functions like getStaticProps().
import path from 'path';
import matter from 'gray-matter';          // Grey Matter turns markdown front matter into an object. npm install gray-matter
import Post from '@/components/blog/Post';
import GetPosts from '@/components/blog/GetPosts';
import CategoryList from '@/components/blog/CategoryList';
import { sortByDate } from '@/utils/SortByDate';
import Search from '@/components/Blog/Search';



const CategoryBlogPage = ({ posts, categoryName, categories }) => {

    // Capitalise first letter of selected category name
    // word[0].toUpperCase() is the first letter
    // word.substr(1) is the remaining letters in the word afetr the first letter.
    const selectedCategory = categoryName[0].toUpperCase() + categoryName.substr(1);

    return (
        <BlogLayout
            title='Blog'
            description='News and Articles'
            keywords=''
        >
            <div className={styles.pagecontainer}>
                <div className={styles.columnContainer}>

                    <div className={styles.leftColumn}>
                        <h1 className={styles.headerH1}>{selectedCategory} Posts</h1>
                        <div className={styles.postsContainer}>
                            {posts.map((post, index) => (
                                <Post key={index} post={post} />
                            ))}
                        </div>
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
    
export default CategoryBlogPage;


export async function getStaticPaths() {

    const files = fs.readdirSync(path.join('src/blogposts'));

    // Build an array of the post categories
    const categories = files.map(filename => {
        const markdownMeta = fs.readFileSync(path.join('src/blogposts', filename), 'utf-8');

        const {data:frontmatter} = matter(markdownMeta);

        return frontmatter.category.toLowerCase()
    })

    const paths = categories.map(category => ({
        params: {category_name: category}
    }))

    return {
        paths,
        fallback: false
    }


}


export async function getStaticProps({params: {category_name}}){

    const posts = GetPosts();

    // Build array of Category names from all of the posts
    const categories = posts.map(post => post.frontmatter.category);

    // There will be duplicates, so filter them out.
    const uniqueCategories = [...new Set(categories)]

    // Filter Posts By Category
    const categoryPosts = posts.filter(post => post.frontmatter.category.toLowerCase() === category_name)

    return {
        props: {
            posts: categoryPosts.sort(sortByDate),
            categoryName: category_name,
            categories: uniqueCategories
        },
    }
}