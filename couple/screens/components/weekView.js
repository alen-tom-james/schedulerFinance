import React, { useState, useContext, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { DateContext } from '../../App';

const TOTAL_SCREEN_WIDTH = Dimensions.get('window').width;
const TIME_COLUMN_WIDTH = 40;  // Adjusted width for the time column
const WEEK_VIEW_WIDTH = (TOTAL_SCREEN_WIDTH - TIME_COLUMN_WIDTH);

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
  const [initialScrollX, setInitialScrollX] = useState(null);
  const scrollViewRef = useRef(null);
  const verticalScrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    scrollViewRef.current.scrollTo({ x: WEEK_VIEW_WIDTH, animated: false });
  }, [currentWeek]);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const scrollDifference = Math.abs(offsetX - WEEK_VIEW_WIDTH);
  
    const SCROLL_THRESHOLD = 100;
  
    if (scrollDifference < SCROLL_THRESHOLD) {
      // Minor scroll/tap, return to original position without changing the week
      scrollViewRef.current.scrollTo({ x: WEEK_VIEW_WIDTH, animated: true });
      return;
    }
  
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
          <View style={styles.rightShadow}>
          <TouchableOpacity 
            key={index} 
            style={day.getDate() === selectedDate.getDate() && day.getMonth() === selectedDate.getMonth() && day.getFullYear() === selectedDate.getFullYear() ? [styles.dayCell, styles.selectedDayCell] : styles.dayCell} 
            onPress={() => setSelectedDate(day)}
          > 
            <Text style={day.getDate() === selectedDate.getDate() && day.getMonth() === selectedDate.getMonth() && day.getFullYear() === selectedDate.getFullYear() ? styles.selectedDayText : styles.dayText}>
              {day.getDate()}
            </Text>
          </TouchableOpacity>
          </View>

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
          onScrollBeginDrag={e => setInitialScrollX(e.nativeEvent.contentOffset.x)}
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: WEEK_VIEW_WIDTH }}
          style={styles.weekScrollView}
        >
          {[-1, 0, 1].map((weekOffset) => (
            <View style={{ width: WEEK_VIEW_WIDTH }}>
              <ScrollView
                key={weekOffset}
                onScroll={handleVerticalScroll}
                scrollEventThrottle={16}
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
    width: WEEK_VIEW_WIDTH + TIME_COLUMN_WIDTH,
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
    left: 49
  },
  weekContainer: {
    flexDirection: 'row',
    width: WEEK_VIEW_WIDTH,
    position: 'absolute',
    right: 0
  },
  weekScrollView: {
    flex: 1,
    right: 111,
  },
  content: {
    flexDirection: 'row',
    marginLeft: -400,
    left: 150,
    marginRight: 40
  },
  dayCell: {
    width: (WEEK_VIEW_WIDTH / 7) - 2.1,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(75, 156, 211, 0.5)',
    borderRadius: 5,
    margin: 1,
  },

  selectedDayCell: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,  // Vertical shadow
    },
    shadowOpacity: .3,
    shadowRadius: 3.84,
    zIndex: -3
  },

  dayText: {
    fontSize: 16,
    color: 'white',
  },
  selectedDayText: {
    fontSize: 25,
    color: 'blue',
    color: 'navy',
    opacity: '.45',
    fontWeight: 'bold',
  },
  timeColumn: {
    width: TIME_COLUMN_WIDTH,
    marginRight: 5,
    right: 108,
    zIndex: 5,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    top: 50
  },
  timeLabel: {
    height: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    fontSize: 11,
    color: 'white',
    marginLeft: 360,
  },
});

export default WeekView;
