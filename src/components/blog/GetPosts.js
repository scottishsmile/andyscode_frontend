import fs from 'fs';           // Node.js file system module. Runs on server not frontend client. Can only be used inside server functions like getStaticProps().
import path from 'path';
import matter from 'gray-matter';          // Grey Matter turns markdown front matter into an object. npm install gray-matter
import { sortByDate } from '@/utils/SortByDate' ;

const files = fs.readdirSync(path.join('src/blogposts'));

const GetPosts = () => {

    const posts = files.map(filename => {
        const slug = filename.replace('.md', '');           // Get the slug name from the path, just take away the file type.

        // Get the Front Matter form post - title, date, excerpt, author etc.
        const markdownMeta = fs.readFileSync(path.join('src/blogposts', filename), 'utf-8');

        // Use grey matter to parse the mardownMeta into an object
        const {data:frontmatter} = matter(markdownMeta);


        return {
            slug,
            frontmatter,
        }
    })

    return posts.sort(sortByDate);

}

export default GetPosts;
