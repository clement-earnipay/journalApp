const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");

class AsyncStorageService {
   async saveData(key, value) {
   try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
   } catch (err) {
    console.error("Error saving data", err);
   }
}
    async getData(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            return value != null ? JSON.parse(value) : null;
        } catch (err) {
            console.error("Error getting data", err);
        }
    }

    async updateData(key, value) {
        try {
            const existingData = await this.getData(key);
            if (existingData) {
                const updatedData = { ...existingData, ...value };
                await this.saveData(key, updatedData);
            } else {
                console.error("No existing data found for the key");
            }
        } catch (err) {
            console.error("Error updating data", err);
        }
    }
    
    async removeData(key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (err) {
            console.error("Error removing data", err);
        }
    }
    async clearAll() {
        try {
            await AsyncStorage.clear();
        } catch (err) {
            console.error("Error clearing data", err);
        }
    }
}

export default new AsyncStorageService();