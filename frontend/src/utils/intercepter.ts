import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tairot.online/",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // sessionStorage에서 리프레시 토큰을 가져옵니다.
      const refreshToken = sessionStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await axiosInstance.post(
            "/api/v1/users/refresh-token",
            {
              refreshToken,
            }
          );

          sessionStorage.setItem("accessToken", data.accessToken);

          originalRequest.headers["Authorization"] = data.accessToken;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
