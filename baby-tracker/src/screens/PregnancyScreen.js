import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import pregnancyData from '../data/pregnancyData';

const PINK = '#E91E8C';
const LIGHT_PINK = '#FFF0F5';
const PURPLE = '#9C27B0';

export default function PregnancyScreen() {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [dueDateInput, setDueDateInput] = useState('');
  const [currentWeek, setCurrentWeek] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [dateError, setDateError] = useState('');

  function calculateCurrentWeek(dueDateStr) {
    // Expects DD/MM/YYYY
    const parts = dueDateStr.split('/');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    const dueDate = new Date(`${year}-${month}-${day}`);
    if (isNaN(dueDate.getTime())) return null;
    const conceptionDate = new Date(dueDate);
    conceptionDate.setDate(conceptionDate.getDate() - 280); // 40 weeks
    const today = new Date();
    const diffMs = today - conceptionDate;
    const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7)) + 1;
    if (diffWeeks < 1 || diffWeeks > 42) return null;
    return Math.min(diffWeeks, 40);
  }

  function handleSetDueDate() {
    setDateError('');
    const week = calculateCurrentWeek(dueDateInput);
    if (!week) {
      setDateError('Voer een geldige datum in (DD/MM/JJJJ)');
      return;
    }
    setCurrentWeek(week);
    setShowDateModal(false);
  }

  const displayedWeek = selectedWeek || currentWeek;
  const weekData = displayedWeek ? pregnancyData[displayedWeek - 1] : null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Zwangerschap</Text>
        <TouchableOpacity style={styles.dueDateButton} onPress={() => setShowDateModal(true)}>
          <Text style={styles.dueDateButtonText}>
            {currentWeek ? `Week ${currentWeek} van 40` : 'Stel uitgerekende datum in'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Week selector */}
      <View style={styles.weekSelectorContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekScroll}>
          {Array.from({ length: 40 }, (_, i) => i + 1).map((week) => (
            <TouchableOpacity
              key={week}
              style={[
                styles.weekChip,
                displayedWeek === week && styles.weekChipSelected,
                currentWeek === week && styles.weekChipCurrent,
              ]}
              onPress={() => setSelectedWeek(week === selectedWeek ? null : week)}
            >
              <Text
                style={[
                  styles.weekChipText,
                  displayedWeek === week && styles.weekChipTextSelected,
                ]}
              >
                {week}
              </Text>
              {currentWeek === week && (
                <View style={styles.currentDot} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {weekData ? (
          <View style={styles.weekCard}>
            {/* Week title */}
            <View style={styles.weekTitleRow}>
              <Text style={styles.weekNumber}>Week {weekData.week}</Text>
              {currentWeek === weekData.week && (
                <View style={styles.currentBadge}>
                  <Text style={styles.currentBadgeText}>Nu</Text>
                </View>
              )}
            </View>

            {/* Size */}
            <View style={styles.sizeCard}>
              <Text style={styles.sizeEmoji}>{weekData.sizeComparison}</Text>
              <View style={styles.sizeInfo}>
                <Text style={styles.sizeTitle}>Zo groot als een {weekData.size}</Text>
                <Text style={styles.sizeDetail}>Lengte: {weekData.length}</Text>
                {weekData.weight !== '-' && (
                  <Text style={styles.sizeDetail}>Gewicht: {weekData.weight}</Text>
                )}
              </View>
            </View>

            {/* Highlights */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hoogtepunten deze week</Text>
              {weekData.highlights.map((h, i) => (
                <View key={i} style={styles.highlightItem}>
                  <Text style={styles.highlightBullet}>✨</Text>
                  <Text style={styles.highlightText}>{h}</Text>
                </View>
              ))}
            </View>

            {/* Development */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ontwikkeling</Text>
              <Text style={styles.bodyText}>{weekData.development}</Text>
            </View>

            {/* Mom tips */}
            <View style={[styles.section, styles.tipCard]}>
              <Text style={styles.tipTitle}>Tips voor mama</Text>
              <Text style={styles.tipText}>{weekData.momTips}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderEmoji}>🤰</Text>
            <Text style={styles.placeholderTitle}>Week-voor-week gids</Text>
            <Text style={styles.placeholderText}>
              Selecteer een week hierboven of stel je uitgerekende datum in om je huidige week te zien.
            </Text>
            <View style={styles.quickFacts}>
              <Text style={styles.quickFactsTitle}>Wist je dat?</Text>
              <Text style={styles.quickFact}>🗓️ Een zwangerschap duurt gemiddeld 40 weken</Text>
              <Text style={styles.quickFact}>❤️ Het hartje klopt al in week 4</Text>
              <Text style={styles.quickFact}>👂 Baby hoort je stem vanaf week 16</Text>
              <Text style={styles.quickFact}>👶 Baby is "à terme" vanaf week 37</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Due Date Modal */}
      <Modal visible={showDateModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Uitgerekende datum</Text>
            <Text style={styles.modalSubtitle}>
              Vul je uitgerekende datum in om je huidige zwangerschapsweek te berekenen.
            </Text>
            <TextInput
              style={styles.dateInput}
              value={dueDateInput}
              onChangeText={setDueDateInput}
              placeholder="DD/MM/JJJJ"
              keyboardType="numeric"
              maxLength={10}
            />
            {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnCancel]}
                onPress={() => setShowDateModal(false)}
              >
                <Text style={styles.modalBtnCancelText}>Annuleer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.modalBtnConfirm]} onPress={handleSetDueDate}>
                <Text style={styles.modalBtnConfirmText}>Opslaan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LIGHT_PINK },
  header: {
    backgroundColor: PINK,
    paddingTop: Platform.OS === 'ios' ? 0 : 16,
    paddingBottom: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 8 },
  dueDateButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dueDateButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  weekSelectorContainer: { backgroundColor: '#fff', paddingVertical: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  weekScroll: { paddingHorizontal: 12 },
  weekChip: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#F5F5F5', marginHorizontal: 4,
    alignItems: 'center', justifyContent: 'center',
  },
  weekChipSelected: { backgroundColor: PINK },
  weekChipCurrent: { borderWidth: 2, borderColor: PINK },
  weekChipText: { fontSize: 13, fontWeight: '600', color: '#666' },
  weekChipTextSelected: { color: '#fff' },
  currentDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: PINK, position: 'absolute', bottom: 2 },
  content: { flex: 1 },
  weekCard: { margin: 16, gap: 16 },
  weekTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  weekNumber: { fontSize: 26, fontWeight: '800', color: PINK },
  currentBadge: { backgroundColor: PINK, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  currentBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  sizeCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 16,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  sizeEmoji: { fontSize: 48 },
  sizeInfo: { flex: 1 },
  sizeTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 4 },
  sizeDetail: { fontSize: 14, color: '#666', marginTop: 2 },
  section: { backgroundColor: '#fff', borderRadius: 16, padding: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 10 },
  highlightItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
  highlightBullet: { fontSize: 14 },
  highlightText: { flex: 1, fontSize: 14, color: '#444' },
  bodyText: { fontSize: 14, color: '#444', lineHeight: 22 },
  tipCard: { backgroundColor: '#FFF8E7', borderLeftWidth: 4, borderLeftColor: '#FFB300' },
  tipTitle: { fontSize: 16, fontWeight: '700', color: '#E65100', marginBottom: 8 },
  tipText: { fontSize: 14, color: '#444', lineHeight: 22 },
  placeholder: { margin: 24, alignItems: 'center' },
  placeholderEmoji: { fontSize: 64, marginBottom: 16 },
  placeholderTitle: { fontSize: 22, fontWeight: '800', color: PINK, marginBottom: 8 },
  placeholderText: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  quickFacts: { backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '100%', elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  quickFactsTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 12 },
  quickFact: { fontSize: 14, color: '#444', marginBottom: 8, lineHeight: 20 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { backgroundColor: '#fff', margin: 24, borderRadius: 20, padding: 24, width: '85%' },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#333', marginBottom: 8 },
  modalSubtitle: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 20 },
  dateInput: { borderWidth: 1.5, borderColor: '#ddd', borderRadius: 12, padding: 14, fontSize: 18, textAlign: 'center', color: '#333', letterSpacing: 2 },
  errorText: { color: '#E53935', fontSize: 13, marginTop: 8, textAlign: 'center' },
  modalButtons: { flexDirection: 'row', gap: 12, marginTop: 20 },
  modalBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  modalBtnCancel: { backgroundColor: '#F5F5F5' },
  modalBtnCancelText: { color: '#666', fontWeight: '600', fontSize: 16 },
  modalBtnConfirm: { backgroundColor: PINK },
  modalBtnConfirmText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
