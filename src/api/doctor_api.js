import axios from "axios";
import { url } from "../globalParams";

const getAllDoctors = async (secret) => {
    try {
        let response = await axios.get(`${url}/doctors`, {
            headers: {
                'key': secret, // custom header
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const updateDoctor = async (doctor, secret) => {
    try {
        let response = await axios.put(`${url}/doctors/${doctor._id}`, doctor, {
            headers: {
                'key': secret, // custom header
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export {
    getAllDoctors,
    updateDoctor,
}