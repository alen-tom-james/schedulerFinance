import React, { useState, useContext, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { DateContext } from '../../App';  

const TOTAL_SCREEN_WIDTH = Dimensions.get('window').width;
const TIME_COLUMN_WIDTH = 40;  // Adjusted width for the time column
const screenW = TOTAL_SCREEN_WIDTH - TIME_COLUMN_WIDTH;
const WEEK_VIEW_WIDTH = (TOTAL_SCREEN_WIDTH - TIME_COLUMN_WIDTH) ;// Adjusted to take up the rest of the screen

const WeekView = () => {
  const { selectedDate, setSelectedDate } = useContext(DateContext);

  const getWeek = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return { start, end };
  };

  const [currentWeek, setCurrentWeek] = useState(getWeek(selectedDate));
  const scrollViewRef = useRef(null);
  const verticalScrollRef = useRef(null);

  useEffect(() => {
    scrollViewRef.current.scrollTo({ x: WEEK_VIEW_WIDTH, animated: false });
  }, [currentWeek]);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    if (offsetX > WEEK_VIEW_WIDTH) {
      setCurrentWeek(prevWeek => getWeek(new Date(prevWeek.start.setDate(prevWeek.start.getDate() + 7))));
    } else if (offsetX < WEEK_VIEW_WIDTH) {
      setCurrentWeek(prevWeek => getWeek(new Date(prevWeek.start.setDate(prevWeek.start.getDate() - 7))));
    }
  };

  const handleVerticalScroll = (event) => {
    verticalScrollRef.current.scrollTo({
      y: event.nativeEvent.contentOffset.y,
      animated: false,
    });
  };

  const renderWeek = (weekOffset) => {
    const startDate = new Date(currentWeek.start);
    startDate.setDate(startDate.getDate() + (7 * weekOffset));
    const weekDays = Array.from({ length: 7 }, (_, i) => new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i));

    return (
      <View style={styles.weekContainer} key={weekOffset}>
        {weekDays.map((day, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.dayCell} 
            onPress={() => setSelectedDate(day)}
          >
            <Text style={day.getDate() === selectedDate.getDate() && day.getMonth() === selectedDate.getMonth() && day.getFullYear() === selectedDate.getFullYear() ? styles.selectedDayText : styles.dayText}>
              {day.getDate()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTimeColumn = () => {
    return (
      <ScrollView 
        ref={verticalScrollRef}
        style={styles.timeColumn}
        scrollEventThrottle={16}
        onScroll={handleVerticalScroll}
      >
        {Array.from({ length: 24 }, (_, i) => (
          <Text key={i} style={styles.timeLabel}>{`${i}:00`}</Text>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <Text key={index} style={styles.dayHeader}>{day}</Text>
        ))}
      </View>
      <View style={styles.content}>
        {renderTimeColumn()}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={handleScroll}
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: WEEK_VIEW_WIDTH }}
          style={styles.weekScrollView}
        >
          {[-1, 0, 1].map((weekOffset) => (
            <View style={{ width: WEEK_VIEW_WIDTH}}>
              <ScrollView
                key={weekOffset}
                onScroll={handleVerticalScroll}
                scrollEventThrottle={16}
                style={styles.weekY}
              >
                {renderWeek(weekOffset)}
              </ScrollView>
              
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    width: WEEK_VIEW_WIDTH + TIME_COLUMN_WIDTH,  // Adjusted here
    marginBottom: 5,
    backgroundColor: '#4b9cd3',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: 10,
  },
  dayHeader: {
    width: WEEK_VIEW_WIDTH / 7,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  weekContainer: {
    flexDirection: 'row',
    width: WEEK_VIEW_WIDTH,  // Make sure the weekContainer is also taking the full width
    position:'absolute',

  },
  dayCell: {
    width: WEEK_VIEW_WIDTH / 7,  // Adjusted here
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(75, 156, 211, 0.2)',
    borderRadius: 5,
    margin: 1,
  },
  dayText: {
    fontSize: 16,
    color: 'white',
  },
  selectedDayText: {
    fontSize: 18,
    color: 'blue',
  },
  content: {
    flexDirection: 'row',
    marginLeft: -300,
    left: 150
  },
  timeColumn: {
    width: TIME_COLUMN_WIDTH,
    marginRight: 5,
    right: 170,
    zIndex: 5,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  timeLabel: {
    height: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    fontSize: 12,
    color: 'white', 
    marginLeft: 320,
    
  },
  weekScrollView: {
    flex: 1,
    width: WEEK_VIEW_WIDTH,
    right: 150,
  },
});


export default WeekView;
