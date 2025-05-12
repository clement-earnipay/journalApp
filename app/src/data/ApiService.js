import axios from "axios";
import apiRoutes from "../config/apiRoutes";


class ApiService {

    constructor(){
        this.api = axios.create({ 
            baseURL: "https://api.example.com", 
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async fetchJournalEntries(){
        try {
            const response = await this.api.get(apiRoutes.journalEntries);
        } catch (error) {
            console.error("Error fetching journal entries", error);
        }
    }

    async createJournalEntry(entry){
        try {
            const response = await this.api.post(apiRoutes.journalEntries, entry);
            return response.data;
        } catch (error) {
            console.error("Error creating journal entry", error);
        }
    }

    async updateJournalEntry(id, entry){
        try {
            const response = await this.api.put(apiRoutes.journalEntry(id), entry);
            return response.data;
        } catch (error) {
            console.error("Error updating journal entry", error);
        }
    }
    async deleteJournalEntry(id){
        try {
            await this.api.delete(apiRoutes.journalEntry(id));
        } catch (error) {
            console.error("Error deleting journal entry", error);
        }
    }

    async fetchJournalEntry(id){
        try {
            const response = await this.api.get(apiRoutes.journalEntry(id));
            return response.data;
        } catch (error) {
            console.error("Error fetching journal entry", error);
        }
    }
}