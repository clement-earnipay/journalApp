import apiRoutes from "../config/apiRoutes";
import ApiService from "../data/ApiService";
import { handleApiError } from "../handlers/error_handler";
import { Ok, Result } from "../handlers/result_type";
import { CustomError } from "../models/error";
import { JournalEntry } from "../models/journal";

const apiService = new ApiService();

class JournalService {
  private apiService: ApiService;

  constructor() {
    this.apiService = apiService;
  }

  async fetchJournalEntries(): Promise<Result<JournalEntry[], CustomError>> {
    try {
      const response = await this.apiService.get(apiRoutes.journalEntries);
      const entries = JournalEntry.fromJSONList(response.data["data"]);
      return new Ok(entries);
    } catch (error) {
      return handleApiError(
        error,
        "Failed to fetch journal entries",
        "FETCH_ERROR"
      );
    }
  }

  async createJournalEntry(
    entry: JournalEntry
  ): Promise<Result<JournalEntry, CustomError>> {
    try {
      const response = await this.apiService.post(
        apiRoutes.journalEntries,
        entry
      );
      const parsed = JournalEntry.fromJSON(response.data["data"]);
      return new Ok(parsed);
    } catch (error) {
      return handleApiError(
        error,
        "Error creating journal entry",
        "CREATE_ERROR"
      );
    }
  }

  async updateJournalEntry(
    id: string,
    entry: Partial<JournalEntry>
  ): Promise<Result<JournalEntry, CustomError>> {
    try {
      const response = await this.apiService.put(
        apiRoutes.journalEntry(id),
        entry
      );
      return new Ok(JournalEntry.fromJSON(response.data["data"]));
    } catch (error) {
      return handleApiError(
        error,
        "Error updating journal entry",
        "UPDATE_ERROR"
      );
    }
  }

  async deleteJournalEntry(id: string): Promise<Result<null, CustomError>> {
    try {
      await this.apiService.delete(apiRoutes.journalEntry(id));
      return new Ok(null);
    } catch (error) {
      return handleApiError(
        error,
        "Error deleting journal entry",
        "DELETE_ERROR"
      );
    }
  }

  async fetchJournalEntry(
    id: string
  ): Promise<Result<JournalEntry, CustomError>> {
    try {
      const response = await this.apiService.get(apiRoutes.journalEntry(id));
      return new Ok(JournalEntry.fromJSON(response.data["data"]));
    } catch (error) {
      return handleApiError(
        error,
        "Failed to fetch journal entry",
        "FETCH_ERROR"
      );
    }
  }
}

export default new JournalService();
