import React, { useState } from 'react';
import { Modal, View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NowPlayingTrack } from '../types';
import { useAudioPlayer } from '../AudioContext';
import { PlayerTopBar } from './PlayerTopBar';
import { PlayerArtwork } from './PlayerArtwork';
import { PlayerTrackInfo } from './PlayerTrackInfo';
import { PlayerScrubber } from './PlayerScrubber';
import { PlayerStemSelector } from './PlayerStemSelector';
import { PlayerControls } from './PlayerControls';
import { PlayerBottomActions } from './PlayerBottomActions';

interface FullPlayerModalProps {
  visible: boolean;
  track: NowPlayingTrack | null;
  onClose: () => void;
  onTogglePlay: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function FullPlayerModal({
  visible,
  track,
  onClose,
  onTogglePlay,
  onNext,
  onPrevious,
}: FullPlayerModalProps) {
  const {
    isShuffle,
    isRepeat,
    toggleShuffle,
    toggleRepeat,
    activeStem,
    setActiveStem,
    seekTo,
    toggleLike,
    feedTracks,
  } = useAudioPlayer();

  if (!track) return null;

  // Calculate live timestamps
  const durationSec = track.durationSeconds || 45;
  const currentSec = Math.min(durationSec, Math.floor((track.progress || 0) * durationSec));
  const currentMin = Math.floor(currentSec / 60);
  const currentRemSec = currentSec % 60;
  const currentTime = `${currentMin}:${currentRemSec < 10 ? '0' : ''}${currentRemSec}`;

  const totalMin = Math.floor(durationSec / 60);
  const totalRemSec = durationSec % 60;
  const totalDuration = `${totalMin}:${totalRemSec < 10 ? '0' : ''}${totalRemSec}`;

  const currentTrackMeta = feedTracks.find((t) => t.id === track.id);
  const isLiked = currentTrackMeta?.isLiked ?? true;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 bg-[#0d0e12]" style={styles.modalRoot}>
        <SafeAreaView edges={['top', 'bottom']} className="flex-1" style={styles.safeArea}>
          {/* Top Bar with Minimize Button */}
          <PlayerTopBar
            sessionTitle="SORAE MASTER SESSION"
            onMinimize={onClose}
            onMore={() => {}}
          />

          <ScrollView
            className="flex-1"
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Artwork Cover */}
            <PlayerArtwork
              stemTag={`${activeStem} • 24-Bit Studio Audio`}
              qualityBadge="HQ LOSSLESS"
            />

            {/* Track Info & Like Button */}
            <PlayerTrackInfo
              title={track.title}
              artist={track.subtitle}
              bpm={track.bpm}
              musicalKey="F# Minor"
              genre={currentTrackMeta?.genre || 'Electronic'}
              isLiked={isLiked}
              onToggleLike={() => {
                if (track.id) toggleLike(track.id);
              }}
            />

            {/* Waveform Scrubber with Live Progress and Seeking */}
            <PlayerScrubber
              progress={track.progress}
              currentTime={currentTime}
              totalDuration={totalDuration}
              onSeek={(r) => seekTo(r)}
            />

            {/* Stem Audio Selector */}
            <PlayerStemSelector
              activeStem={activeStem}
              onSelectStem={setActiveStem}
            />

            {/* Main Playback Controls */}
            <PlayerControls
              isPlaying={track.isPlaying}
              isShuffle={isShuffle}
              isRepeat={isRepeat}
              onTogglePlay={onTogglePlay}
              onPrevious={onPrevious}
              onNext={onNext}
              onToggleShuffle={toggleShuffle}
              onToggleRepeat={toggleRepeat}
            />
          </ScrollView>

          {/* Bottom Output & Action Bar */}
          <PlayerBottomActions
            deviceName="AirPlay / Auriculares Bluetooth"
            onDevicePress={() => {}}
            onRemixPress={() => {}}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    backgroundColor: '#0d0e12',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0d0e12',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
});
