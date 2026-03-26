import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PINK = '#E91E8C';
const LIGHT_PINK = '#FFF0F5';
const BLUE = '#1976D2';
const LIGHT_BLUE = '#E3F2FD';
const PURPLE = '#7B1FA2';
const LIGHT_PURPLE = '#F3E5F5';
const GREEN = '#388E3C';
const LIGHT_GREEN = '#E8F5E9';

const FEEDING_TYPES = [
  { id: 'breast_left', label: 'Borst Links', emoji: '🤱', color: PINK },
  { id: 'breast_right', label: 'Borst Rechts', emoji: '🤱', color: PURPLE },
  { id: 'bottle', label: 'Fles', emoji: '🍼', color: BLUE },
  { id: 'solid', label: 'Bijvoeding', emoji: '🥣', color: GREEN },
];

function formatTime(date) {
  return new Date(date).toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('nl-BE', { weekday: 'short', day: 'numeric', month: 'short' });
}

function timeSince(timestamp) {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) return `${hours}u ${minutes % 60}m geleden`;
  return `${minutes}m geleden`;
}

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const STORAGE_KEY = '@feeding_logs';
const INTERVAL_KEY = '@feeding_interval';

export default function FeedingTrackerScreen() {
  const [feedings, setFeedings] = useState([]);
  const [selectedType, setSelectedType] = useState('breast_left');
  const [isFeeding, setIsFeeding] = useState(false);
  const [feedingStart, setFeedingStart] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [feedingInterval, setFeedingInterval] = useState(180); // minutes, default 3h
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (isFeeding) {
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - feedingStart);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isFeeding, feedingStart]);

  async function loadData() {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setFeedings(JSON.parse(stored));
      const interval = await AsyncStorage.getItem(INTERVAL_KEY);
      if (interval) setFeedingInterval(parseInt(interval));
    } catch (e) {
      console.error(e);
    }
  }

  async function saveFeedings(updated) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  }

  function startFeeding() {
    const now = Date.now();
    setFeedingStart(now);
    setElapsed(0);
    setIsFeeding(true);
  }

  function stopFeeding() {
    if (!isFeeding) return;
    const now = Date.now();
    const duration = now - feedingStart;
    const newFeeding = {
      id: feedingStart,
      type: selectedType,
      startTime: feedingStart,
      endTime: now,
      duration,
    };
    const updated = [newFeeding, ...feedings];
    setFeedings(updated);
    saveFeedings(updated);
    setIsFeeding(false);
    setElapsed(0);
  }

  function logQuick() {
    const now = Date.now();
    const newFeeding = {
      id: now,
      type: selectedType,
      startTime: now,
      endTime: now,
      duration: 0,
    };
    const updated = [newFeeding, ...feedings];
    setFeedings(updated);
    saveFeedings(updated);
  }

  function deleteFeeding(id) {
    Alert.alert('Verwijderen', 'Wil je deze voeding verwijderen?', [
      { text: 'Annuleer', style: 'cancel' },
      {
        text: 'Verwijder', style: 'destructive',
        onPress: () => {
          const updated = feedings.filter((f) => f.id !== id);
          setFeedings(updated);
          saveFeedings(updated);
        },
      },
    ]);
  }

  // Calculate next feeding time
  const lastFeeding = feedings[0];
  const nextFeedingTime = lastFeeding
    ? new Date(lastFeeding.endTime + feedingInterval * 60 * 1000)
    : null;
  const isOverdue = nextFeedingTime && nextFeedingTime < new Date();
  const minutesUntilNext = nextFeedingTime
    ? Math.round((nextFeedingTime - Date.now()) / 60000)
    : null;

  // Today's summary
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayFeedings = feedings.filter((f) => f.startTime >= todayStart.getTime());

  const typeInfo = FEEDING_TYPES.find((t) => t.id === selectedType);

  // Group feedings by day
  const grouped = feedings.reduce((acc, f) => {
    const key = formatDate(f.startTime);
    if (!acc[key]) acc[key] = [];
    acc[key].push(f);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Voeding bijhouden</Text>
        <Text style={styles.headerSubtitle}>
          {todayFeedings.length} voeding{todayFeedings.length !== 1 ? 'en' : ''} vandaag
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Next feeding reminder */}
        {nextFeedingTime && (
          <View style={[styles.reminderCard, isOverdue ? styles.reminderOverdue : styles.reminderOk]}>
            <Text style={styles.reminderEmoji}>{isOverdue ? '⏰' : '🍼'}</Text>
            <View style={styles.reminderInfo}>
              <Text style={styles.reminderTitle}>
                {isOverdue ? 'Tijd voor voeding!' : 'Volgende voeding'}
              </Text>
              <Text style={styles.reminderTime}>
                {isOverdue
                  ? `Al ${Math.abs(minutesUntilNext)} min te laat`
                  : minutesUntilNext <= 0
                  ? 'Nu!'
                  : `Over ${minutesUntilNext} min (${formatTime(nextFeedingTime)})`}
              </Text>
            </View>
          </View>
        )}

        {/* Active feeding timer */}
        {isFeeding && (
          <View style={styles.activeCard}>
            <Text style={styles.activeTitle}>Voeding bezig...</Text>
            <Text style={styles.activeEmoji}>{typeInfo.emoji}</Text>
            <Text style={styles.activeTimer}>{formatDuration(elapsed)}</Text>
            <Text style={styles.activeType}>{typeInfo.label}</Text>
          </View>
        )}

        {/* Feeding type selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type voeding</Text>
          <View style={styles.typeGrid}>
            {FEEDING_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  selectedType === type.id && { borderColor: type.color, borderWidth: 2.5 },
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <Text style={styles.typeEmoji}>{type.emoji}</Text>
                <Text style={[styles.typeLabel, selectedType === type.id && { color: type.color }]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          {!isFeeding ? (
            <>
              <TouchableOpacity style={[styles.actionBtn, styles.actionBtnPrimary]} onPress={startFeeding}>
                <Text style={styles.actionBtnText}>▶ Start timer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.actionBtnSecondary]} onPress={logQuick}>
                <Text style={[styles.actionBtnText, { color: PINK }]}>+ Snel loggen</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={[styles.actionBtn, styles.actionBtnStop]} onPress={stopFeeding}>
              <Text style={styles.actionBtnText}>⏹ Stop voeding</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Interval setting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Herinnering interval</Text>
          <View style={styles.intervalRow}>
            {[90, 120, 150, 180, 210, 240].map((min) => (
              <TouchableOpacity
                key={min}
                style={[styles.intervalChip, feedingInterval === min && styles.intervalChipSelected]}
                onPress={() => {
                  setFeedingInterval(min);
                  AsyncStorage.setItem(INTERVAL_KEY, min.toString());
                }}
              >
                <Text style={[styles.intervalChipText, feedingInterval === min && styles.intervalChipTextSelected]}>
                  {min < 60 ? `${min}m` : `${min / 60}u`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Today's summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vandaag — {todayFeedings.length} voedingen</Text>
          <View style={styles.summaryGrid}>
            {FEEDING_TYPES.map((type) => {
              const count = todayFeedings.filter((f) => f.type === type.id).length;
              return (
                <View key={type.id} style={styles.summaryItem}>
                  <Text style={styles.summaryEmoji}>{type.emoji}</Text>
                  <Text style={[styles.summaryCount, { color: type.color }]}>{count}x</Text>
                  <Text style={styles.summaryLabel}>{type.label.split(' ')[0]}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* History */}
        {Object.keys(grouped).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Geschiedenis</Text>
            {Object.entries(grouped).map(([day, items]) => (
              <View key={day}>
                <Text style={styles.dayHeader}>{day} — {items.length} voeding{items.length !== 1 ? 'en' : ''}</Text>
                {items.map((feeding) => {
                  const type = FEEDING_TYPES.find((t) => t.id === feeding.type);
                  return (
                    <TouchableOpacity
                      key={feeding.id}
                      style={styles.feedingRow}
                      onLongPress={() => deleteFeeding(feeding.id)}
                    >
                      <View style={[styles.feedingIcon, { backgroundColor: type.color + '22' }]}>
                        <Text style={styles.feedingEmoji}>{type.emoji}</Text>
                      </View>
                      <View style={styles.feedingInfo}>
                        <Text style={styles.feedingType}>{type.label}</Text>
                        <Text style={styles.feedingTime}>
                          {formatTime(feeding.startTime)}
                          {feeding.duration > 0 ? ` • ${formatDuration(feeding.duration)}` : ''}
                          {' • '}{timeSince(feeding.startTime)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        )}

        {feedings.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🍼</Text>
            <Text style={styles.emptyTitle}>Nog geen voedingen gelogd</Text>
            <Text style={styles.emptyText}>
              Selecteer het type voeding en druk op "Start timer" of "Snel loggen".{'\n\n'}
              Hou lang ingedrukt op een voeding om hem te verwijderen.
            </Text>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LIGHT_PINK },
  header: {
    backgroundColor: PINK,
    paddingTop: Platform.OS === 'ios' ? 0 : 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 4 },
  headerSubtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 14 },
  reminderCard: {
    marginHorizontal: 16, marginTop: 16, borderRadius: 14, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  reminderOk: { backgroundColor: LIGHT_GREEN, borderLeftWidth: 4, borderLeftColor: GREEN },
  reminderOverdue: { backgroundColor: '#FFEBEE', borderLeftWidth: 4, borderLeftColor: '#E53935' },
  reminderEmoji: { fontSize: 32 },
  reminderInfo: { flex: 1 },
  reminderTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  reminderTime: { fontSize: 14, color: '#555', marginTop: 2 },
  activeCard: {
    marginHorizontal: 16, marginTop: 12, backgroundColor: '#fff', borderRadius: 16,
    padding: 20, alignItems: 'center', borderWidth: 2, borderColor: PINK,
    elevation: 4, shadowColor: PINK, shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
  },
  activeTitle: { fontSize: 14, color: '#999', fontWeight: '600', marginBottom: 8 },
  activeEmoji: { fontSize: 40, marginBottom: 4 },
  activeTimer: { fontSize: 44, fontWeight: '800', color: PINK, fontVariant: ['tabular-nums'] },
  activeType: { fontSize: 14, color: '#666', marginTop: 4 },
  section: {
    marginHorizontal: 16, marginTop: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 12 },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  typeCard: {
    flex: 1, minWidth: '44%', backgroundColor: '#FAFAFA', borderRadius: 12,
    padding: 14, alignItems: 'center', borderWidth: 1.5, borderColor: '#eee',
  },
  typeEmoji: { fontSize: 28, marginBottom: 6 },
  typeLabel: { fontSize: 13, fontWeight: '600', color: '#555', textAlign: 'center' },
  actionRow: { flexDirection: 'row', marginHorizontal: 16, marginTop: 12, gap: 10 },
  actionBtn: {
    flex: 1, paddingVertical: 16, borderRadius: 14, alignItems: 'center',
    elevation: 3, shadowOpacity: 0.15, shadowRadius: 6, shadowOffset: { width: 0, height: 3 },
  },
  actionBtnPrimary: { backgroundColor: PINK, shadowColor: PINK },
  actionBtnSecondary: { backgroundColor: '#fff', shadowColor: '#000', borderWidth: 2, borderColor: PINK },
  actionBtnStop: { backgroundColor: '#E53935', shadowColor: '#E53935' },
  actionBtnText: { fontSize: 17, fontWeight: '700', color: '#fff' },
  intervalRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  intervalChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#F5F5F5', borderWidth: 1.5, borderColor: '#eee',
  },
  intervalChipSelected: { backgroundColor: PINK, borderColor: PINK },
  intervalChipText: { fontSize: 14, fontWeight: '600', color: '#666' },
  intervalChipTextSelected: { color: '#fff' },
  summaryGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  summaryItem: { alignItems: 'center' },
  summaryEmoji: { fontSize: 28, marginBottom: 4 },
  summaryCount: { fontSize: 20, fontWeight: '800' },
  summaryLabel: { fontSize: 11, color: '#999', marginTop: 2 },
  dayHeader: { fontSize: 13, fontWeight: '700', color: '#999', marginBottom: 8, marginTop: 4, textTransform: 'uppercase' },
  feedingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },
  feedingIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  feedingEmoji: { fontSize: 22 },
  feedingInfo: { flex: 1 },
  feedingType: { fontSize: 15, fontWeight: '600', color: '#333' },
  feedingTime: { fontSize: 13, color: '#888', marginTop: 2 },
  emptyState: { alignItems: 'center', paddingHorizontal: 32, paddingVertical: 24 },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#333', marginBottom: 12 },
  emptyText: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 22 },
});
