import axios from "axios";
import { url } from "../globalParams";

const getAllDocuments = async (secret) => {
    try {
        let response = await axios.get(`${url}/documents`, {
            headers: {
                'key': secret,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const addDocument = async (formData, secret) => {
    try {
        const response = await axios.post(`${url}/documents`, formData, {
            headers: {
                'key': secret,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.log("Document upload failed", error);
        throw error;
    }
};

const deleteDocument = async (id, secret) => {
    try {
        let response = await axios.delete(`${url}/documents/${id}`, {
            headers: {
                'key': secret,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { getAllDocuments, addDocument, deleteDocument };