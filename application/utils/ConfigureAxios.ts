import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Platform } from 'react-native';
import AsyncStorageClass from 'application/utils/AsyncStorageClass';
import {store} from 'application/store/Index';
import type { RootState } from 'application/store/Index'

export default function makeApi(baseURL: string, multiPartFormData = false) {

    const api = axios.create({
        baseURL,
    })

    api.defaults.headers.post['Content-Type'] = multiPartFormData ? "multipart/form-data" : "application/json";

    api.defaults.headers.put['Content-Type'] = "application/json";

    api.defaults.headers.delete['Content-Type'] = "application/json";

    api.interceptors.request.use(
        async (config: any) => {
            const state: RootState = store.getState();
            const event_url = state.event.event_url;
            if (Platform.OS === 'web' && localStorage.getItem(`access_token_${event_url}`)) {
                config.headers = { ...config.headers, Authorization: `Bearer ${localStorage.getItem(`access_token_${event_url}`)}` }
            } else if (Platform.OS === "android" || Platform.OS === "ios") {
                const token = await AsyncStorageClass.getItem(`access_token_${event_url}`);
                if (token) {
                    config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
                }
            }
            return config;
        },
        (error) => Promise.reject(error)
    )

    api.interceptors.response.use((response) => response, (error) => {
        if (error.response.status === 403) {
            const path = window.location.pathname.split('/')[1]+'/forbidden';
            window.location.href = `${window.location.origin}/${path}`;
        }
        
        if (error.response.status === 401) {
            const state: RootState = store.getState();
            const event_url = state.event.event_url;
            if (Platform.OS === 'web') {
                localStorage.removeItem(`access_token_${event_url}`);
                localStorage.removeItem(`keyword_skip_${event_url}`);
                localStorage.removeItem(`skip_sub_reg_${event_url}`);
                localStorage.removeItem('skip_pending_appointment_alerts');
            } else {
                AsyncStorageClass.removeItem(`access_token_${event_url}`);
                AsyncStorageClass.removeItem(`keyword_skip_${event_url}`);
                AsyncStorageClass.removeItem(`skip_sub_reg_${event_url}`);  
                AsyncStorageClass.removeItem('skip_pending_appointment_alerts');
            }
            window.location.href = `${window.location.origin}/${event_url}/auth/login`;
            return {
                status: error.response.status,
                data: {
                    data: []
                }
            }
        } else if (error.response.status === 422) {
            return error.response;
        }
    });

    api.interceptors.response.use(
        (response) => {
            const responseData = response as AxiosResponse<any, any>;
            return responseData;
        }
    )

    return api
}