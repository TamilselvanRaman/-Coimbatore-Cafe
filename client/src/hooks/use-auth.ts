// Temporary auth hook placeholder
export function useAuth() {
  return {
    user: null,
    loading: false,
    error: null,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
    clearError: () => {},
  };
}