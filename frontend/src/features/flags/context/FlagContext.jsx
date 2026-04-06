import React, { createContext, useState, useCallback } from 'react';
import { flagService } from '../services/flagService';

export const FlagContext = createContext();

export const FlagProvider = ({ children }) => {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    environment: null,
    enabled: null,
    search: '',
  });

  const fetchFlags = useCallback(async () => {
    try {
      setLoading(true);
      const response = await flagService.getAllFlags(filters);
      setFlags(response.data.data);
    } catch (error) {
      console.error('Error fetching flags:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const value = {
    flags,
    loading,
    filters,
    setFilters,
    fetchFlags,
    setFlags,
  };

  return <FlagContext.Provider value={value}>{children}</FlagContext.Provider>;
};
