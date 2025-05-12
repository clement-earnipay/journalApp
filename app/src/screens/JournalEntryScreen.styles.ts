import { StyleSheet } from 'react-native';


// Styles file that accepts dynamic theme colors
const journalEntrystyles = {
    container: (backgroundColor: string) =>
      StyleSheet.create({
        container: {
          padding: 16,
          backgroundColor, 
        },
      }).container,
  
      input: {
        borderWidth: 1,
        padding: 8,
        marginBottom: 8,
        borderRadius: 6,
      },
  
      entry: {
        paddingVertical: 4,
        fontSize: 16,
    
      },
  };

export default journalEntrystyles;
