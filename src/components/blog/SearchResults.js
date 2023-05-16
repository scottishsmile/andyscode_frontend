import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/blog/SearchResults.module.scss'
import Post from '@/components/blog/Post'
import SearchError from '@/components/blog/SearchError';

export default function SearchResults({ results }) {

    // Don't show the search results box if there's no results.
    if(results === undefined || results.length === 0) return <></> 

    // Display Error Msg if there is one
    if(results.error){
        return (
        <>
        <div className={styles.searchResultsContainer}>
            <div className={styles.resultsBox}>
                <SearchError error={results.error} />
            </div>
        </div>
        </>
        )
    } 

    return (
        <>
        <div className={styles.searchResultsContainer}>
            <div className={styles.resultsBox}>
                <p className={styles.textResults}><b>{results.length} Results</b></p>

                {results.map((result, index) => (
                    <Post key={index} post={result} compact={true}/>
                ))}
            </div>
        </div>
        </>
    )
}
