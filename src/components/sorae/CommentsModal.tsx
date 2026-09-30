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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrackComment } from './types';
import { CloseIcon } from './Icons';

interface CommentsModalProps {
  visible: boolean;
  trackTitle?: string;
  comments: TrackComment[];
  onClose: () => void;
  onAddComment: (text: string) => void;
}

export function CommentsModal({
  visible,
  trackTitle = 'Track',
  comments,
  onClose,
  onAddComment,
}: CommentsModalProps) {
  const [commentText, setCommentText] = useState('');

  const handleSend = () => {
    if (!commentText.trim()) return;
    onAddComment(commentText);
    setCommentText('');
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

        <View
          className="bg-[#14151d] border-t border-[#23242f] rounded-t-3xl max-h-[82%] min-h-[50%]"
          style={styles.sheet}
        >
          {/* Sheet Pull Handle */}
          <View className="items-center pt-3 pb-2" style={styles.handleContainer}>
            <View className="w-12 h-1 bg-[#2e303f] rounded-full" style={styles.handle} />
          </View>

          {/* Header */}
          <View
            className="flex-row items-center justify-between px-5 pb-3 border-b border-[#20222c]"
            style={styles.header}
          >
            <View className="flex-1 mr-3">
              <Text className="text-white text-base font-bold tracking-tight" style={styles.headerTitle}>
                Comentarios ({comments.length})
              </Text>
              <Text className="text-[#8e8f99] text-xs mt-0.5" numberOfLines={1} style={styles.headerSubtitle}>
                {trackTitle}
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

          {/* Comments List */}
          <ScrollView
            className="flex-1 px-5 py-3"
            style={styles.commentsList}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {comments.length === 0 ? (
              <View className="items-center justify-center py-12" style={styles.emptyContainer}>
                <Text className="text-[#8e8f99] text-sm text-center">
                  Aún no hay comentarios en este track.{'\n'}¡Sé el primero en comentar!
                </Text>
              </View>
            ) : (
              comments.map((c) => {
                const initial = c.authorName ? c.authorName.charAt(0).toUpperCase() : 'U';
                return (
                  <View key={c.id} className="flex-row mb-4" style={styles.commentRow}>
                    {/* User Avatar Initial */}
                    <View
                      className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/40 items-center justify-center mr-3 mt-0.5"
                      style={styles.avatarCircle}
                    >
                      <Text className="text-[#a78bfa] text-xs font-bold" style={styles.avatarInitial}>
                        {initial}
                      </Text>
                    </View>

                    {/* Content */}
                    <View className="flex-1 bg-[#1a1c26] rounded-2xl p-3 border border-[#262835]" style={styles.bubble}>
                      <View className="flex-row items-center justify-between mb-1">
                        <Text className="text-white text-xs font-semibold" style={styles.authorName}>
                          {c.authorName}{' '}
                          <Text className="text-[#8e8f99] text-[11px] font-normal" style={styles.authorHandle}>
                            {c.authorHandle}
                          </Text>
                        </Text>
                        <Text className="text-[#71717a] text-[10px]" style={styles.timeAgo}>
                          {c.createdAt}
                        </Text>
                      </View>
                      <Text className="text-[#d4d4d8] text-xs leading-4" style={styles.commentText}>
                        {c.text}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}
          </ScrollView>

          {/* Add Comment Input Bar */}
          <SafeAreaView edges={['bottom']} className="bg-[#12131b] border-t border-[#20222c] px-4 py-2.5" style={styles.inputArea}>
            <View className="flex-row items-center gap-2" style={styles.inputRow}>
              <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Añade un comentario..."
                placeholderTextColor="#6b7280"
                className="flex-1 bg-[#1a1b24] border border-[#282a38] text-white text-xs rounded-full px-4 py-2.5"
                style={styles.input}
                returnKeyType="send"
                onSubmitEditing={handleSend}
              />
              <Pressable
                onPress={handleSend}
                disabled={!commentText.trim()}
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  commentText.trim() ? 'bg-[#8b5cf6]' : 'bg-[#23242f] opacity-50'
                } active:opacity-80`}
                style={[
                  styles.sendBtn,
                  commentText.trim() ? styles.sendBtnActive : styles.sendBtnDisabled,
                ]}
              >
                <Text className="text-white text-base font-bold ml-0.5">↑</Text>
              </Pressable>
            </View>
          </SafeAreaView>
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
    maxHeight: '80%',
    minHeight: '52%',
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
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#20222c',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#8e8f99',
    fontSize: 12,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1e202b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  commentRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  avatarInitial: {
    color: '#a78bfa',
    fontSize: 12,
    fontWeight: '700',
  },
  bubble: {
    flex: 1,
    backgroundColor: '#1a1c26',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#262835',
  },
  authorName: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  authorHandle: {
    color: '#8e8f99',
    fontSize: 11,
    fontWeight: '400',
  },
  timeAgo: {
    color: '#71717a',
    fontSize: 10,
  },
  commentText: {
    color: '#d4d4d8',
    fontSize: 13,
    lineHeight: 18,
  },
  inputArea: {
    backgroundColor: '#12131b',
    borderTopWidth: 1,
    borderTopColor: '#20222c',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1b24',
    borderWidth: 1,
    borderColor: '#282a38',
    color: '#ffffff',
    fontSize: 13,
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: '#8b5cf6',
  },
  sendBtnDisabled: {
    backgroundColor: '#23242f',
    opacity: 0.5,
  },
});
