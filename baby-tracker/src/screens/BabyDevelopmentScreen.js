import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import babyDevelopmentData, { wonderWeeks, isWonderWeek, getWonderWeekInfo } from '../data/babyDevelopmentData';

const PINK = '#E91E8C';
const LIGHT_PINK = '#FFF0F5';
const PURPLE = '#7B1FA2';
const LIGHT_PURPLE = '#F3E5F5';
const ORANGE = '#E65100';
const YELLOW = '#FFB300';

function findClosestWeekData(week) {
  // Find exact match first
  const exact = babyDevelopmentData.find((d) => d.week === week);
  if (exact) return exact;
  // Otherwise find closest
  return babyDevelopmentData.reduce((prev, curr) =>
    Math.abs(curr.week - week) < Math.abs(prev.week - week) ? curr : prev
  );
}

export default function BabyDevelopmentScreen() {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [birthDateInput, setBirthDateInput] = useState('');
  const [currentWeek, setCurrentWeek] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [dateError, setDateError] = useState('');
  const [showWonderInfo, setShowWonderInfo] = useState(false);

  function calculateCurrentWeek(birthDateStr) {
    const parts = birthDateStr.split('/');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    const birthDate = new Date(`${year}-${month}-${day}`);
    if (isNaN(birthDate.getTime())) return null;
    const today = new Date();
    const diffMs = today - birthDate;
    const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7)) + 1;
    if (diffWeeks < 1) return null;
    return diffWeeks;
  }

  function handleSetBirthDate() {
    setDateError('');
    const week = calculateCurrentWeek(birthDateInput);
    if (!week) {
      setDateError('Voer een geldige geboortedatum in (DD/MM/JJJJ)');
      return;
    }
    setCurrentWeek(week);
    setShowDateModal(false);
  }

  const displayedWeek = selectedWeek || currentWeek;
  const weekData = displayedWeek ? findClosestWeekData(displayedWeek) : null;
  const wonderWeekInfo = displayedWeek ? getWonderWeekInfo(displayedWeek) : null;
  const isCurrentWonderWeek = displayedWeek ? isWonderWeek(displayedWeek) : false;

  // Group wonder weeks for the selector
  const maxWeek = Math.max(75, (currentWeek || 0) + 5);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Babys Ontwikkeling</Text>
        <TouchableOpacity style={styles.birthDateButton} onPress={() => setShowDateModal(true)}>
          <Text style={styles.birthDateButtonText}>
            {currentWeek ? `Week ${currentWeek} na geboorte` : 'Stel geboortedatum in'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Week selector */}
      <View style={styles.weekSelectorContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekScroll}>
          {Array.from({ length: Math.min(maxWeek, 80) }, (_, i) => i + 1).map((week) => {
            const isWW = isWonderWeek(week);
            return (
              <TouchableOpacity
                key={week}
                style={[
                  styles.weekChip,
                  displayedWeek === week && styles.weekChipSelected,
                  currentWeek === week && styles.weekChipCurrent,
                  isWW && styles.weekChipWonder,
                  displayedWeek === week && isWW && styles.weekChipWonderSelected,
                ]}
                onPress={() => setSelectedWeek(week === selectedWeek ? null : week)}
              >
                <Text
                  style={[
                    styles.weekChipText,
                    displayedWeek === week && styles.weekChipTextSelected,
                    isWW && !displayedWeek === week && styles.weekChipTextWonder,
                  ]}
                >
                  {week}
                </Text>
                {isWW && <Text style={styles.wonderStar}>⭐</Text>}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Text style={styles.selectorLegend}>⭐ = Sprong (wonder week)</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {displayedWeek ? (
          <View style={styles.weekCard}>
            {/* Week header */}
            <View style={styles.weekHeaderRow}>
              <View>
                <Text style={styles.weekNumber}>Week {displayedWeek}</Text>
                {currentWeek === displayedWeek && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>Huidige week</Text>
                  </View>
                )}
              </View>
              {isCurrentWonderWeek && (
                <View style={styles.wonderBadge}>
                  <Text style={styles.wonderBadgeText}>🌟 SPRONG!</Text>
                </View>
              )}
            </View>

            {/* Wonder week card */}
            {wonderWeekInfo && (
              <TouchableOpacity
                style={styles.wonderCard}
                onPress={() => setShowWonderInfo(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.wonderCardEmoji}>🌟</Text>
                <View style={styles.wonderCardInfo}>
                  <Text style={styles.wonderCardTitle}>{wonderWeekInfo.name}</Text>
                  <Text style={styles.wonderCardSub}>Tik voor meer info</Text>
                </View>
                <Text style={styles.wonderCardArrow}>›</Text>
              </TouchableOpacity>
            )}

            {/* Week data */}
            {weekData && (
              <>
                <View style={styles.sizeCard}>
                  <Text style={styles.sizeBaby}>👶</Text>
                  <View style={styles.sizeInfo}>
                    <Text style={styles.sizeTitle}>{weekData.title}</Text>
                    <Text style={styles.sizeDetail}>{weekData.size}</Text>
                  </View>
                </View>

                {/* Development */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Ontwikkeling</Text>
                  <Text style={styles.bodyText}>{weekData.development}</Text>
                </View>

                {/* Motor skills */}
                {weekData.motor && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Motoriek</Text>
                    {weekData.motor.map((skill, i) => (
                      <View key={i} style={styles.listItem}>
                        <Text style={styles.listBullet}>💪</Text>
                        <Text style={styles.listText}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Social skills */}
                {weekData.social && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sociaal & Communicatie</Text>
                    {weekData.social.map((skill, i) => (
                      <View key={i} style={styles.listItem}>
                        <Text style={styles.listBullet}>💬</Text>
                        <Text style={styles.listText}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Sleep & Feeding */}
                <View style={styles.twoColRow}>
                  {weekData.sleep && (
                    <View style={[styles.infoChip, { flex: 1 }]}>
                      <Text style={styles.infoChipEmoji}>😴</Text>
                      <Text style={styles.infoChipTitle}>Slaap</Text>
                      <Text style={styles.infoChipText}>{weekData.sleep}</Text>
                    </View>
                  )}
                  {weekData.feeding && (
                    <View style={[styles.infoChip, { flex: 1 }]}>
                      <Text style={styles.infoChipEmoji}>🍼</Text>
                      <Text style={styles.infoChipTitle}>Voeding</Text>
                      <Text style={styles.infoChipText}>{weekData.feeding}</Text>
                    </View>
                  )}
                </View>

                {/* Tips */}
                {weekData.tips && (
                  <View style={[styles.section, styles.tipCard]}>
                    <Text style={styles.tipTitle}>Tips voor deze week</Text>
                    <Text style={styles.tipText}>{weekData.tips}</Text>
                  </View>
                )}
              </>
            )}

            {/* Upcoming wonder weeks */}
            {displayedWeek && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Komende sprongetjes</Text>
                {wonderWeeks
                  .filter((ww) => ww > displayedWeek)
                  .slice(0, 3)
                  .map((ww) => (
                    <TouchableOpacity
                      key={ww}
                      style={styles.upcomingRow}
                      onPress={() => setSelectedWeek(ww)}
                    >
                      <Text style={styles.upcomingWeek}>Week {ww}</Text>
                      <Text style={styles.upcomingIn}>over {ww - displayedWeek} weken</Text>
                      <Text style={styles.upcomingArrow}>›</Text>
                    </TouchableOpacity>
                  ))}
                {wonderWeeks.filter((ww) => ww > displayedWeek).length === 0 && (
                  <Text style={styles.bodyText}>Je hebt alle sprongetjes doorstaan! 🎉</Text>
                )}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderEmoji}>👶</Text>
            <Text style={styles.placeholderTitle}>Babys ontwikkeling</Text>
            <Text style={styles.placeholderText}>
              Stel de geboortedatum in of selecteer een week om de ontwikkeling en sprongetjes te bekijken.
            </Text>

            {/* Wonder weeks overview */}
            <View style={styles.wwOverviewCard}>
              <Text style={styles.wwOverviewTitle}>De 10 Grote Sprongetjes</Text>
              {[
                { week: 5, name: 'Gewaarwordingen' },
                { week: 8, name: 'Patronen' },
                { week: 12, name: 'Soepele Overgangen' },
                { week: 15, name: 'Gebeurtenissen' },
                { week: 19, name: 'Relaties' },
                { week: 23, name: 'Categorieën' },
                { week: 26, name: 'Sequences' },
                { week: 33, name: "Programma's" },
                { week: 37, name: 'Principes' },
                { week: 41, name: 'Systemen' },
              ].map((leap) => (
                <TouchableOpacity
                  key={leap.week}
                  style={styles.wwRow}
                  onPress={() => setSelectedWeek(leap.week)}
                >
                  <View style={styles.wwWeekBadge}>
                    <Text style={styles.wwWeekText}>W{leap.week}</Text>
                  </View>
                  <Text style={styles.wwName}>Sprong: {leap.name}</Text>
                  <Text style={styles.wwArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* Wonder Week Detail Modal */}
      <Modal visible={showWonderInfo && !!wonderWeekInfo} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalEmoji}>🌟</Text>
              <Text style={styles.modalTitle}>{wonderWeekInfo?.name}</Text>
              <Text style={styles.modalBody}>{wonderWeekInfo?.description}</Text>

              <Text style={styles.modalSubtitle}>Nieuwe vaardigheden</Text>
              {wonderWeekInfo?.newSkills?.map((skill, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.listBullet}>✨</Text>
                  <Text style={styles.listText}>{skill}</Text>
                </View>
              ))}

              <View style={styles.tipCard}>
                <Text style={styles.tipTitle}>Tip voor ouders</Text>
                <Text style={styles.tipText}>{wonderWeekInfo?.tips}</Text>
              </View>

              <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowWonderInfo(false)}>
                <Text style={styles.modalCloseBtnText}>Sluiten</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Birth Date Modal */}
      <Modal visible={showDateModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Geboortedatum baby</Text>
            <Text style={styles.modalBodySmall}>
              Vul de geboortedatum in om de huidige ontwikkelingsweek te berekenen.
            </Text>
            <TextInput
              style={styles.dateInput}
              value={birthDateInput}
              onChangeText={setBirthDateInput}
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
              <TouchableOpacity style={[styles.modalBtn, styles.modalBtnConfirm]} onPress={handleSetBirthDate}>
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
    backgroundColor: PURPLE,
    paddingTop: Platform.OS === 'ios' ? 0 : 16,
    paddingBottom: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 8 },
  birthDateButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  birthDateButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  weekSelectorContainer: { backgroundColor: '#fff', paddingTop: 10, paddingBottom: 4, elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  weekScroll: { paddingHorizontal: 12 },
  weekChip: {
    minWidth: 40, height: 44, borderRadius: 22,
    backgroundColor: '#F5F5F5', marginHorizontal: 3,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4,
  },
  weekChipSelected: { backgroundColor: PURPLE },
  weekChipCurrent: { borderWidth: 2, borderColor: PURPLE },
  weekChipWonder: { backgroundColor: '#FFF8E1', borderWidth: 1.5, borderColor: YELLOW },
  weekChipWonderSelected: { backgroundColor: PURPLE },
  weekChipText: { fontSize: 12, fontWeight: '600', color: '#666' },
  weekChipTextSelected: { color: '#fff' },
  weekChipTextWonder: { color: ORANGE },
  wonderStar: { fontSize: 8, lineHeight: 10 },
  selectorLegend: { fontSize: 11, color: '#999', textAlign: 'center', paddingVertical: 4 },
  content: { flex: 1 },
  weekCard: { margin: 16, gap: 14 },
  weekHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  weekNumber: { fontSize: 26, fontWeight: '800', color: PURPLE },
  currentBadge: { backgroundColor: PURPLE, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10, marginTop: 4, alignSelf: 'flex-start' },
  currentBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  wonderBadge: { backgroundColor: '#FFF8E1', borderWidth: 2, borderColor: YELLOW, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  wonderBadgeText: { color: ORANGE, fontWeight: '800', fontSize: 14 },
  wonderCard: {
    backgroundColor: '#FFF8E1', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 2, borderColor: YELLOW,
    elevation: 2, shadowColor: YELLOW, shadowOpacity: 0.2, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  wonderCardEmoji: { fontSize: 36 },
  wonderCardInfo: { flex: 1 },
  wonderCardTitle: { fontSize: 15, fontWeight: '700', color: ORANGE },
  wonderCardSub: { fontSize: 12, color: '#888', marginTop: 2 },
  wonderCardArrow: { fontSize: 24, color: ORANGE },
  sizeCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  sizeBaby: { fontSize: 44 },
  sizeInfo: { flex: 1 },
  sizeTitle: { fontSize: 15, fontWeight: '700', color: '#333', marginBottom: 4 },
  sizeDetail: { fontSize: 13, color: '#666' },
  section: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 10 },
  bodyText: { fontSize: 14, color: '#444', lineHeight: 22 },
  listItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
  listBullet: { fontSize: 14, width: 20 },
  listText: { flex: 1, fontSize: 14, color: '#444', lineHeight: 20 },
  twoColRow: { flexDirection: 'row', gap: 12 },
  infoChip: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14, alignItems: 'center',
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  infoChipEmoji: { fontSize: 28, marginBottom: 4 },
  infoChipTitle: { fontSize: 13, fontWeight: '700', color: '#333', marginBottom: 4 },
  infoChipText: { fontSize: 12, color: '#666', textAlign: 'center', lineHeight: 18 },
  tipCard: { backgroundColor: '#FFF8E7', borderRadius: 14, padding: 14, borderLeftWidth: 4, borderLeftColor: YELLOW },
  tipTitle: { fontSize: 15, fontWeight: '700', color: ORANGE, marginBottom: 6 },
  tipText: { fontSize: 14, color: '#444', lineHeight: 20 },
  upcomingRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },
  upcomingWeek: { fontSize: 15, fontWeight: '700', color: '#333', width: 70 },
  upcomingIn: { flex: 1, fontSize: 13, color: '#666' },
  upcomingArrow: { fontSize: 20, color: '#ccc' },
  placeholder: { margin: 20, alignItems: 'center' },
  placeholderEmoji: { fontSize: 64, marginBottom: 16 },
  placeholderTitle: { fontSize: 22, fontWeight: '800', color: PURPLE, marginBottom: 8 },
  placeholderText: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  wwOverviewCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, width: '100%', elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  wwOverviewTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 12 },
  wwRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  wwWeekBadge: { backgroundColor: LIGHT_PURPLE, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, marginRight: 12 },
  wwWeekText: { fontSize: 12, fontWeight: '700', color: PURPLE },
  wwName: { flex: 1, fontSize: 14, color: '#444' },
  wwArrow: { fontSize: 18, color: '#ccc' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { backgroundColor: '#fff', margin: 20, borderRadius: 20, padding: 24, width: '90%', maxHeight: '80%' },
  modalEmoji: { fontSize: 40, textAlign: 'center', marginBottom: 12 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#333', marginBottom: 8, textAlign: 'center' },
  modalBody: { fontSize: 14, color: '#555', lineHeight: 22, marginBottom: 16 },
  modalBodySmall: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 20 },
  modalSubtitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 8, marginTop: 4 },
  modalCloseBtn: { backgroundColor: PURPLE, borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 16 },
  modalCloseBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  dateInput: { borderWidth: 1.5, borderColor: '#ddd', borderRadius: 12, padding: 14, fontSize: 18, textAlign: 'center', color: '#333', letterSpacing: 2 },
  errorText: { color: '#E53935', fontSize: 13, marginTop: 8, textAlign: 'center' },
  modalButtons: { flexDirection: 'row', gap: 12, marginTop: 20 },
  modalBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  modalBtnCancel: { backgroundColor: '#F5F5F5' },
  modalBtnCancelText: { color: '#666', fontWeight: '600', fontSize: 16 },
  modalBtnConfirm: { backgroundColor: PURPLE },
  modalBtnConfirmText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
