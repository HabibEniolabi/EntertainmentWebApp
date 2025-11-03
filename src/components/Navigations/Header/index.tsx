'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Search from '@/src/assets/icons/Search';
import styles from './styles.module.scss';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [localQuery, setLocalQuery] = useState(searchParams.get('q') || '');

  // Update URL when search changes (this works across all pages)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (localQuery.trim()) {
        params.set('q', localQuery);
      } else {
        params.delete('q');
      }
      
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localQuery, pathname, router, searchParams]);

  const handleClearSearch = () => {
    setLocalQuery('');
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.searchSection}>
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
            <button onClick={handleClearSearch} className={styles.clearButton}>
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
}