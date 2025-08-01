import axios from "axios";
import { url } from "../globalParams";


const fetchFollowups = async (secret) => {
    try {
        let response = await axios.get(`${url}/followups`,{
            headers: {
                'key': secret, // custom header
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    };
};

const addFollowUp = async (followUp, secret) => {
    try {
        let response = await axios.post(`${url}/followups`, followUp, {
            headers: {
                'key': secret, // custom header
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    };
};

const updateFollowUp = async(id, followup, secret) => {
    try {
        let response = await axios.put(`${url}/followups/${id}`, followup, {
            headers: {
                'key': secret, // custom header
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { fetchFollowups, addFollowUp, updateFollowUp };