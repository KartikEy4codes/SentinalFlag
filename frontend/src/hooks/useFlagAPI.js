import { useState, useCallback } from 'react';
import { flagService } from '../services/flagService';
import { toast } from 'react-toastify';

export const useFlagAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createFlag = useCallback(async (flagData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await flagService.createFlag(flagData);
      toast.success('Flag created successfully');
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Error creating flag';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFlag = useCallback(async (id, flagData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await flagService.updateFlag(id, flagData);
      toast.success('Flag updated successfully');
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Error updating flag';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteFlag = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await flagService.deleteFlag(id);
      toast.success('Flag deleted successfully');
    } catch (err) {
      const message = err.response?.data?.message || 'Error deleting flag';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleFlag = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await flagService.toggleFlag(id);
      toast.success(`Flag ${response.data.data.enabled ? 'enabled' : 'disabled'}`);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Error toggling flag';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createFlag,
    updateFlag,
    deleteFlag,
    toggleFlag,
  };
};
