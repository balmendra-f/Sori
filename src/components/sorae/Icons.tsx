import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Sorae Brand Waveform Logo (5 vertical symmetrical bars)
 */
export function LogoWaveIcon({ size = 26, color = '#9359ff' }: IconProps) {
  const barWidth = Math.max(2.5, size * 0.12);
  const gap = Math.max(2.5, size * 0.09);
  const heights = [0.38, 0.72, 1.0, 0.72, 0.38];

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: size }}>
      {heights.map((h, i) => (
        <View
          key={i}
          style={{
            width: barWidth,
            height: size * h,
            backgroundColor: color,
            borderRadius: barWidth / 2,
            marginHorizontal: gap / 2,
          }}
        />
      ))}
    </View>
  );
}

/**
 * Search Magnifying Glass Icon
 */
export function SearchIcon({ size = 16, color = '#8e8f99' }: IconProps) {
  const circleSize = size * 0.72;
  const borderWidth = Math.max(1.8, size * 0.12);

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          borderWidth: borderWidth,
          borderColor: color,
          position: 'absolute',
          top: 1,
          left: 1,
        }}
      />
      <View
        style={{
          width: size * 0.35,
          height: borderWidth,
          backgroundColor: color,
          borderRadius: borderWidth / 2,
          position: 'absolute',
          bottom: 2,
          right: 1,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
}

/**
 * Verified Creator Badge (Purple pill/circle with white checkmark)
 */
export function VerifiedBadge({ size = 14 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#8b5cf6',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: '#ffffff',
          fontSize: size * 0.75,
          lineHeight: size,
          fontWeight: '900',
          textAlign: 'center',
        }}
      >
        ✓
      </Text>
    </View>
  );
}

/**
 * Play Triangle Icon
 */
export function PlayIcon({ size = 16, color = '#ffffff' }: IconProps) {
  const w = size * 0.7;
  const h = size * 0.8;

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: w,
          borderTopWidth: h / 2,
          borderBottomWidth: h / 2,
          borderLeftColor: color,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          marginLeft: 2.5,
        }}
      />
    </View>
  );
}

/**
 * Pause Double Bar Icon
 */
export function PauseIcon({ size = 16, color = '#ffffff' }: IconProps) {
  const barW = Math.max(2.5, size * 0.22);
  const barH = size * 0.75;
  const gap = size * 0.22;

  return (
    <View
      style={{
        width: size,
        height: size,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: gap,
      }}
    >
      <View
        style={{
          width: barW,
          height: barH,
          backgroundColor: color,
          borderRadius: 2,
        }}
      />
      <View
        style={{
          width: barW,
          height: barH,
          backgroundColor: color,
          borderRadius: 2,
        }}
      />
    </View>
  );
}

/**
 * Heart (Like) Icon
 */
export function HeartIcon({ size = 16, color = '#8e8f99', filled = false }: IconProps & { filled?: boolean }) {
  return (
    <Text
      style={{
        fontSize: size,
        color: color,
        lineHeight: size + 2,
      }}
    >
      {filled ? '♥' : '♡'}
    </Text>
  );
}

/**
 * Comment Speech Bubble Icon
 */
export function CommentIcon({ size = 16, color = '#8e8f99' }: IconProps) {
  const w = size * 0.95;
  const h = size * 0.75;
  const borderWidth = Math.max(1.6, size * 0.1);

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: w,
          height: h,
          borderRadius: 4,
          borderWidth: borderWidth,
          borderColor: color,
        }}
      />
      {/* Speech pointer */}
      <View
        style={{
          position: 'absolute',
          bottom: 2,
          left: 2,
          width: 0,
          height: 0,
          borderLeftWidth: 4,
          borderBottomWidth: 4,
          borderLeftColor: color,
          borderBottomColor: 'transparent',
          transform: [{ rotate: '-45deg' }],
        }}
      />
    </View>
  );
}

/**
 * Remix / Shuffle Crossover Arrows Icon
 */
export function RemixIcon({ size = 14, color = '#ffffff' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 0.95, fontWeight: '700', transform: [{ rotate: '45deg' }] }}>
        ⇄
      </Text>
    </View>
  );
}

/**
 * Sliders / Equalizer ("Usar") Icon
 */
