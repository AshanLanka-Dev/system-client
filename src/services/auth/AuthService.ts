import axios from 'axios';
import {UserLoginCredentials} from "../../interfaces/UserLoginCredentials.ts";


const AuthService = () => {

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const login = (credentials: UserLoginCredentials) => {
       return axios.post(`${baseUrl}/auth/login`, {...credentials});
    };

    const logout = () => {

    };

    const validate = () => {
        return axios.get(`${baseUrl}/auth/validate`, {withCredentials:true});
    };

    return {login, logout,validate};
};

export default AuthService;
