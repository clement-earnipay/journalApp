import { default as AsyncStorage } from "@react-native-async-storage/async-storage";

class AsyncStorageService {
  static async saveData<T>(key: string, value: T): Promise<void> {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  }

  static async getData<T>(key: string): Promise<T | null> {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? (JSON.parse(jsonValue) as T) : null;
  }

  static async updateData<T extends object>(
    key: string,
    value: Partial<T>
  ): Promise<void> {
    try {
      const existingData = await this.getData<T>(key);

      if (existingData) {
        const updatedData = { ...existingData, ...value };
        await this.saveData<T>(key, updatedData);
      } else {
        console.error(`No existing data found for key "${key}"`);
      }
    } catch (err) {
      console.error(`Error updating data for key "${key}":`, err);
    }
  }

  static async removeData<T>(key: string, value: T): Promise<void> {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.removeItem(key);
  }

  static async clearData(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      console.error("Error clearing data", err);
    }
  }
}

export default AsyncStorageService;
