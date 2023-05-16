import BlogPage from '@/blog/page/[page_index]';
import { getStaticProps } from '@/blog/page/[page_index]';

// Show Page 1 as the blog homepage
// Just export the BlogPage from /blog/page/[page_index] along with it's getStaticProps

export { getStaticProps }
export default BlogPage;
