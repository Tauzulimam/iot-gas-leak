import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

export default function SettingScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [gasThreshold, setGasThreshold] = useState(200); // Default threshold
  const [autoShutOff, setAutoShutOff] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={[styles.container, darkMode && styles.darkBackground]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>Settings</Text>

      {/* Notification Toggle */}
      <View style={styles.settingItem}>
        <Text style={[styles.label, darkMode && styles.darkText]}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      {/* Gas Leak Threshold */}
      <View style={styles.settingItem}>
        <Text style={[styles.label, darkMode && styles.darkText]}>
          Gas Leak Alert Threshold: {gasThreshold} ppm
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={100}
          maximumValue={500}
          step={10}
          value={gasThreshold}
          onValueChange={setGasThreshold}
        />
      </View>

      {/* Auto Shut-Off Toggle */}
      <View style={styles.settingItem}>
        <Text style={[styles.label, darkMode && styles.darkText]}>Auto Shut-Off</Text>
        <Switch
          value={autoShutOff}
          onValueChange={setAutoShutOff}
        />
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.settingItem}>
        <Text style={[styles.label, darkMode && styles.darkText]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
        />
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  darkBackground: {
    backgroundColor: '#1c1c1c',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
  slider: {
    width: 200,
    height: 40,
  },
});
