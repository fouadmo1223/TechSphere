'use client';

import { HOST } from '@/utils/constants';
import { PaginationType } from '@/utils/types';
import { useState, useEffect } from 'react';

type FetchDataType<T> = {
  data: T[];
  pagination?: PaginationType;
};

export function useFetchData<T>(
  endpoint: 'articles' | 'comments' | 'users',
  page: number
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationType | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${HOST}/api/${endpoint}?page=${page}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
        }
        
        const { data, pagination }: FetchDataType<T> = await response.json();
        setData(data);
        setPagination(pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [endpoint, page]);

  return { data, loading, error, pagination };
}