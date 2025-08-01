import axios from "axios";
import { url } from "../globalParams";

const getAllPatients = async (secret) => {
    try {
        let response = await axios.get(`${url}/patients`,{headers: {
                'key': secret,
                'Content-Type': 'application/json'
            },});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const addPatient = async (patientData, secret) => {
    try {
        let response = await axios.post(`${url}/patients`, patientData, {headers: { 'key': secret,'Content-Type': 'application/json' }})
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getPatientById = async(id, secret) => {
    try {
        let response = await axios.get(`${url}/patients/${id}`, { headers: { 'key': secret, 'Content-Type': 'application/json' } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const updatePatient = async(id, payload, secret) => {
    try {
        let response = await axios.put(`${url}/patients/${id}`, payload, { headers: { 'key': secret, 'Content-Type': 'application/json' } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const deletePatient = async(id, secret) => {
    try {
        let response = await axios.delete(`${url}/patients/${id}`, { headers: { 'key': secret, 'Content-Type': 'application/json' } });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export { getAllPatients, addPatient, getPatientById, updatePatient, deletePatient };