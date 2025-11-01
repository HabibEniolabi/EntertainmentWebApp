// 'use client';

// import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks';
// import { setSearchQuery, setSearchResults, clearSearch } from '@/src/lib/store/slices/searchSlice';
// import { useState, useEffect, useRef } from 'react';
// import Search from '@/src/assets/icons/Search';
// import styles from './styles.module.scss';
// import { useSearch } from '@/src/lib/store/useSearch';

// export default function Header() {
//   const dispatch = useAppDispatch();
//   const { query, results, isSearching } = useAppSelector((state) => state.search);
//   const { items } = useAppSelector((state) => state.media);
  
//   const [localQuery, setLocalQuery] = useState(query);
//   const [isFocused, setIsFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
  
//   const searchRef = useRef<HTMLDivElement>(null);

//   // Debounced search with Redux integration
//   useEffect(() => {
//     if (!localQuery.trim()) {
//       dispatch(clearSearch());
//       setIsLoading(false);
//       return;
//     }

//     setIsLoading(true);
    
//     const timeoutId = setTimeout(() => {
//       // Update Redux state
//       dispatch(setSearchQuery(localQuery));
      
//       // Perform search/filtering
//       const filteredResults = items.filter(item =>
//         item.title.toLowerCase().includes(localQuery.toLowerCase())
//       );
      
//       dispatch(setSearchResults(filteredResults));
//       setIsLoading(false);
//     }, 300);

//     return () => {
//       clearTimeout(timeoutId);
//       setIsLoading(false);
//     };
//   }, [localQuery, items, dispatch]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setIsFocused(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleClearSearch = () => {
//     setLocalQuery('');
//     dispatch(clearSearch());
//     setIsFocused(false);
//   };

//   const handleSelectResult = (result: any) => {
//     console.log('Selected:', result.title);
//     setIsFocused(false);
//     setLocalQuery(result.title);
//   };

//   return (
//     <div ref={searchRef} className="flex items-center gap-2 w-full">
//       <div className={styles.header}>
//         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width={32} height={32} />
        
//         <input
//           type="text"
//           value={localQuery}
//           onChange={(e) => setLocalQuery(e.target.value)}
//           onFocus={() => setIsFocused(true)}
//           placeholder="Search for movies or TV series"
//           className={styles.input}

//         />
        
//         {localQuery && (
//           <button
//             onClick={handleClearSearch}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
//           >
//             ×
//           </button>
//         )}
//       </div>

//       {/* Enhanced Dropdown with Redux Results */}
//       {isFocused && isSearching && (
//         <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
//           {isLoading ? (
//             <div className="p-4 text-center text-gray-400">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
//               <p className="mt-2">Searching...</p>
//             </div>
//           ) : results.length > 0 ? (
//             <div className="py-2">
//               {results.map((result) => (
//                 <button
//                   key={result.id || result.title}
//                   onClick={() => handleSelectResult(result)}
//                   className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
//                 >
//                   <div className="text-white font-medium">{result.title}</div>
//                   <div className="text-gray-400 text-sm mt-1">
//                     {result.year} • {result.category} • {result.rating}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           ) : localQuery.trim() ? (
//             <div className="p-4 text-center text-gray-400">
//               No results found for "{localQuery}"
//             </div>
//           ) : null}
//         </div>
//       )}
//     </div>
//   );
// }

'use client';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks';
import { setSearchQuery, setSearchResults, clearSearch } from '@/src/lib/store/slices/searchSlice';
import { useState, useEffect, useRef } from 'react';
import Search from '@/src/assets/icons/Search';
import { MediaCard }  from '../../card/MediaCard/MediaCard';
import styles from './styles.module.scss';

export default function Header() {
  const dispatch = useAppDispatch();
  const { query, results, isSearching } = useAppSelector((state) => state.search);
  const { items } = useAppSelector((state) => state.media);
  
  const [localQuery, setLocalQuery] = useState(query);
  // const [hasSearched, setHasSearched] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounced search with Redux integration
  useEffect(() => {
    if (!localQuery.trim()) {
      dispatch(clearSearch());
      // setHasSearched(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      // Update Redux state
      dispatch(setSearchQuery(localQuery));
      // setHasSearched(true);
      
      // Perform search/filtering
      const filteredResults = items.filter(item =>
        item.title.toLowerCase().includes(localQuery.toLowerCase())
      );
      
      dispatch(setSearchResults(filteredResults));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localQuery, items, dispatch]);

  const handleClearSearch = () => {
    setLocalQuery('');
    // setHasSearched(false);
    dispatch(clearSearch());
  };

  // Determine if we should show search results
  const showSearchResults = localQuery.trim().length > 0;

  return (
    <div className={styles.headerContainer}>
      {/* Search Input - Always visible */}
      <div ref={searchRef} className={styles.searchSection}>
        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} width={32} height={32} />
          
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search for movies or TV series"
            className={styles.searchInput}
          />
          
          {localQuery && (
            <button
              onClick={handleClearSearch}
              className={styles.clearButton}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Search Results Display - Replaces normal content without gap */}
      {showSearchResults && (
        <div className={styles.resultsSection}>
          <h1 className={styles.resultsTitle}>
            Found {results.length} result{results.length !== 1 ? 's' : ''} for '{query}'
          </h1>
          
          <div className={styles.resultsGrid}>
            {results.map((item) => (
              <MediaCard key={item.id} item={item} variant="regular" />
            ))}
          </div>

          {results.length === 0 && (
            <div className={styles.noResults}>
              No results found for "{localQuery}"
            </div>
          )}
        </div>
      ) }
    </div>
  );
}