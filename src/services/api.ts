import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token')
  if (accessToken && accessToken != null) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  // console.log(config);
  return config;
}, (error) => {
  // console.log(error);
})

async function refreshToken() {
  try {
    const response = await api.post('/auth/login/refresh', {
      refresh: localStorage.getItem('refresh_token'),
    });
    localStorage.setItem('access_token', response.data.access);
    return response.data.access;
  } catch (error) {
    console.error('Ошибка обновления токенов:', error);
    throw error;
  }
}

// Axios interceptor для обработки обновления токенов
api.interceptors.response.use(
  response => response, // Просто возвращаем успешный ответ без изменений
async error => {
  console.log(error);
  const originalRequest = error.config;
  console.log(originalRequest);
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

try {
  const accessToken = await refreshToken(); 
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  return api(originalRequest);
} catch (refreshError) {
  // Если возникла ошибка при обновлении токенов, перенаправляем пользователя на страницу аутентификации или обрабатываем ошибку иным способом
  console.error('Ошибка при обновлении токенов:', refreshError);
  throw refreshError; // Можно обработать ошибку по вашему усмотрению
}
  }

  return Promise.reject(error); // Возвращаем оригинальную ошибку, если это не 401 или уже была попытка повторного запроса
}
);

export default api