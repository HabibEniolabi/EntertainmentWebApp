// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import Search from '@/src/assets/icons/Search';

// interface MediaItem {
//   title: string;
//   year: number;
//   category: "Movie" | "TV Series";
//   rating: string;
//   isBookmarked: boolean;
//   isTrending: boolean;
// }

// export default function Header() {
//   const [query, setQuery] = useState('');
//   const [isFocused, setIsFocused] = useState(false);
//   const [results, setResults] = useState<MediaItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
  
//   const inputRef = useRef<HTMLInputElement>(null);
//   const searchRef = useRef<HTMLDivElement>(null);

//   // Search through your JSON data
//   const searchMedia = async (searchQuery: string): Promise<MediaItem[]> => {
//     if (!searchQuery.trim()) return [];
    
//     setIsLoading(true);
    
//     try {
//       // Fetch from your JSON file
//       const response = await fetch('/api/media'); // or your JSON Server URL
//       const allMedia: MediaItem[] = await response.json();
      
//       // Filter results based on search query
//       const filteredResults = allMedia.filter(item =>
//         item.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
      
//       return filteredResults;
//     } catch (error) {
//       console.error('Search error:', error);
//       return [];
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Search when user types
//   useEffect(() => {
//     if (!query.trim()) {
//       setResults([]);
//       return;
//     }

//     const timeoutId = setTimeout(async () => {
//       const searchResults = await searchMedia(query);
//       setResults(searchResults);
//     }, 300);

//     return () => clearTimeout(timeoutId);
//   }, [query]);

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

//   const handleSelectResult = (result: MediaItem) => {
//     console.log('Selected:', result.title);
//     setIsFocused(false);
//     setQuery(result.title);
//   };

//   return (
//     <div ref={searchRef} className="relative w-full max-w-2xl">
//       <div className="relative">
//         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        
//         <input
//           ref={inputRef}
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={() => setIsFocused(true)}
//           placeholder="Search for movies or TV series"
//           className="w-full pl-12 pr-4 py-4 bg-gray-800 text-white placeholder-gray-400 rounded-lg border-0 focus:outline-none focus:ring-0 text-lg"
//         />
//       </div>

//       {/* Dropdown with actual search results */}
//       {isFocused && query && (
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
//                   key={result.title}
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
//           ) : (
//             <div className="p-4 text-center text-gray-400">
//               No results found for "{query}"
//             </div>
//           )}
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

export default function Header() {
  const dispatch = useAppDispatch();
  const { query, results, isSearching } = useAppSelector((state) => state.search);
  const { items } = useAppSelector((state) => state.media);
  
  const [localQuery, setLocalQuery] = useState(query);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounced search with Redux integration
  useEffect(() => {
    if (!localQuery.trim()) {
      dispatch(clearSearch());
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    const timeoutId = setTimeout(() => {
      // Update Redux state
      dispatch(setSearchQuery(localQuery));
      
      // Perform search/filtering
      const filteredResults = items.filter(item =>
        item.title.toLowerCase().includes(localQuery.toLowerCase())
      );
      
      dispatch(setSearchResults(filteredResults));
      setIsLoading(false);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      setIsLoading(false);
    };
  }, [localQuery, items, dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClearSearch = () => {
    setLocalQuery('');
    dispatch(clearSearch());
    setIsFocused(false);
  };

  const handleSelectResult = (result: any) => {
    console.log('Selected:', result.title);
    setIsFocused(false);
    setLocalQuery(result.title);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform-translate-y-1/2 text-gray-400" width={25} height={25} />
        
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for movies or TV series"
          className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-400 rounded-lg border-0 text-lg"
        />
        
        {localQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        )}
      </div>

      {/* Enhanced Dropdown with Redux Results */}
      {isFocused && isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={result.id || result.title}
                  onClick={() => handleSelectResult(result)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
                >
                  <div className="text-white font-medium">{result.title}</div>
                  <div className="text-gray-400 text-sm mt-1">
                    {result.year} • {result.category} • {result.rating}
                  </div>
                </button>
              ))}
            </div>
          ) : localQuery.trim() ? (
            <div className="p-4 text-center text-gray-400">
              No results found for "{localQuery}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}