const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");

class AsyncStorageService {
   async saveDate(key, value) {
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
    
    async removeDate(key) {
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