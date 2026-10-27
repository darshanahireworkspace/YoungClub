/**
 * Storage Service
 * Handles localStorage operations with error handling, JSON parsing,
 * and key prefixing for the Young Club application.
 */

const STORAGE_PREFIX = 'youngclub_';

export const storageService = {
  /**
   * Get an item from localStorage
   * @param {string} key 
   * @param {*} defaultValue 
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from storage:`, error);
      return defaultValue;
    }
  },

  /**
   * Set an item in localStorage
   * @param {string} key 
   * @param {*} value 
   */
  set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
      return false;
    }
  },

  /**
   * Remove an item from localStorage
   * @param {string} key 
   */
  remove(key) {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
      return false;
    }
  },

  /**
   * Clear all Young Club keys from localStorage
   */
  clear() {
    try {
      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(k);
        }
      });
      return true;
    } catch (error) {
      console.error('Error clearing youngclub storage:', error);
      return false;
    }
  }
};
