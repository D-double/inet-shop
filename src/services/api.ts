import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

api.interceptors.request.use((config)=>{
    const localAccess = localStorage.getItem('access');
    if (localAccess && localAccess != null) {
        config.headers.Authorization = `Bearer ${localAccess}`
    }
    // console.log(config);
    return config
}, (error)=>{
    console.log(error);
})

async function refreshToken() {
    try {
        const localRefresh = localStorage.getItem('refresh')
        if(localRefresh) {
            const response = await api.post('/auth/login/refresh', {
                refresh: localRefresh
            })
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            return response.data.access
        }
        return null;
    } catch (error) {
        console.log('Ошибка обновления токена' + error);
    }
}

api.interceptors.response.use((response)=>response, async (error)=>{
    const config = error.config;
    if(error.status == 401 && config.url != '/auth/login/refresh') {
        const accessToken =  await refreshToken()
        if (!accessToken) {
            return Promise.reject(error)        
        }
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        return api(config)
    }
    else if (error.status == 401 && config.url == '/auth/login/refresh') {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
    }
    return Promise.reject(error)
})

export default api