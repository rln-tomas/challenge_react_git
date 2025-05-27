import { useCallback, useEffect, useState } from "react";
import { GitHubUser, UseGithubUsersReturn } from "../interfaces";
import { fetchUsersAPI, searchUsersAPI } from "../services/userService";

export const useGithubUsers = (): UseGithubUsersReturn => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [lastUserId, setLastUserId] = useState<number>(0);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const [searchPage, setSearchPage] = useState<number>(1);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(true);
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>("");

  const fetchUsersInternal = useCallback(
    async (since = 0, isReload = false) => {
      if (currentSearchTerm && since === 0 && !isReload) {
        return;
      }

      if (!currentSearchTerm) {
        setIsSearchMode(false);
      }

      const isInitialLoadOrReload = since === 0;
      if (isInitialLoadOrReload) setLoading(true);
      else setLoadingMore(true);

      try {
        const data = await fetchUsersAPI(since);

        if (data.length > 0) {
          if (isInitialLoadOrReload) {
            setUsers(data);
          } else {
            setUsers((prevUsers) => [...prevUsers, ...data]);
          }
          setLastUserId(data[data.length - 1].id);
          setHasMoreResults(data.length === 25);
        } else {
          if (isInitialLoadOrReload) {
            setUsers([]);
          }
          setHasMoreResults(false);
        }
      } catch (error) {
        console.error("Error caught in fetchUsersInternal (hook):", error);
        setHasMoreResults(false);
        if (isInitialLoadOrReload) setUsers([]);
      } finally {
        if (isInitialLoadOrReload) setLoading(false);
        setLoadingMore(false);
      }
    },
    [currentSearchTerm]
  );

  const handleSearchInternal = useCallback(
    async (query: string, page: number = 1) => {
      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        setCurrentSearchTerm("");
        setIsSearchMode(false);
        setUsers([]);
        setHasMoreResults(true);
        setLoading(false);
        return;
      }

      setCurrentSearchTerm(trimmedQuery);
      setIsSearchMode(true);
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const result = await searchUsersAPI(trimmedQuery, page);

        if (result.items) {
          if (page === 1) {
            setUsers(result.items);
          } else {
            setUsers((prevUsers) => [...prevUsers, ...result.items]);
          }
          setSearchPage(page);
          setHasMoreResults(
            result.items.length === 30 && page * 30 < result.total_count
          );
        } else {
          if (page === 1) setUsers([]);
          setHasMoreResults(false);
        }
      } catch (error) {
        console.error("Error caught in handleSearchInternal (hook):", error);
        if (page === 1) setUsers([]);
        setHasMoreResults(false);
      } finally {
        if (page === 1) setLoading(false);
        setLoadingMore(false);
      }
    },
    []
  );

  const reloadData = useCallback(async () => {
    if (isSearchMode && currentSearchTerm) {
      await handleSearchInternal(currentSearchTerm, 1);
    } else {
      setLastUserId(0);
      await fetchUsersInternal(0, true);
    }
  }, [
    isSearchMode,
    currentSearchTerm,
    handleSearchInternal,
    fetchUsersInternal,
  ]);

  const handleSearch = useCallback(
    async (query: string) => {
      const trimmedQuery = query.trim();
      await handleSearchInternal(trimmedQuery, 1);
    },
    [handleSearchInternal]
  );

  const loadMoreUsers = useCallback(async () => {
    if (loading || loadingMore || !hasMoreResults) return;

    if (isSearchMode) {
      if (!currentSearchTerm) return;
      await handleSearchInternal(currentSearchTerm, searchPage + 1);
    } else {
      await fetchUsersInternal(lastUserId);
    }
  }, [
    isSearchMode,
    currentSearchTerm,
    searchPage,
    loading,
    loadingMore,
    hasMoreResults,
    lastUserId,
    fetchUsersInternal,
    handleSearchInternal,
  ]);

  const resetSearch = useCallback(() => {
    setCurrentSearchTerm("");
    setIsSearchMode(false);
    setSearchPage(1);
    setLastUserId(0);
    fetchUsersInternal(0, true);
  }, [fetchUsersInternal]);

  useEffect(() => {
    if (!currentSearchTerm && users.length === 0) {
      setLoading(true);
      fetchUsersInternal(0, false).finally(() => setLoading(false));
    }
  }, [currentSearchTerm, fetchUsersInternal, users.length]);

  return {
    users,
    loading,
    loadingMore,
    isSearchMode,
    hasMoreResults,
    handleSearch,
    loadMoreUsers,
    resetSearch,
    reloadData,
  };
};
