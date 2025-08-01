import axios from "axios";
import { url } from "../globalParams";

const getDashboardPatientData = async (name, secret) => {
    try {
        let response = await axios.post(`${url}/dashboard`, {doctor: name}, {
            headers: {
                'key': secret, // custom header
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export { getDashboardPatientData };