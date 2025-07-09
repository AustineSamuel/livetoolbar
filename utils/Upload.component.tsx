import * as ImagePicker from 'expo-image-picker';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { generateRandomString } from './random';
import colors from '@/constants/Colors';

interface MediaItem {
  uri: string;
  title: string;
  key: string; // unique identifier for animation
}

interface MediaUploaderProps {
  value: MediaItem[];
  onChange: (media: MediaItem[]) => void;
}

const MediaUploader = ({ value, onChange }: MediaUploaderProps) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(value || []);

  const animations = useRef<Record<string, Animated.Value>>(Object.create(null)).current;

  const createAnim = (key: string) => {
    const anim = new Animated.Value(0);
    animations[key] = anim;
    Animated.timing(anim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const addNewItem = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      // quality: 100,
    }).then((result) => {
      if (!result.canceled) {
        const key = Date.now().toString()+generateRandomString(10);
        const newItem: MediaItem[] = result.assets.map((asset) => ({ uri: asset.uri as string, title: '', key }));
        
        createAnim(key);
        const updated = [...mediaItems, ...newItem];
        setMediaItems(updated);
        onChange(updated);
      }
    });
  };

  const updateTitle = (index: number, newTitle: string) => {
    const updated = [...mediaItems];
    updated[index].title = newTitle;
    setMediaItems(updated);
    onChange(updated);
  };

  const removeItem = (index: number) => {
    const key = mediaItems[index].key;
    const anim = animations[key];
    if (!anim) return;

    Animated.timing(anim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      const updated = mediaItems.filter((_, i) => i !== index);
      delete animations[key];
      setMediaItems(updated);
      onChange(updated);
    });
  };

  const replaceItem = (index: number) => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      quality: 1,
    }).then((result) => {
      if (!result.canceled) {
        const updated = [...mediaItems];
        updated[index].uri = result.assets[0].uri;
        setMediaItems(updated);
        onChange(updated);
      }
    });
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.mediaPicker,
          mediaItems.length > 0 && { height: 90, borderRadius: 10 },
        ]}
        onPress={addNewItem}
      >
        <Text
          style={[
            styles.uploadText,
            mediaItems.length > 0 && { borderRadius: 30 },
          ]}
        >
          Tap to select image or video
        </Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.list}>
        {mediaItems.map((item: MediaItem,i:number)=><RenderPreview key={i}  item={item} index={i} animations={animations} updateTitle={updateTitle} removeItem={removeItem} replaceItem={replaceItem} />)}
      </ScrollView>
    </View>
  );
};

export default MediaUploader;

  export const RenderPreview: React.FC<{
    item: MediaItem;
    index: number;
    animations: Record<string, Animated.Value>;
    updateTitle: (index: number, newTitle: string) => void;
    removeItem: (index: number) => void;
    replaceItem: (index: number) => void;
  }> = ({ item, index, animations, updateTitle, removeItem, replaceItem }) => {
     const player = useVideoPlayer({ uri: item.uri }, player => {
    player.loop = true;
    player.play();
  });
    if (!animations[item.key]) {
      animations[item.key] = new Animated.Value(0);
      Animated.timing(animations[item.key], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    const animStyle = {
      opacity: animations[item.key],
      transform: [
        {
          translateY: animations[item.key].interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          }),
        },
      ],
    };

    const isVideo = item.uri.endsWith('.mp4') || item.uri.includes('video');
 
    return (
      <Animated.View key={item.key} style={[styles.item, animStyle]}>
        {isVideo ? (
      
           <VideoView  style={styles.media} player={player} allowsFullscreen allowsPictureInPicture />
        ) : (
          <Image source={{ uri: item.uri }} style={styles.media} />
        )}

        <TextInput
          placeholder="Enter title"
          value={item.title}
          onChangeText={(text) => updateTitle(index, text)}
          style={styles.input}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => replaceItem(index)}
            style={styles.replaceButton}
          >
            <Text style={styles.replaceText}>Replace</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => removeItem(index)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  mediaPicker: {
    height: 150,
    borderRadius: 12,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 16,
    padding: 12,
    backgroundColor: '#cfcfe060',
    borderRadius: 5,
    paddingVertical: 15,
    fontWeight: '500',
    color: colors?.primaryColor,
  },
  list: {
    gap: 16,
  },
  item: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  input: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  replaceButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors?.primaryColor,
    borderRadius: 6,
  },
  replaceText: {
    color: colors?.primaryColor,
    fontWeight: '500',
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#ffe6e6',
    borderRadius: 6,
  },
  deleteText: {
    color: '#f00',
    fontWeight: '500',
  },
});
