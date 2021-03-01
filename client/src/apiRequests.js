import axios from 'axios'

const apiInstance =  axios.create({
    baseURL:'http://127.0.0.1:8000/api/',
    timeout:5000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': "JWT " + localStorage.getItem('access_token'),
    },
})
// apiInstance.interceptors.response.use(
//     (response) => {return response},
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && 
//             error.response.statusText === 'Unauthorized'
//         ){
//             if (error.response.data.detail != "No active account found with the given credentials"){
//                 const refresh_token = localStorage.getItem('refresh_token')
//             return apiInstance
//                 .post('/token/refresh/',{refresh:refresh_token})
//                 .then(response => {
//                     localStorage.setItem('access_token', response.data.access);
//                     localStorage.setItem('refresh_token', response.data.refresh);
                    
//                     apiInstance.defaults.headers['Authorization'] = 'JWT '+response.data.access;
//                     originalRequest.headers['Authorization'] = 'JWT '+response.data.access;

//                     return apiInstance(originalRequest)
//                 })
//                 .catch(err =>{
//                     console.log(err)
//                 })
//             }
            
            
//         }
//         return Promise.reject(error)
//     }
// )

export default apiInstance;

