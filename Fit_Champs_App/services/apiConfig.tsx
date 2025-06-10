// Using the apiClient wrapper
const fetchData = async () => {
  try {
    const response = await apiClient.get<User>('/users/me');
    console.log(response.data); // Typed as User
  } catch (error) {
    console.error(error.message);
  }
};

// Using the raw api instance
const rawFetch = async () => {
  try {
    const response = await api.get<ApiResponse<User>>('/users/me');
    console.log(response.data.data); // Access the typed data
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    console.error(axiosError.response?.data?.message);
  }
};
