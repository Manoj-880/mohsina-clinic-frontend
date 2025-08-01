import axios from "axios";
import {url} from "../globalParams";

const login = async(data) => {
    try {
        let response = await axios.post(`${url}/login`, data);
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
        
    }
}

export default {
    login
};