import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

const PINK = '#E91E8C';
const LIGHT_PINK = '#FFF0F5';
const RED = '#E53935';
const GREEN = '#43A047';

function formatDuration(ms) {
  if (ms < 0) return '0:00';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatTime(date) {
  return date.toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function getAdvice(contractions) {
  if (contractions.length < 3) return null;

  const recent = contractions.slice(-3);
  const durations = recent.map((c) => c.duration);
  const intervals = recent.slice(1).map((c, i) => c.startTime - recent[i].startTime);

  const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
  const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

  const durationMin = avgDuration / 1000 / 60;
  const intervalMin = avgInterval / 1000 / 60;

  if (intervalMin <= 5 && durationMin >= 1) {
    return { level: 'urgent', text: '🚨 Bel de verloskundige nu! Weeën zijn elke 5 min of minder, langer dan 1 minuut.' };
  } else if (intervalMin <= 10 && durationMin >= 0.75) {
    return { level: 'warning', text: '⚠️ Neem contact op met de verloskundige. Weeën worden regelmatiger.' };
  } else if (intervalMin <= 15) {
    return { level: 'info', text: 'ℹ️ Weeën worden regelmatiger. Blijf bijhouden en rust.' };
  }
  return { level: 'normal', text: '✅ Weeën zijn nog niet regelmatig. Blijf bijhouden en rust.' };
}

export default function ContractionTimerScreen() {
  const [isActive, setIsActive] = useState(false);
  const [currentStart, setCurrentStart] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [contractions, setContractions] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - currentStart);
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, currentStart]);

  function startContraction() {
    const now = Date.now();
    setCurrentStart(now);
    setElapsed(0);
    setIsActive(true);
  }

  function stopContraction() {
    if (!isActive) return;
    const now = Date.now();
    const duration = now - currentStart;
    const newContraction = {
      id: now,
      startTime: currentStart,
      endTime: now,
      duration,
    };
    setContractions((prev) => [newContraction, ...prev]);
    setIsActive(false);
    setElapsed(0);
  }

  function handleMainButton() {
    if (isActive) {
      stopContraction();
    } else {
      startContraction();
    }
  }

  function deleteContraction(id) {
    Alert.alert('Verwijderen', 'Wil je deze wee verwijderen?', [
      { text: 'Annuleer', style: 'cancel' },
      { text: 'Verwijder', style: 'destructive', onPress: () => setContractions((prev) => prev.filter((c) => c.id !== id)) },
    ]);
  }

  function clearAll() {
    Alert.alert('Alles wissen', 'Wil je alle weeën verwijderen?', [
      { text: 'Annuleer', style: 'cancel' },
      { text: 'Wis alles', style: 'destructive', onPress: () => setContractions([]) },
    ]);
  }

  const advice = getAdvice(contractions);

  // Calculate interval between last two contractions
  const lastInterval =
    contractions.length >= 2
      ? contractions[0].startTime - contractions[1].startTime
      : null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weeëntimer</Text>
        <Text style={styles.headerSubtitle}>Volg je weeën nauwkeurig op</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main timer */}
        <View style={styles.timerSection}>
          <View style={[styles.timerCircle, isActive && styles.timerCircleActive]}>
            <Text style={styles.timerLabel}>{isActive ? 'Duur wee' : 'Klaar om te starten'}</Text>
            <Text style={styles.timerDisplay}>{formatDuration(elapsed)}</Text>
            {isActive && <Text style={styles.timerStartTime}>Gestart om {formatTime(new Date(currentStart))}</Text>}
          </View>

          <TouchableOpacity
            style={[styles.mainButton, isActive ? styles.stopButton : styles.startButton]}
            onPress={handleMainButton}
            activeOpacity={0.8}
          >
            <Text style={styles.mainButtonText}>
              {isActive ? '⏹  Stop wee' : '▶  Start wee'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        {contractions.length > 0 && (
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{contractions.length}</Text>
              <Text style={styles.statLabel}>Weeën</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {formatDuration(contractions[0].duration)}
              </Text>
              <Text style={styles.statLabel}>Laatste duur</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {lastInterval ? formatDuration(lastInterval) : '—'}
              </Text>
              <Text style={styles.statLabel}>Interval</Text>
            </View>
          </View>
        )}

        {/* Advice */}
        {advice && (
          <View style={[styles.adviceCard, styles[`advice_${advice.level}`]]}>
            <Text style={styles.adviceText}>{advice.text}</Text>
          </View>
        )}

        {/* Rule of thumb */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>511-regel</Text>
          <Text style={styles.infoText}>
            Bel de verloskundige wanneer weeën:{'\n'}
            {'  '}• Elke <Text style={styles.bold}>5 minuten</Text> komen{'\n'}
            {'  '}• <Text style={styles.bold}>1 minuut</Text> duren{'\n'}
            {'  '}• Dit al <Text style={styles.bold}>1 uur</Text> zo is
          </Text>
        </View>

        {/* History */}
        {contractions.length > 0 && (
          <View style={styles.historySection}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Overzicht weeën</Text>
              <TouchableOpacity onPress={clearAll}>
                <Text style={styles.clearButton}>Wis alles</Text>
              </TouchableOpacity>
            </View>

            {contractions.map((c, index) => {
              const interval =
                index < contractions.length - 1
                  ? c.startTime - contractions[index + 1].startTime
                  : null;
              return (
                <TouchableOpacity
                  key={c.id}
                  style={styles.contractionRow}
                  onLongPress={() => deleteContraction(c.id)}
                >
                  <View style={styles.contractionNumber}>
                    <Text style={styles.contractionNumberText}>
                      {contractions.length - index}
                    </Text>
                  </View>
                  <View style={styles.contractionInfo}>
                    <Text style={styles.contractionTime}>{formatTime(new Date(c.startTime))}</Text>
                    <Text style={styles.contractionSub}>
                      Duur: <Text style={styles.bold}>{formatDuration(c.duration)}</Text>
                      {interval ? `   Interval: ${formatDuration(interval)}` : ''}
                    </Text>
                  </View>
                  {index === 0 && (
                    <View style={styles.latestBadge}>
                      <Text style={styles.latestBadgeText}>Laatste</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {contractions.length === 0 && !isActive && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>⏱️</Text>
            <Text style={styles.emptyTitle}>Nog geen weeën</Text>
            <Text style={styles.emptyText}>
              Druk op "Start wee" wanneer een wee begint, en op "Stop wee" wanneer hij voorbij is.{'\n\n'}
              Hou lang ingedrukt op een wee om hem te verwijderen.
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
  headerSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  timerSection: { alignItems: 'center', paddingVertical: 24, paddingHorizontal: 20 },
  timerCircle: {
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    elevation: 6, shadowColor: PINK, shadowOpacity: 0.2, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
    marginBottom: 24, borderWidth: 3, borderColor: '#f0f0f0',
  },
  timerCircleActive: { borderColor: RED, shadowColor: RED },
  timerLabel: { fontSize: 12, color: '#999', marginBottom: 4, fontWeight: '600' },
  timerDisplay: { fontSize: 48, fontWeight: '800', color: '#333', fontVariant: ['tabular-nums'] },
  timerStartTime: { fontSize: 11, color: '#999', marginTop: 4 },
  mainButton: {
    paddingHorizontal: 48, paddingVertical: 18,
    borderRadius: 36, elevation: 4,
    shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
  },
  startButton: { backgroundColor: GREEN, shadowColor: GREEN },
  stopButton: { backgroundColor: RED, shadowColor: RED },
  mainButtonText: { color: '#fff', fontSize: 20, fontWeight: '800' },
  statsRow: { flexDirection: 'row', marginHorizontal: 16, gap: 10, marginBottom: 16 },
  statCard: {
    flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 14,
    alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  statValue: { fontSize: 22, fontWeight: '800', color: PINK },
  statLabel: { fontSize: 11, color: '#999', marginTop: 2, fontWeight: '600' },
  adviceCard: { marginHorizontal: 16, borderRadius: 14, padding: 16, marginBottom: 12 },
  advice_urgent: { backgroundColor: '#FFEBEE', borderLeftWidth: 4, borderLeftColor: RED },
  advice_warning: { backgroundColor: '#FFF8E1', borderLeftWidth: 4, borderLeftColor: '#FF8F00' },
  advice_info: { backgroundColor: '#E3F2FD', borderLeftWidth: 4, borderLeftColor: '#1976D2' },
  advice_normal: { backgroundColor: '#E8F5E9', borderLeftWidth: 4, borderLeftColor: GREEN },
  adviceText: { fontSize: 14, color: '#333', lineHeight: 20 },
  infoCard: {
    marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, padding: 16,
    marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  infoTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#555', lineHeight: 24 },
  bold: { fontWeight: '700' },
  historySection: { marginHorizontal: 16, marginBottom: 8 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  historyTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  clearButton: { fontSize: 14, color: RED, fontWeight: '600' },
  contractionRow: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    flexDirection: 'row', alignItems: 'center', marginBottom: 8,
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3, shadowOffset: { width: 0, height: 1 },
  },
  contractionNumber: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: LIGHT_PINK, alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  contractionNumberText: { fontSize: 14, fontWeight: '700', color: PINK },
  contractionInfo: { flex: 1 },
  contractionTime: { fontSize: 15, fontWeight: '600', color: '#333' },
  contractionSub: { fontSize: 13, color: '#777', marginTop: 2 },
  latestBadge: { backgroundColor: PINK, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  latestBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingHorizontal: 32, paddingVertical: 16 },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#333', marginBottom: 12 },
  emptyText: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 22 },
});
