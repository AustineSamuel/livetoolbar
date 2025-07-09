import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableWithoutFeedback,
} from 'react-native';
import ImageViewerModal from './ViewImageModal';

const { width, height } = Dimensions.get('window');

interface SlidingImageProps {
  images: string[];
  styles?: React.CSSProperties | any;
}

const SlidingImage: React.FC<SlidingImageProps> = ({ images, styles }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <View style={[defaultStyles.container, styles]}>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <Image
              source={{ uri: item }}
              style={[defaultStyles.image, styles]}
              resizeMode="cover"
            />
          </TouchableWithoutFeedback>
        )}
      />

      <View style={defaultStyles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              defaultStyles.dot,
              activeIndex === index && defaultStyles.activeDot,
            ]}
          />
        ))}
      </View>

      <ImageViewerModal
        visible={modalVisible}
        image={images[activeIndex]}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};
const defaultStyles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#000',
  },
  image: {
    width,
    height,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  activeDot: {
    backgroundColor: '#fff',
  },
});

export default SlidingImage;