export function SlidersIcon({ size = 15, color = '#ffffff' }: IconProps) {
  const lineH = 1.5;
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'space-between',
        paddingVertical: 1,
      }}
    >
      {/* Row 1 */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: size * 0.3, height: lineH, backgroundColor: color }} />
        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: color }} />
        <View style={{ flex: 1, height: lineH, backgroundColor: color }} />
      </View>
      {/* Row 2 */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, height: lineH, backgroundColor: color }} />
        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: color }} />
        <View style={{ width: size * 0.3, height: lineH, backgroundColor: color }} />
      </View>
      {/* Row 3 */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: size * 0.55, height: lineH, backgroundColor: color }} />
        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: color }} />
        <View style={{ flex: 1, height: lineH, backgroundColor: color }} />
      </View>
    </View>
  );
}

/**
 * Close (✕) Icon
 */
export function CloseIcon({ size = 14, color = '#8e8f99' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size, fontWeight: '500', lineHeight: size + 2 }}>
        ✕
      </Text>
    </View>
  );
}

/**
 * Plus (+) Icon for Center FAB
 */
export function PlusIcon({ size = 24, color = '#ffffff' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 1.1, fontWeight: '400', lineHeight: size + 4 }}>
        +
      </Text>
    </View>
  );
}

/**
 * Feed Wave Tab Icon (3 vertical bars)
 */
export function FeedWaveIcon({ size = 20, color = '#8b5cf6' }: IconProps) {
  const barW = Math.max(2.5, size * 0.12);
  const gap = Math.max(2.5, size * 0.12);
  const heights = [0.55, 1.0, 0.4];

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: size }}>
      {heights.map((h, i) => (
        <View
          key={i}
          style={{
            width: barW,
            height: size * h,
            backgroundColor: color,
            borderRadius: barW / 2,
            marginHorizontal: gap / 2,
          }}
        />
      ))}
    </View>
  );
}

/**
 * User Silhouette Icon (Perfil tab)
 */
export function UserIcon({ size = 20, color = '#8e8f99' }: IconProps) {
  const headSize = size * 0.42;
  const bodyW = size * 0.85;
  const bodyH = size * 0.4;

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 1,
      }}
    >
      <View
        style={{
          width: headSize,
          height: headSize,
          borderRadius: headSize / 2,
          borderWidth: 1.8,
          borderColor: color,
        }}
      />
      <View
        style={{
          width: bodyW,
          height: bodyH,
          borderTopLeftRadius: bodyW / 2,
          borderTopRightRadius: bodyW / 2,
          borderWidth: 1.8,
          borderBottomWidth: 0,
          borderColor: color,
          marginTop: 2,
        }}
      />
    </View>
  );
}

/**
 * Settings Gear Icon
 */
export function SettingsIcon({ size = 20, color = '#ffffff' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 0.95, lineHeight: size }}>
        ⚙
      </Text>
    </View>
  );
}

/**
 * Share Arrow Icon
 */
export function ShareIcon({ size = 18, color = '#ffffff' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 0.95, lineHeight: size }}>
        ↗
      </Text>
    </View>
  );
}

/**
 * Edit Pencil Icon
 */
export function EditIcon({ size = 16, color = '#ffffff' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 0.9, lineHeight: size }}>
        ✎
      </Text>
    </View>
  );
}

/**
 * Chevron Down Icon (Player minimize)
 */
export function ChevronDownIcon({ size = 22, color = '#ffffff' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 1.1, fontWeight: '700', lineHeight: size }}>
        ⌄
      </Text>
    </View>
  );
}

/**
 * Previous Track Icon (|◀)
 */
export function PreviousIcon({ size = 20, color = '#ffffff' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 0.9, fontWeight: '700', lineHeight: size }}>
        |◀
      </Text>
    </View>
  );
}

/**
 * Next Track Icon (▶|)
 */
export function NextIcon({ size = 20, color = '#ffffff' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 0.9, fontWeight: '700', lineHeight: size }}>
        ▶|
      </Text>
    </View>
  );
}

/**
 * Shuffle Icon
 */
export function ShuffleIcon({ size = 18, color = '#8e8f99' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 0.95, fontWeight: '700' }}>
        ⇄
      </Text>
    </View>
  );
}

/**
 * Repeat / Loop Icon
 */
export function RepeatIcon({ size = 18, color = '#8e8f99' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 0.95, fontWeight: '700' }}>
        ↻
      </Text>
    </View>
  );
}

