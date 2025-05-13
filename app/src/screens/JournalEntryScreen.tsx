import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, TextInput } from "react-native";

import { ThemedButton, ThemedText, ThemedView } from "../components/components";
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
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadEntries = async () => {
      const journalEntries = await JournalRepository.fetchJournalEntries();
      setEntries(journalEntries);
    };
    loadEntries();
  }, []);

  const isEntryValid = entry.trim().length >= 3;

  const handleSave = async () => {
    if (!isEntryValid) {
      //I love this, native dialog
      // Alert.alert(
      //   "Validation Error",
      //   "Entry must be at least 3 characters long."
      // );

      setError("Entry must be at least 3 characters long.");
      return;
    }
    // Clear previous error
    setError("");
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
        onChangeText={(text) => {
          setEntry(text);
          if (error && isEntryValid) setError("");
        }}
        placeholder="Write your journal entry"
        style={[
          journalEntrystyles.input,
          { color: textColor, backgroundColor: backgroundColor },
        ]}
      />
      {error ? (
        <ThemedText
          baseStyle={AppTextStyles.font10Weight500}
          style={journalEntrystyles.errorText}
        >
          {error}
        </ThemedText>
      ) : null}
      <ThemedButton
        title="Save"
        onPress={handleSave}
        disabled={!isEntryValid}
      />
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </ThemedView>
  );
};

export default JournalEntryScreen;
