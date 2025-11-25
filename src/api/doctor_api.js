import axios from "axios";
import { url } from "../globalParams";

const getAllDoctors = async (secret) => {
    try {
        let response = await axios.get(`${url}/doctors`, {
            headers: {
                'key': secret,
                'Content-Type': 'application/json'
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getDoctorById = async (id, secret) => {
    try {
        let response = await axios.get(`${url}/doctors/${id}`, {
            headers: {
                'key': secret,
                'Content-Type': 'application/json'
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const createDoctor = async (doctorData, secret) => {
    try {
        let response = await axios.post(`${url}/doctors`, doctorData, {
            headers: {
                'key': secret,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const updateDoctor = async (id, doctorData, secret) => {
    try {
        let response = await axios.put(`${url}/doctors/${id}`, doctorData, {
            headers: {
                'key': secret,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const updateDoctorPassword = async (id, password, secret) => {
    try {
        let response = await axios.patch(`${url}/doctors/password/${id}`, { password }, {
            headers: {
                'key': secret,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteDoctor = async (id, secret) => {
    try {
        let response = await axios.delete(`${url}/doctors/${id}`, {
            headers: {
                'key': secret,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    updateDoctorPassword,
    deleteDoctor
}