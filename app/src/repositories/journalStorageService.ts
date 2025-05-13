import AsyncStorageService from "../data/AsyncStorageService";
import { Err, Ok, Result } from "../handlers/result_type";
import { CustomError } from "../models/error";
import { JournalEntry } from "../models/journal";

class JournalStorageService {
  static async fetchEntries(): Promise<Result<JournalEntry[], CustomError>> {
    try {
      const entries = await AsyncStorageService.getData<JournalEntry[]>(
        "journalEntries"
      );
      return new Ok(entries ?? []);
    } catch (err) {
      return new Err(
        new CustomError(
          "Failed to load journal entries",
          "LOCAL_FETCH_ERROR",
          err
        )
      );
    }
  }

  static async saveEntries(
    entries: JournalEntry[]
  ): Promise<Result<null, CustomError>> {
    try {
      await AsyncStorageService.saveData("journalEntries", entries);
      return new Ok(null);
    } catch (err) {
      return new Err(
        new CustomError(
          "Failed to save journal entries",
          "LOCAL_SAVE_ERROR",
          err
        )
      );
    }
  }

  static async updateEntries(
    entries: JournalEntry[]
  ): Promise<Result<null, CustomError>> {
    try {
      await AsyncStorageService.updateData("journalEntries", entries);
      return new Ok(null);
    } catch (err) {
      return new Err(
        new CustomError(
          "Failed to update journal entries",
          "LOCAL_UPDATE_ERROR",
          err
        )
      );
    }
  }

  static async removeEntries(
    entries: JournalEntry[]
  ): Promise<Result<null, CustomError>> {
    try {
      await AsyncStorageService.removeData("journalEntries", entries);
      return new Ok(null);
    } catch (err) {
      return new Err(
        new CustomError(
          "Failed to remove journal entries",
          "LOCAL_REMOVE_ERROR",
          err
        )
      );
    }
  }
}

export default JournalStorageService;
