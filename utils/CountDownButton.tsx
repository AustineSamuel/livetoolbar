import colors from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface CountdownButtonProps {
  checkIn: Date | string;
  checkOut: Date | string;
}

const formatRemainingTime = (from: Date, to: Date): string => {
  const totalMs = to.getTime() - from.getTime();
  if (totalMs <= 0) return "Time's up";

  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || parts.length) parts.push(`${hours}h`);
  if (minutes > 0 || parts.length) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);

  return parts.join(' ');
};

const CountdownButton: React.FC<CountdownButtonProps> = ({ checkIn, checkOut }) => {
  const [now, setNow] = useState(new Date());
  const [showTooltip, setShowTooltip] = useState(false);

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isRunning = now >= inDate && now < outDate;
  const isUpcoming = now < inDate;

  let buttonLabel = 'Waiting...';

  if (isRunning) {
    buttonLabel = formatRemainingTime(now, outDate);
  } else if (isUpcoming) {
    buttonLabel = `Starts in ${formatRemainingTime(now, inDate)}`;
  } else {
    buttonLabel = "Ended";
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
   onPressIn={() => {
    setShowTooltip(true);
  }}
  onPressOut={() => {
    setShowTooltip(false);
  }}
          hitSlop={10}
      >
        <Text style={styles.text}>{buttonLabel}</Text>
      </Pressable>

      {showTooltip && isUpcoming && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>
                      Time remaining until move-in: {formatRemainingTime(now, inDate)}
     </Text>
        </View>
      )}
            {showTooltip && isRunning && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>
         {`You're`} checked in. Checkout in: {formatRemainingTime(now, outDate)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderColor:colors?.primaryColor,
    borderWidth:1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: '#145ca3',
  },
  text: {
    color:colors?.primaryColor,

    fontSize: 18,
    fontWeight:"bold"
  },
  tooltip: {
    marginTop: 8,
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 6,
    position: 'absolute',
    top: -60,
    maxWidth: 250,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CountdownButton;
