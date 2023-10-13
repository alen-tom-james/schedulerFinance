import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DateContext } from '../../App';  // Ensure the path is correct

const DayView = () => {
  const { selectedDate } = useContext(DateContext);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const day = selectedDate.getDate();
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();

  return (
    <View style={styles.container}>
      <Text style={styles.monthHeading}>{months[month]} <Text style={styles.dayText}>{day}</Text></Text>

      <Text style={styles.yearHeading}>{year}</Text>
      {/* Add additional components or logic here to display more details about the selected day */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthHeading: {
    fontSize: 65,
    fontWeight: 'bold',
    fontFamily: 'Impact',
    textAlign: 'center',
    opacity: .35,
    bottom: 420
  },
  dayText: {
    fontSize: 80,
    fontWeight: 'bold',
    fontFamily: 'Impact',
    textAlign: 'center',
    opacity: 1, 
  },
  yearHeading: {
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'Impact',
    textAlign: 'center',
    opacity: .35,
    bottom: 430,
  },
});

export default DayView;
