import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import logger from '@/logger/logger';

const SearchReq = async (req, res) => {

    // Get search term from query params
    const searchTerm = req.query.searchTerm;

    if(req.method === 'GET'){

        // Intended to deploy on a VM where we have access to the filesystem.
        // If the webhost doesn't allow access to the file system then we need to use caching/Husky to access the blog posts.

        try {
        let posts

        const files = fs.readdirSync(path.join('src/blogposts'))

        posts = files.map((filename) => {

            // Needed for building the url in SearchResults
            const slug = filename.replace('.md', '')

            const markdownWithMeta = fs.readFileSync(
                path.join('src/blogposts', filename),
                'utf-8'
            )

            const { data: frontmatter } = matter(markdownWithMeta)

            return {
                slug,
                frontmatter,
            }
        })


        // filter() will return -1 if there's no results.
        const results = posts.filter(
            ({ frontmatter: { title, excerpt, category } }) =>
            title.toLowerCase().indexOf(searchTerm) != -1 ||
            excerpt.toLowerCase().indexOf(searchTerm) != -1 ||
            category.toLowerCase().indexOf(searchTerm) != -1
        )

        if (results !== null || results !== undefined) {
            // Send Success 200 OK
            res.status(200).json(results)
           

        } else {

            // Fail.

            logger.warn(`api/blog/search.js - Something went wrong reading the blog posts files. results: `, results);

            return res.status(500).json({
                error: 'Could Not Search',
                success: false, 
            });
        }



        }
        catch(err){

            // Fail
            logger.error('api/blog/search.js - Exception when reading the blog posts files - 500 Error ' + err);

            return res.status(500).json({
                error: 'Exception in search',
                success: false, 
            });

        }

    }
    else {

        // Fail. Not a GET request.
        res.setHeader('Allow', ['GET']);

        logger.info(`api/blog/search.js - Method: ${req.method} . Wrong Request Type. It should be a GET request!`);

        return res.status(405).json({ 'error': `Method ${req.method} not allowed`});
    }
}
export default SearchReq;