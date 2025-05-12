import React, { useEffect, useState } from "react";
import { Button, FlatList, ListRenderItem, TextInput } from "react-native";

import { ThemedText, ThemedView } from "../components/components";
import JournalRepository from "../repositories/journalRepo";
import { AppColors } from "../theme/Colors";
import { AppTextStyles, useThemeColor } from "../theme/useAppTheme";
import journalEntrystyles from "./JournalEntryScreen.styles";

type JournalEntry = {
  date: string | Date;
  text: string;
};

const JournalEntryScreen: React.FC = () => {
  const backgroundColor = useThemeColor(
    AppColors.dark.background,
    AppColors.light.background
  );
  const textColor = useThemeColor(AppColors.light.text, AppColors.dark.text);

  const [entry, setEntry] = useState<string>("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const loadEntries = async () => {
      const journalEntries = await JournalRepository.fetchJournalEntries();
      setEntries(journalEntries);
    };
    loadEntries();
  }, []);

  const handleSave = async () => {
    const newEntry: JournalEntry = { date: new Date(), text: entry };
    await JournalRepository.saveJournalEntry(newEntry);
    setEntry("");
    const updatedEntries = await JournalRepository.fetchJournalEntries();
    setEntries(updatedEntries);
  };

  const renderItem: ListRenderItem<JournalEntry> = ({ item }) => (
    <ThemedText
      baseStyle={AppTextStyles.font16Weight600}
      darkColor={AppColors.white}
      lightColor={AppColors.black}
      style={[journalEntrystyles.entry]}
    >
      {item.text}
    </ThemedText>
  );

  return (
    <ThemedView
      lightColor={AppColors.light.background}
      darkColor={AppColors.dark.background}
      style={journalEntrystyles.container(backgroundColor)}
    >
      <TextInput
        value={entry}
        onChangeText={setEntry}
        placeholder="Write your journal entry"
        style={[
          journalEntrystyles.input,
          { color: textColor, backgroundColor: backgroundColor },
        ]}
      />
      <Button title="Save" onPress={handleSave} />
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </ThemedView>
  );
};

export default JournalEntryScreen;
