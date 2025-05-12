import AsyncStorageService from "../data/AsyncStorageService";
import journalService from "./journalService";


class JournalRepository {
    constructor(useRemote = false) {
        this.useRemote = useRemote;
    }

    async fetchJournalEntries() {
        if (this.useRemote) {
            return await journalService.fetchJournalEntries();
        } else {
            return await AsyncStorageService.getData('journalEntries');
        }
    }

    async saveJournalEntry(entry) {
        if (this.useRemote) {
            return await journalService.createJournalEntry(entry);
        } else {
          let entries = await AsyncStorageService.getData('journalEntries');
          if (!entries) entries = [];
          entries.push(entry);
          return await AsyncStorageService.saveData('journalEntries', entries);
        }
      }

    async updateJournalEntry(id, entry) {
        if (this.useRemote) {
            return await journalService.updateJournalEntry(id, entry);
        } else {
            let entries = await AsyncStorageService.getData('journalEntries');
            if (entries) {
                entries = entries.map(e => e.id === id ? entry : e);
                return await AsyncStorageService.updateData('journalEntries', entries);
            }
        }

    }

        async deleteJournalEntry(id) {
            if (this.useRemote) {
                return await journalService.deleteJournalEntry(id);
            } else {
                let entries = await AsyncStorageService.getData('journalEntries');
                if (entries) {
                    entries = entries.filter(e => e.id !== id);
                    return await AsyncStorageService.removeData('journalEntries', entries);
                }
            }
        }

        async fetchJournalEntry(id) {
            if (this.useRemote) {
                return await journalService.fetchJournalEntry(id);
            } else {
                let entries = await AsyncStorageService.getData('journalEntries');
                if (entries) {
                    return entries.find(e => e.id === id);
                }
            }
        }


    
}

export default new JournalRepository(false);