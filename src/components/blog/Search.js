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

    return (
        <>
        <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
                <div className={styles.serachForm}>
                    <form>
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