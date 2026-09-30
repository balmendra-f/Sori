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
  ActivityIndicator,
  Alert,
} from 'react-native';
import { updateUser } from '@/api/auth';
import { CloseIcon } from '../Icons';

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  currentName: string;
  currentBio: string;
  currentLocation: string;
  onProfileUpdated: (updated: { name: string; bio: string; location: string }) => void;
}

export function EditProfileModal({
  visible,
  onClose,
  currentName,
  currentBio,
  currentLocation,
  onProfileUpdated,
}: EditProfileModalProps) {
  const [name, setName] = useState(currentName);
  const [bio, setBio] = useState(currentBio);
  const [location, setLocation] = useState(currentLocation);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      if (Platform.OS === 'web') {
        window.alert('El nombre no puede estar vacío');
      } else {
        Alert.alert('Nombre requerido', 'El nombre no puede estar vacío');
      }
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await updateUser({
        data: {
          display_name: name.trim(),
          full_name: name.trim(),
          bio: bio.trim(),
          location: location.trim(),
        },
      });

      setIsSaving(false);

      if (error) {
        if (Platform.OS === 'web') {
          window.alert(`Error: ${error.message}`);
        } else {
          Alert.alert('Error al guardar', error.message);
        }
        return;
      }

      onProfileUpdated({
        name: name.trim(),
        bio: bio.trim(),
        location: location.trim(),
      });

      onClose();
    } catch (err: any) {
      setIsSaving(false);
      const msg = err?.message || 'Error al actualizar perfil';
      if (Platform.OS === 'web') {
        window.alert(msg);
      } else {
        Alert.alert('Error', msg);
      }
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
          {/* Handle */}
          <View className="items-center pt-3 pb-2" style={styles.handleContainer}>
            <View className="w-12 h-1 bg-[#2e303f] rounded-full" style={styles.handle} />
          </View>

          {/* Header */}
          <View className="flex-row items-center justify-between px-6 pb-3 border-b border-[#20222c]" style={styles.header}>
            <Text className="text-white text-base font-bold tracking-tight" style={styles.headerTitle}>
              Editar Perfil
            </Text>
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
            {/* Name Input */}
            <View className="mb-4">
              <Text className="text-xs text-[#a1a1aa] mb-1.5 font-medium">Nombre o Alias</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Tu nombre de creador"
                placeholderTextColor="#6b7280"
                className="bg-[#181922] border border-[#262835] rounded-xl px-3.5 py-2.5 text-white text-sm"
                style={styles.input}
              />
            </View>

            {/* Bio Input */}
            <View className="mb-4">
              <Text className="text-xs text-[#a1a1aa] mb-1.5 font-medium">Biografía</Text>
              <TextInput
                value={bio}
                onChangeText={setBio}
                placeholder="Cuéntale a la comunidad sobre tu sonido y estilo..."
                placeholderTextColor="#6b7280"
                multiline
                numberOfLines={3}
                className="bg-[#181922] border border-[#262835] rounded-xl px-3.5 py-2.5 text-white text-sm"
                style={[styles.input, styles.multilineInput]}
              />
            </View>

            {/* Location Input */}
            <View className="mb-6">
              <Text className="text-xs text-[#a1a1aa] mb-1.5 font-medium">Ubicación / Ciudad</Text>
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Ej. Buenos Aires, Argentina"
                placeholderTextColor="#6b7280"
                className="bg-[#181922] border border-[#262835] rounded-xl px-3.5 py-2.5 text-white text-sm"
                style={styles.input}
              />
            </View>

            {/* Save Button */}
            <Pressable
              onPress={handleSave}
              disabled={isSaving}
              className="w-full bg-[#8b5cf6] active:bg-[#7c3aed] py-3.5 rounded-2xl items-center justify-center mb-6 shadow-lg shadow-purple-600/40"
              style={styles.saveBtn}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text className="text-white text-sm font-bold tracking-wide">
                  Guardar Cambios
                </Text>
              )}
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
  multilineInput: {
    minHeight: 74,
    textAlignVertical: 'top',
  },
  saveBtn: {
    width: '100%',
    backgroundColor: '#8b5cf6',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
});
