
export const sortByDate = (a, b) => {

    // Sort posts into earliest post first.

    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
}