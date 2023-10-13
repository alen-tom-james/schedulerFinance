import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import CalendarComponent from './components/calendar.js';  // Ensure path is correct
import DayView from './components/dayView.js'  // Ensure path is correct
import WeekView from './components/weekView.js'  // Ensure path is correct

const CustomCalendar = () => {
  const swiperRef = React.createRef();

  const goToDayView = () => {
    swiperRef.current.scrollBy(-1, true); // Scroll to the Day View
  };

  return (
    <Swiper 
      ref={swiperRef}
      style={styles.wrapper} 
      horizontal={false} 
      index={0} 
      showsPagination={false}
    >
      <View style={[styles.slide, styles.slideMonth]}>
        <CalendarComponent goToDayView={goToDayView}/>
      </View>
      <View style={[styles.slide, styles.slideWeek]}>
        <WeekView />
      </View>
      <View style={[styles.slide, styles.slideDay]}>
        <DayView />
      </View>
    </Swiper>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    height: 700,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 0,
    bottom: 20,
    marginTop: 0,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOpacity: .9,
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
});

export default CustomCalendar;