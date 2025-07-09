import { useVideoPlayer, VideoView } from 'expo-video';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface VideoViewProps {
  uri: string;
  style?: StyleProp<ViewStyle>;
  useNativeControls?: boolean;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'none';
  shouldPlay?: boolean;
  isLooping?: boolean;
}

const CustomVideoView: React.FC<VideoViewProps> = ({
  uri,
  style,
  useNativeControls = true,
  resizeMode = 'contain',
  shouldPlay = false,
  isLooping = false,
}) => {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = isLooping;
    if (shouldPlay) {
      player.play();
    }
  });

  return (
    <VideoView
      player={player}
      style={style}
    />
  );
};

export default CustomVideoView;
