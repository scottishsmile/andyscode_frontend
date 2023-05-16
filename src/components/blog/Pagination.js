import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/blog/Pagination.module.scss'

const Pagination = ({ currentPage, numPages }) => {

    const isFirstPage = currentPage === 1;                  // Are we on the first page? The current page will be 1.
    const isLastPage = currentPage === numPages;            // Are we on the last page? The current page will equal the total page count.
    const prevPage = `/blog/page/${currentPage - 1}`;
    const nextPage = `/blog/page/${currentPage + 1}`;

    const pageNumArray = Array.from({length: numPages});

    // If there's only 1 page then return nothing
    if(numPages === 1){
        return <></>
    }

    return (
        <div className={styles.paginationContainer}>
            <ul className={styles.pageNumList}>
                {/* Link to Previous Page. Don't show if on the first page. */}
                {!isFirstPage && (
                    <Link href={prevPage} className={styles.previousLink}>
                        <li className={styles.previousLi}>Previous</li>
                    </Link>
                )}

                {/* Page Numbers */}
                {pageNumArray.map((page, index) => (
                    <Link key={index} href={`/blog/page/${index + 1}`} className={styles.pageNumLink}>
                        { (index+1) === currentPage ?
                            <li key={index} className={styles.pageNumCurrent}>{ index + 1 }</li>

                        :
                            <li key={index} className={styles.pageNumLi}>{ index + 1}</li>
                        }
                    </Link>
                ) )}

                {/* Link to Next Page. Don't show if on the last page. */}
                {!isLastPage && (
                    <Link href={nextPage} className={styles.nextLink}>
                        <li className={styles.nextLi}>Next</li>
                    </Link>
                )}
            </ul>
        </div>
    )
}

export default Pagination;