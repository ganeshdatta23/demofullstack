import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import type { ApiResponse, LoadingState } from '@/types';

// Generic API hook for data fetching
export function useApi<T>(
  endpoint: string,
  options?: {
    immediate?: boolean;
    params?: Record<string, any>;
    dependencies?: any[];
  }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (customParams?: Record<string, any>) => {
    setLoading(true);
    setError(null);

    try {
      const response: ApiResponse<T> = await api.get(endpoint, customParams || options?.params);
      if (response.success && response.data) {
        setData(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [endpoint, options?.params]);

  const refetch = useCallback((params?: Record<string, any>) => {
    return fetchData(params);
  }, [fetchData]);

  useEffect(() => {
    if (options?.immediate !== false) {
      fetchData();
    }
  }, options?.dependencies || [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    setData,
  };
}

// Hook for API mutations (POST, PUT, DELETE)
export function useApiMutation<TData, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (variables: TVariables) => {
    setLoading(true);
    setError(null);

    try {
      const response = await mutationFn(variables);
      if (response.success && response.data) {
        setData(response.data);
        return response.data;
      }
      throw new Error(response.error || 'Mutation failed');
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [mutationFn]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    mutate,
    reset,
  };
}

// Hook for paginated data
export function usePaginatedApi<T>(
  endpoint: string,
  options?: {
    limit?: number;
    initialParams?: Record<string, any>;
  }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = options?.limit || 10;

  const fetchData = useCallback(async (pageNum: number, reset: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: pageNum,
        limit,
        ...options?.initialParams,
      };

      const response: ApiResponse<any> = await api.get(endpoint, params);
      
      if (response.success && response.data) {
        const { items, total: totalItems, pages } = response.data;
        
        setData(prev => reset ? items : [...prev, ...items]);
        setTotal(totalItems);
        setHasMore(pageNum < pages);
        setPage(pageNum);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [endpoint, limit, options?.initialParams]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchData(page + 1);
    }
  }, [fetchData, loading, hasMore, page]);

  const refresh = useCallback(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    fetchData(1, true);
  }, [fetchData]);

  useEffect(() => {
    fetchData(1, true);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    hasMore,
    page,
    total,
    loadMore,
    refresh,
  };
}

// Hook for search functionality with debouncing
export function useApiSearch<T>(
  endpoint: string,
  options?: {
    debounceMs?: number;
    minQueryLength?: number;
  }
) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceMs = options?.debounceMs || 300;
  const minQueryLength = options?.minQueryLength || 2;

  const search = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < minQueryLength) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response: ApiResponse<T[]> = await api.get(endpoint, { q: searchQuery });
      if (response.success && response.data) {
        setResults(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint, minQueryLength]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(query);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [query, search, debounceMs]);

  const clearResults = useCallback(() => {
    setResults([]);
    setQuery('');
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearResults,
  };
}

// Hook for optimistic updates
export function useOptimisticUpdate<T>(
  initialData: T[],
  updateFn: (item: T) => Promise<T>
) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateItem = useCallback(async (item: T, optimisticUpdate: Partial<T>) => {
    // Apply optimistic update immediately
    setData(prev => prev.map(prevItem => 
      (prevItem as any).id === (item as any).id 
        ? { ...prevItem, ...optimisticUpdate }
        : prevItem
    ));

    setLoading(true);
    setError(null);

    try {
      const updatedItem = await updateFn(item);
      
      // Replace with actual server response
      setData(prev => prev.map(prevItem => 
        (prevItem as any).id === (updatedItem as any).id 
          ? updatedItem
          : prevItem
      ));
    } catch (err: any) {
      // Revert optimistic update on error
      setData(prev => prev.map(prevItem => 
        (prevItem as any).id === (item as any).id 
          ? item
          : prevItem
      ));
      setError(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  }, [updateFn]);

  return {
    data,
    loading,
    error,
    updateItem,
    setData,
  };
}