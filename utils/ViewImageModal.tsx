import React from 'react';
import {
  Modal,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  Share,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface ImageViewerModalProps {
  visible: boolean;
  image: string;
  onClose: () => void;
}

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  visible,
  image,
  onClose,
}) => {
  const handleSave = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access gallery is required!');
        return;
      }

      const fileUri = FileSystem.documentDirectory + 'temp.jpg';
      await FileSystem.downloadAsync(image, fileUri);
      await MediaLibrary.saveToLibraryAsync(fileUri);
      alert('Image saved to gallery!');
    } catch (err) {
      alert('Failed to save image');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this image!',
        url: image,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <Image
          source={{ uri: image }}
          style={styles.fullImage}
          resizeMode="contain"
        />
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={handleSave}>
            <Ionicons name="download-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Ionicons name="share-social-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  fullImage: {
    width: width,
    height: height,
  },
  topBar: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 40,
  },
});

export default ImageViewerModal;
