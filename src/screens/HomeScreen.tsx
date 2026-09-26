import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Vibration } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HomeScreen({ navigation }: any) {
  // Placeholder values (replace with real-time sensor data)
  const gasLevel = 150; // Example gas level in ppm
  const isLeakDetected = gasLevel > 200; // Leak detected if gas > 200ppm

  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  // Function to show the time picker
  const openTimePicker = () => {
    setShowPicker(true);
  };

  // Handle time selection
  const onTimeSelected = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setSelectedTime(selectedDate);
      startCountdown(selectedDate);
    }
  };

  // Calculate countdown
  const startCountdown = (selectedDate: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((selectedDate.getTime() - now.getTime()) / 1000);
    
    if (diffInSeconds > 0) {
      setTimeLeft(diffInSeconds);
    } else {
      Alert.alert("Invalid Time", "Please select a future time!");
    }
  };

  // Countdown Effect
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime !== null ? prevTime - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      Alert.alert("⏳ Time's up!", "Gas regulator turned off.");
      setTimeLeft(null); // Stop countdown
    }
  }, [timeLeft]);

  // Vibration Alert on Leak Detection
  useEffect(() => {
    if (isLeakDetected) {
      Vibration.vibrate([500, 500, 500]); // Vibrate pattern
    }
  }, [isLeakDetected]);

  return (
    <View style={styles.container}>
      {/* Gas Level Display */}
      <Text style={styles.title}>Gas Leak Detection System</Text>
      <Text style={styles.gasText}>Gas Level: {gasLevel} ppm</Text>

      {/* Alert Message */}
      {isLeakDetected ? (
        <Text style={styles.alert}>🚨 WARNING! Gas Leak Detected!</Text>
      ) : (
        <Text style={styles.safe}>✅ Gas Levels are Safe</Text>
      )}

      {/* Manual Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Turning ON gas regulator')}>
          <Text style={styles.buttonText}>Turn ON</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.offButton]} onPress={() => Alert.alert('Turning OFF gas regulator')}>
          <Text style={styles.buttonText}>Turn OFF</Text>
        </TouchableOpacity>
      </View>

      {/* Time Picker Button */}
      <TouchableOpacity style={styles.button} onPress={openTimePicker}>
        <Text style={styles.buttonText}>Set Shut-Off Time</Text>
      </TouchableOpacity>

      {/* Display Selected Time */}
      {selectedTime && <Text style={styles.infoText}>Shut-off at: {selectedTime.toLocaleTimeString()}</Text>}

      {/* Display Countdown */}
      {timeLeft !== null && timeLeft > 0 && (
        <Text style={styles.infoText}>Time Left: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s</Text>
      )}

      {/* Time Picker Modal */}
      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={onTimeSelected}
        />
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gasText: {
    fontSize: 18,
    marginBottom: 10,
  },
  alert: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  safe: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  offButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  infoText: {
    fontSize: 18,
    marginTop: 10,
  },
});

