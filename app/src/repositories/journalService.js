import apiRoutes from "../config/apiRoutes";
import ApiService from "../data/ApiService";

const apiService = new ApiService();


class JournalService {

    constructor() {
        this.apiService = apiService;
    }


    async fetchJournalEntries(){
        try {
            const response = await apiService.get(apiRoutes.journalEntries);
            return response.data;
        } catch (error) {
            console.error("Error fetching journal entries", error);
        }
    }

    async createJournalEntry(entry){
        try {
            const response = await apiService.post(apiRoutes.journalEntries, entry);
            return response.data;
        } catch (error) {
            console.error("Error creating journal entry", error);
        }
    }

    async updateJournalEntry(id, entry){
        try {
            const response = await apiService.put(apiRoutes.journalEntry(id), entry);
            return response.data;
        } catch (error) {
            console.error("Error updating journal entry", error);
        }
    }
    async deleteJournalEntry(id){
        try {
            await apiService.delete(apiRoutes.journalEntry(id));
        } catch (error) {
            console.error("Error deleting journal entry", error);
        }
    }

    async fetchJournalEntry(id){
        try {
            const response = await apiService.get(apiRoutes.journalEntry(id));
            return response.data;
        } catch (error) {
            console.error("Error fetching journal entry", error);
        }
    }
}

export default new JournalService();