/**
 * More Options Horizontal Icon (⋯)
 */
export function MoreHorizontalIcon({ size = 20, color = '#ffffff' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 1.2, fontWeight: '700', lineHeight: size }}>
        ⋯
      </Text>
    </View>
  );
}

/**
 * Speaker / Volume Icon
 */
export function VolumeIcon({ size = 18, color = '#8e8f99' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 0.95, lineHeight: size }}>
        🔊
      </Text>
    </View>
  );
}

/**
 * Mail / Email Icon
 */
export function MailIcon({ size = 18, color = '#8e8f99' }: IconProps) {
  return (
    <View
      style={{
        width: size,
        height: size * 0.72,
        borderRadius: 3,
        borderWidth: 1.6,
        borderColor: color,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <View
        style={{
          width: size * 0.7,
          height: size * 0.7,
          borderBottomWidth: 1.6,
          borderRightWidth: 1.6,
          borderColor: color,
          transform: [{ rotate: '45deg' }, { translateY: -size * 0.45 }],
        }}
      />
    </View>
  );
}

/**
 * Lock / Security Icon
 */
export function LockIcon({ size = 18, color = '#8e8f99' }: IconProps) {
  const shackleW = size * 0.52;
  const shackleH = size * 0.45;
  const bodyW = size * 0.78;
  const bodyH = size * 0.52;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Shackle */}
      <View
        style={{
          width: shackleW,
          height: shackleH,
          borderTopLeftRadius: shackleW / 2,
          borderTopRightRadius: shackleW / 2,
          borderWidth: 1.6,
          borderBottomWidth: 0,
          borderColor: color,
          marginBottom: -1,
        }}
      />
      {/* Body */}
      <View
        style={{
          width: bodyW,
          height: bodyH,
          borderRadius: 3,
          backgroundColor: color,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: 2.5,
            height: 4,
            borderRadius: 1,
            backgroundColor: '#0d0e12',
          }}
        />
      </View>
    </View>
  );
}

/**
 * Eye Icon (Show password)
 */
export function EyeIcon({ size = 18, color = '#8e8f99' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: size * 0.9,
          height: size * 0.55,
          borderTopLeftRadius: size * 0.5,
          borderTopRightRadius: size * 0.5,
          borderBottomLeftRadius: size * 0.5,
          borderBottomRightRadius: size * 0.5,
          borderWidth: 1.6,
          borderColor: color,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: size * 0.28,
            height: size * 0.28,
            borderRadius: (size * 0.28) / 2,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  );
}

/**
 * Eye Off Icon (Hide password)
 */
export function EyeOffIcon({ size = 18, color = '#8e8f99' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: size * 0.9,
          height: size * 0.55,
          borderTopLeftRadius: size * 0.5,
          borderTopRightRadius: size * 0.5,
          borderBottomLeftRadius: size * 0.5,
          borderBottomRightRadius: size * 0.5,
          borderWidth: 1.6,
          borderColor: color,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: size * 0.24,
            height: size * 0.24,
            borderRadius: (size * 0.24) / 2,
            backgroundColor: color,
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          width: size * 1.1,
          height: 1.6,
          backgroundColor: color,
          transform: [{ rotate: '-45deg' }],
        }}
      />
    </View>
  );
}

/**
 * Arrow Left / Back Icon
 */
export function ArrowLeftIcon({ size = 20, color = '#ffffff' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 1.2, fontWeight: '600', lineHeight: size + 2 }}>
        ‹
      </Text>
    </View>
  );
}

/**
 * Alert Circle Icon (Error badge)
 */
export function AlertCircleIcon({ size = 18, color = '#ef4444' }: IconProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.6,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color, fontSize: size * 0.7, fontWeight: '900', lineHeight: size }}>
        !
      </Text>
    </View>
  );
}

/**
 * Check Circle Icon (Success badge)
 */
export function CheckCircleIcon({ size = 18, color = '#10b981' }: IconProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#ffffff', fontSize: size * 0.65, fontWeight: '900', lineHeight: size }}>
        ✓
      </Text>
    </View>
  );
}

/**
 * Log Out / Exit Icon
 */
export function LogOutIcon({ size = 18, color = '#ef4444' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 0.9, fontWeight: '700', lineHeight: size }}>
        →]
      </Text>
    </View>
  );
}
