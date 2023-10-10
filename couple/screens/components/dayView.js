import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DayView = ({ route }) => {
  const { selectedDate } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
      {/* Add additional Day View UI here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 24,
  },
});

export default DayView;
