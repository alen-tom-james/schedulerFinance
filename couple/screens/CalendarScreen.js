import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Swiper from 'react-native-swiper';
import CalendarComponent from './components/calendar.js';

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <Swiper style={styles.wrapper} horizontal={false} index={0} showsPagination={false}>
      <View style={[styles.slide, styles.slideMonth]}>
        <CalendarComponent/>
      </View>
      <View style={[styles.slide, styles.slideWeek]}>
        <Text style={styles.text}>Week View</Text>
        {/* Your week view component */}
      </View>
      <View style={[styles.slide, styles.slideDay]}>
        <Text style={styles.text}>Day View</Text>
        {/* Your day view component */}
      </View>
    </Swiper>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    height: 700,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 0,
    bottom: 20,
    marginTop: 0,
    backgroundColor: 'white', // Ensuring a background color for the shadow to stand out

    // iOS shadow properties
    shadowColor: "#000",
    shadowOpacity: .9,  // Half opaque
    shadowOffset: {
        width: 0,
        height: 2,
    },

  },
  slideMonth: {
    backgroundColor: '#9DD6EB',
    height: 900,
    marginTop: 110,
  },
  slideWeek: {
    backgroundColor: '#97CAE5',
    marginTop: 110,
    height: 900,


  },
  slideDay: {
    backgroundColor: '#92BBD9',
    height: 1000,
    marginTop: 110,

  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  Calendar: {
    top: 500,
    color: "#000"

}
});


export default CustomCalendar;