import { Err, Ok, Result } from "../handlers/result_type";
import { CustomError } from "../models/error";
import { JournalEntry } from "../models/journal";
import journalService from "./journalService";
import JournalStorageService from "./journalStorageService";

class JournalRepository {
  private useRemote: boolean;

  constructor(useRemote = false) {
    this.useRemote = useRemote;
  }

  async fetchJournalEntries(): Promise<Result<JournalEntry[], CustomError>> {
    if (this.useRemote) {
      return await journalService.fetchJournalEntries();
    }

    return await JournalStorageService.fetchEntries();
  }

  async saveJournalEntry(
    entry: JournalEntry
  ): Promise<Result<JournalEntry, CustomError>> {
    if (this.useRemote) {
      return await journalService.createJournalEntry(entry);
    }

    try {
      const result = await this.fetchJournalEntries();
      if (!result.ok) return result;

      const entries = result.value;
      entries.push(entry);
      await JournalStorageService.saveEntries(entries);
      return new Ok(JournalEntry.fromJSON(entry));
    } catch (err) {
      return new Err(
        new CustomError("Failed to save journal entry", "LOCAL_SAVE_ERROR", err)
      );
    }
  }

  async updateJournalEntry(
    entry: JournalEntry
  ): Promise<Result<JournalEntry, CustomError>> {
    if (this.useRemote) {
      return await journalService.updateJournalEntry(entry.id, entry);
    }

    try {
      const result = await this.fetchJournalEntries();
      if (!result.ok) return result;

      const updatedEntries = result.value.map((e) =>
        e.id === entry.id ? entry : e
      );
      await JournalStorageService.updateEntries(updatedEntries);
      return new Ok(JournalEntry.fromJSON(entry));
    } catch (err) {
      return new Err(
        new CustomError(
          "Failed to update journal entry",
          "LOCAL_UPDATE_ERROR",
          err
        )
      );
    }
  }

  async deleteJournalEntry(id: string): Promise<Result<null, CustomError>> {
    if (this.useRemote) {
      return await journalService.deleteJournalEntry(id);
    }

    try {
      const result = await this.fetchJournalEntries();
      if (!result.ok) return result as Err<CustomError>;

      const filtered = result.value.filter((e) => e.id !== id);
      return await JournalStorageService.removeEntries(filtered);
    } catch (err) {
      return new Err(
        new CustomError(
          "Failed to delete journal entry",
          "LOCAL_DELETE_ERROR",
          err
        )
      );
    }
  }

  async fetchJournalEntry(
    id: string
  ): Promise<Result<JournalEntry, CustomError>> {
    if (this.useRemote) {
      return await journalService.fetchJournalEntry(id);
    }

    try {
      const result = await this.fetchJournalEntries();
      if (!result.ok) return result;

      const entry = result.value.find((e) => e.id === id);
      if (!entry) {
        return new Err(new CustomError("Entry not found", "NOT_FOUND"));
      }

      return new Ok(entry);
    } catch (err) {
      return new Err(
        new CustomError(
          "Failed to fetch journal entry",
          "LOCAL_FETCH_ERROR",
          err
        )
      );
    }
  }
}

export default new JournalRepository(false);
