import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloseIcon, LogoWaveIcon, SlidersIcon } from './Icons';
import { Track } from './types';

interface CreateTrackModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateTrack: (track: Partial<Track>) => void;
  creatorName?: string;
  creatorHandle?: string;
}

const GENRES = ['Synthwave', 'Cyberpunk', 'Lo-Fi', 'House', 'Ambient', 'Techno'];

export function CreateTrackModal({
  visible,
  onClose,
  onCreateTrack,
  creatorName = 'Sorae Creator',
  creatorHandle = '@sorae_user',
}: CreateTrackModalProps) {
  const [title, setTitle] = useState('');
  const [bpm, setBpm] = useState('124');
  const [selectedGenre, setSelectedGenre] = useState('Synthwave');
  const [actionType, setActionType] = useState<'remix' | 'use'>('remix');

  const handlePublish = () => {
    if (!title.trim()) {
      if (Platform.OS === 'web') {
        window.alert('Por favor ingresa un título para tu pista.');
      } else {
        Alert.alert('Título requerido', 'Por favor ingresa un título para tu pista.');
      }
      return;
    }

    onCreateTrack({
      title: title.trim(),
      bpm: parseInt(bpm, 10) || 124,
      duration: '0:42',
      genre: selectedGenre,
      actionType,
      actionLabel: actionType === 'remix' ? 'Remix' : 'Usar',
      author: {
        id: 'me',
        name: creatorName,
        handle: creatorHandle,
        avatarUrl: '',
        isVerified: true,
      },
    });

    setTitle('');
    onClose();

    if (Platform.OS === 'web') {
      window.alert(`¡Pista "${title}" publicada exitosamente en Sorae!`);
    } else {
      Alert.alert('¡Publicado!', `Tu pista "${title}" está lista en tu feed.`);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 justify-end bg-black/70"
        style={styles.overlay}
      >
        <Pressable className="flex-1" onPress={onClose} />

        <View className="bg-[#14151d] border-t border-[#23242f] rounded-t-3xl max-h-[85%]" style={styles.sheet}>
          {/* Sheet Handle */}
          <View className="items-center pt-3 pb-2" style={styles.handleContainer}>
            <View className="w-12 h-1 bg-[#2e303f] rounded-full" style={styles.handle} />
          </View>

          {/* Header */}
          <View className="flex-row items-center justify-between px-6 pb-3 border-b border-[#20222c]" style={styles.header}>
            <View className="flex-row items-center gap-2" style={styles.headerTitleRow}>
              <LogoWaveIcon size={22} color="#9359ff" />
              <Text className="text-white text-base font-bold tracking-tight" style={styles.headerTitle}>
                Sorae Studio
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              hitSlop={10}
              className="w-8 h-8 rounded-full bg-[#1e202b] items-center justify-center active:opacity-75"
              style={styles.closeBtn}
            >
              <CloseIcon size={13} color="#ffffff" />
            </Pressable>
          </View>

          <ScrollView className="px-6 py-4" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            {/* Quick Actions Grid */}
            <Text className="text-[#8e8f99] text-[11px] font-bold uppercase tracking-wider mb-2.5" style={styles.sectionLabel}>
              Herramientas de Creación
            </Text>

            <View className="flex-row gap-2.5 mb-5" style={styles.toolsRow}>
              <Pressable
                onPress={() => {
                  setTitle('Grabación Vocal #1');
                  setSelectedGenre('Lo-Fi');
                }}
                className="flex-1 bg-[#1a1b26] border border-[#272938] rounded-2xl p-3 items-center active:opacity-80"
                style={styles.toolCard}
              >
                <Text className="text-xl mb-1">🎙️</Text>
                <Text className="text-white text-xs font-semibold" style={styles.toolTitle}>Grabar Sample</Text>
                <Text className="text-[#8e8f99] text-[10px] text-center mt-0.5" style={styles.toolSubtitle}>Micrófono HD</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setTitle('Cyber Beat Master');
                  setSelectedGenre('Cyberpunk');
                }}
                className="flex-1 bg-[#1a1b26] border border-[#272938] rounded-2xl p-3 items-center active:opacity-80"
                style={styles.toolCard}
              >
                <Text className="text-xl mb-1">📁</Text>
                <Text className="text-white text-xs font-semibold" style={styles.toolTitle}>Subir Audio</Text>
                <Text className="text-[#8e8f99] text-[10px] text-center mt-0.5" style={styles.toolSubtitle}>WAV / MP3</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setTitle('AI Stem Remix');
                  setSelectedGenre('Synthwave');
                  setActionType('remix');
                }}
                className="flex-1 bg-[#1a1b26] border border-[#272938] rounded-2xl p-3 items-center active:opacity-80"
                style={styles.toolCard}
              >
                <Text className="text-xl mb-1">✨</Text>
                <Text className="text-white text-xs font-semibold" style={styles.toolTitle}>Remix IA</Text>
                <Text className="text-[#8e8f99] text-[10px] text-center mt-0.5" style={styles.toolSubtitle}>Stems aislados</Text>
              </Pressable>
            </View>

            {/* Track Info Form */}
            <Text className="text-[#8e8f99] text-[11px] font-bold uppercase tracking-wider mb-2.5" style={styles.sectionLabel}>
              Detalles de la Pista
            </Text>

            {/* Title */}
            <View className="mb-3.5">
              <Text className="text-xs text-[#a1a1aa] mb-1 font-medium">Título del Track</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Ej. Retro Sunset Vibe"
                placeholderTextColor="#6b7280"
                className="bg-[#181922] border border-[#262835] rounded-xl px-3.5 py-2.5 text-white text-sm"
                style={styles.input}
              />
            </View>

            {/* BPM & Action Type */}
            <View className="flex-row gap-3 mb-3.5" style={styles.row}>
              <View className="flex-1">
                <Text className="text-xs text-[#a1a1aa] mb-1 font-medium">Tempo (BPM)</Text>
                <TextInput
                  value={bpm}
                  onChangeText={setBpm}
                  keyboardType="number-pad"
                  placeholder="124"
                  placeholderTextColor="#6b7280"
                  className="bg-[#181922] border border-[#262835] rounded-xl px-3.5 py-2.5 text-white text-sm"
                  style={styles.input}
                />
              </View>

              <View className="flex-1">
                <Text className="text-xs text-[#a1a1aa] mb-1 font-medium">Tipo de Licencia</Text>
                <View className="flex-row bg-[#181922] border border-[#262835] rounded-xl p-0.5" style={styles.toggleRow}>
                  <Pressable
                    onPress={() => setActionType('remix')}
                    className={`flex-1 py-2 rounded-lg items-center ${actionType === 'remix' ? 'bg-[#8b5cf6]' : ''}`}
                    style={actionType === 'remix' ? styles.toggleActive : styles.toggleInactive}
                  >
                    <Text className={`text-xs font-semibold ${actionType === 'remix' ? 'text-white' : 'text-[#8e8f99]'}`}>
                      Remix
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setActionType('use')}
                    className={`flex-1 py-2 rounded-lg items-center ${actionType === 'use' ? 'bg-[#8b5cf6]' : ''}`}
                    style={actionType === 'use' ? styles.toggleActive : styles.toggleInactive}
                  >
                    <Text className={`text-xs font-semibold ${actionType === 'use' ? 'text-white' : 'text-[#8e8f99]'}`}>
                      Usar
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Genre Pills */}
            <Text className="text-xs text-[#a1a1aa] mb-1.5 font-medium">Género</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6" contentContainerStyle={styles.genreScroll}>
              {GENRES.map((g) => {
                const isSelected = g === selectedGenre;
                return (
                  <Pressable
                    key={g}
                    onPress={() => setSelectedGenre(g)}
                    className={`px-3.5 py-1.5 rounded-full border ${
                      isSelected
                        ? 'bg-[#8b5cf6] border-[#8b5cf6]'
                        : 'bg-[#181922] border-[#262835]'
                    }`}
                    style={isSelected ? styles.genreActive : styles.genreInactive}
                  >
                    <Text className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-[#8e8f99]'}`}>
                      {g}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Publish Button */}
            <Pressable
              onPress={handlePublish}
              className="w-full bg-[#8b5cf6] active:bg-[#7c3aed] py-3.5 rounded-2xl items-center justify-center mb-6 shadow-lg shadow-purple-600/40"
              style={styles.publishBtn}
            >
              <Text className="text-white text-sm font-bold tracking-wide">
                Publicar Pista en Sorae
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#14151d',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderColor: '#23242f',
    maxHeight: '85%',
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  handle: {
    width: 44,
    height: 4,
    backgroundColor: '#2e303f',
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#20222c',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1e202b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: {
    color: '#8e8f99',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  toolsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  toolCard: {
    flex: 1,
    backgroundColor: '#1a1b26',
    borderWidth: 1,
    borderColor: '#272938',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  toolTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  toolSubtitle: {
    color: '#8e8f99',
    fontSize: 10,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  input: {
    backgroundColor: '#181922',
    borderWidth: 1,
    borderColor: '#262835',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 14,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#181922',
    borderWidth: 1,
    borderColor: '#262835',
    borderRadius: 14,
    padding: 2,
  },
  toggleActive: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
  },
  toggleInactive: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  genreScroll: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  genreActive: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 9999,
    backgroundColor: '#8b5cf6',
    borderWidth: 1,
    borderColor: '#8b5cf6',
  },
  genreInactive: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 9999,
    backgroundColor: '#181922',
    borderWidth: 1,
    borderColor: '#262835',
  },
  publishBtn: {
    width: '100%',
    backgroundColor: '#8b5cf6',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
});
