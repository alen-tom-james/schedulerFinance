import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PanGestureHandler } from 'react-native-gesture-handler';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeMonth = (offset) => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + offset)));
  };

  const renderCalendar = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const daysArray = [];
    for (let i = 1; i <= (firstDay + daysInMonth); i++) {
      daysArray.push(i - firstDay);
    }

    const weeksArray = [];
    while(daysArray.length) weeksArray.push(daysArray.splice(0,7));

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <View style={styles.calendar} key={date.getMonth()}>
        <Text style={styles.monthHeading}>{months[date.getMonth()]} </Text>
        <Text style={styles.yearHeading}>{date.getFullYear()}</Text>
        <View style={styles.headerRow}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, index) => (
            <Text key={index} style={styles.dayHeading}>{d}</Text>
          ))}
        </View>
        {weeksArray.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekRow}>
            {week.map((day, dayIndex) => (
              <TouchableOpacity 
                key={dayIndex} 
                style={styles.dayCell} 
                onPress={() => { if(day > 0) setSelectedDate(new Date(date.getFullYear(), date.getMonth(), day))}}
              >
                <Text style={styles.dayText}>{day > 0 ? day : ''}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        horizontal
        decelerationRate="slow"
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const offsetX = e.nativeEvent.contentOffset.x;
          const direction = (offsetX > (selectedDate.getMonth() * styles.calendar.width)) ? 1 : -1;
          changeMonth(direction);
        }}
        contentOffset={{ x: selectedDate.getMonth() * styles.calendar.width, y: 0 }}
      >
        {[...Array(12)].map((_, idx) => renderCalendar(new Date(selectedDate.getFullYear(), idx, 1)))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  calendar: {
    width: 385, // Adjust width to fit your device's screen
    padding: 15,
    top: 40,
  },
  monthHeading: {
    fontSize: 75,
    fontWeight: 'bold',
    fontFamily: 'Impact',
    textAlign: 'center',
    marginVertical: 8,
    opacity: .35,
    top: -40
  },
  yearHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Impact',
    textAlign: 'center',
    marginVertical: -20,
    opacity: .35,
    top: -40
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 5,
    backgroundColor: '#4b9cd3',
    marginRight: -12
  },
  dayHeading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    padding: 10,
    width: `${100/6.95}%`,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  dayCell: {
    width: `${100/7}%`,
    paddingTop: 40, 
    paddingBottom: 40, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(75, 156, 211, 0.2)',
    borderRadius: 5,
    margin: 1,
    marginBottom: 5,
  },
  dayText: {
    fontSize: 11,
    position: 'absolute',
    color: '#ffffff',
    fontStyle: 'bold',
    bottom: 60,
    left: 33
  },
});

export default CalendarComponent;
