import { isTruthy } from "../constants/isTruthy";

export interface JournalEntryJSON {
  id: string;
  date: Date;
  text: string;
}

export class JournalEntry {
  id: string;
  date: Date;
  text: string;

  constructor(id: string, date: Date, text: string) {
    this.id = id;
    this.date = date;
    this.text = text;
  }

  static fromJSON(json: JournalEntryJSON): JournalEntry {
    return new JournalEntry(json.id, new Date(json.date), json.text);
  }

  static fromJSONList(jsonList: JournalEntryJSON[]): JournalEntry[] {
    if (isTruthy(jsonList)) {
      return [];
    }
    return jsonList.map((json) => JournalEntry.fromJSON(json));
  }

  toJSON(): JournalEntryJSON {
    return {
      id: this.id,
      date: this.date,
      text: this.text,
    };
  }
}
