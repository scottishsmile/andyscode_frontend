import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/blog/Search.module.scss'
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import SearchResults from '@/components/blog/SearchResults';

const Search = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {


        const getResults = async () => {
            if(searchTerm === ''){
    
                // Show no search results popup
                setSearchResults([]);
                
            } else {
    
                // Leave the url like this to avoid CORS errors. No ${HOMEPAGE_URL}
                const res = await fetch(`/api/blog/search?searchTerm=${searchTerm}`);

                const results = await res.json()

                // Show search results pop up with the results.
                // Error handling within SearchResults
                setSearchResults(results)
    
            }
        }
        
        getResults();

    }, [searchTerm]);

    // The user may hit the enter key when entering search results.
    const hitEnterKey = (e) => {
        e.preventDefault();

        if(searchResults.length > 0){
            // If they have entered a search term that has results, don't do anything.
            return false;
        } else {
            // If their search term produces no results, tell them.
            setSearchResults("zero");
        }
    }

    return (
        <>
        <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
                <div className={styles.searchForm}>
                    <form onSubmit={(e) => hitEnterKey(e)}>
                        <input type='search' name='search' id='search' className={styles.searchInput} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search...' />
                        <FaSearch className={styles.searchIcon} />
                    </form>
                </div>
            </div>
            <SearchResults results={searchResults} />
        </div>
        </>
    )
}

export default Search;