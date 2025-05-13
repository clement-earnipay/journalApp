import { isTruthy } from "../constants/isTruthy";

export interface JournalEntryJSON {
  date: Date;
  text: string;
}

export class JournalEntry {
  date: Date;
  text: string;

  constructor(date: Date, text: string) {
    this.date = date;
    this.text = text;
  }

  static fromJSON(json: JournalEntryJSON): JournalEntry {
    return new JournalEntry(new Date(json.date), json.text);
  }

  static fromJSONList(jsonList: JournalEntryJSON[]): JournalEntry[] {
    if (isTruthy(jsonList)) {
      return [];
    }
    return jsonList.map((json) => JournalEntry.fromJSON(json));
  }

  toJSON(): JournalEntryJSON {
    return {
      date: this.date,
      text: this.text,
    };
  }
}
