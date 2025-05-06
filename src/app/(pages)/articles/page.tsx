'use client';

import { useEffect, useState } from 'react';
import { useFetchData } from '@/hooks/useFetchData';
import { useSearch } from '@/hooks/useSearch';
import { Article } from "@/generated/prisma";
import { Pagination } from '@/componnents/article/Pagination';
import Loading from '@/componnents/loading/Loading';
import ErrorPage from './error';
import ArticlesList from '@/componnents/article/ArticlesList';
import { HeaderSection } from '@/componnents/article/HeaderSection';

export default function Articles() {
  const [page, setPage] = useState(1);
  
  // Fetch paginated articles
  const { 
    data: paginatedArticles, 
    loading: paginationLoading, 
    error: paginationError, 
    pagination: fetchPagination 
  } = useFetchData<Article>('articles', page);
  
  // Search functionality
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    loading: searchLoading,
    error: searchError,
    isSearchActive,
    pagination: searchPagination
  } = useSearch<Article>('articles', page);

  // Determine which articles and pagination to display
  const displayArticles = isSearchActive ? 
    (searchResults || []) : 
    paginatedArticles;
  
  const displayPagination = isSearchActive ? 
    searchPagination : 
    fetchPagination;
  
  const loading = isSearchActive ? searchLoading : paginationLoading;
  const error = isSearchActive ? searchError : paginationError;

  // Reset to page 1 when search term changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  if (error) return <ErrorPage />;

  return (
    <div className="container mx-auto px-4 py-8">
      <HeaderSection 
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {loading ? (
        <Loading />
      ) : (
        <>
          <ArticlesList articles={displayArticles} />
          {displayPagination && (
            <Pagination 
              count={displayPagination.totalPages} 
              page={page} 
              onChange={setPage} 
            />
          )}
        </>
      )}
    </div>
  );
}