import apiRoutes from "../config/apiRoutes";
import ApiService from "../data/ApiService";
import { handleApiError } from "../handlers/error_handler";
import { JournalEntry } from "../models/journal";

const apiService = new ApiService();

class JournalService {
  constructor() {
    this.apiService = apiService;
  }

  async fetchJournalEntries() {
    try {
      const response = await apiService.get(apiRoutes.journalEntries);
      return JournalEntry.fromJSONList(response.data["data"]);
    } catch (error) {
      handleApiError(error, "Failed to fetch journal entries", "FETCH_ERROR");
    }
  }

  async createJournalEntry(entry) {
    try {
      const response = await apiService.post(apiRoutes.journalEntries, entry);
      return JournalEntry.fromJSON(response.data["data"]);
    } catch (error) {
      handleApiError(error, "Error creating journal entry", "FETCH_ERROR");
    }
  }

  async updateJournalEntry(id, entry) {
    try {
      const response = await apiService.put(apiRoutes.journalEntry(id), entry);
      return JournalEntry.fromJSON(response.data["data"]);
    } catch (error) {
      handleApiError(error, "Error updating journal entry", "FETCH_ERROR");
    }
  }
  async deleteJournalEntry(id) {
    try {
      await apiService.delete(apiRoutes.journalEntry(id));
      return JournalEntry.fromJSON(response.data["data"]);
    } catch (error) {
      handleApiError(error, "Error deleting journal entry", "FETCH_ERROR");
    }
  }

  async fetchJournalEntry(id) {
    try {
      const response = await apiService.get(apiRoutes.journalEntry(id));
      return JournalEntry.fromJSON(response.data["data"]);
    } catch (error) {
      handleApiError(error, "Failed to fetch journal entry", "FETCH_ERROR");
    }
  }
}

export default new JournalService();
