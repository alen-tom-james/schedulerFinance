import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Swiper from 'react-native-swiper';

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <Swiper style={styles.wrapper} horizontal={false} index={0} showsPagination={false}>
      <View style={[styles.slide, styles.slide1]}>
        <Text style={styles.monthHeading}>{months[currentMonth]}</Text>
        <Calendar
          //...your calendar props
          onDayPress={(day) => setSelectedDate(day.dateString)}
          onMonthChange={(month) => {
            setCurrentMonth(month.month - 1);
          }}
        />
      </View>
      <View style={[styles.slide, styles.slide2]}>
        <Text style={styles.text}>Week View</Text>
        {/* Your week view component */}
      </View>
      <View style={[styles.slide, styles.slide3]}>
        <Text style={styles.text}>Day View</Text>
        {/* Your day view component */}
      </View>
    </Swiper>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 50, // You may adjust this value
  },
  slide: {
    height: windowHeight - 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 0,
    marginBottom: 50,
    backgroundColor: 'white', // Ensuring a background color for the shadow to stand out

    // iOS shadow properties
    shadowColor: "#000",
    shadowOpacity: .9,  // Half opaque
    shadowOffset: {
        width: 0,
        height: 2,
    },

  },
  slide1: {
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    backgroundColor: '#97CAE5',
    zIndex: '-1'
  },
  slide3: {
    backgroundColor: '#92BBD9',
  },
  monthHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});


export default CustomCalendar;
