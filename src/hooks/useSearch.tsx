// hooks/useSearch.ts
import { useState, useEffect } from 'react';
import { useDebounce } from '@/helpers/Debounce';

interface PaginationData {
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export const useSearch = <T,>(endpoint: string, page: number = 1) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const debouncedTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        
        let url = `/api/${endpoint}`;
        if (debouncedTerm) {
          url += `/search?searchText=${encodeURIComponent(debouncedTerm)}&page=${page}`;
        } else {
          // If no search term, clear results
          setSearchResults(null);
          setPagination(null);
          return;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const result = await response.json();
        setSearchResults(result.data);
        
        // Assuming your API returns pagination info like this:
        if (result.pagination) {
          setPagination({
            totalPages: result.pagination.totalPages,
            currentPage: result.pagination.currentPage,
            totalItems: result.pagination.totalItems
          });
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedTerm, endpoint, page]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    loading,
    error,
    isSearchActive: !!debouncedTerm,
    pagination
  };
};