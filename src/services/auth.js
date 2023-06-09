import axios from 'axios'
import config from '@/config'
import { successHandler, errorHandler } from './handlers';

export const login = (credentials) => {
    return axios.post(
        `${config.apiBaseUrl}/auth/login`,
        credentials,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(successHandler)
        .catch(errorHandler);
};