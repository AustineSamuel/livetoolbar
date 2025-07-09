import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Skeleton from './skelton';

type Props = {
  urls: string[];
  width?: number;
  height?: number;
  max?:number
};

const GAP = 4;

export const ImageGrid: React.FC<Props> = ({ urls, width, height ,max}) => {
  if(max && urls.length > max) urls = urls.slice(0,max)
  const screenWidth = width ?? Dimensions.get('window').width;
  const containerHeight = height ?? 300;
  const count = urls.length;
  if (count === 1) {
    return (
      <Image
        source={{ uri: urls[0] }}
        style={{
          width: screenWidth,
          height: containerHeight,
          borderRadius: 8,
        }}
        resizeMode="cover"
      />
    );
  }

  if (count === 2) {
    return (
      <View style={{ width: screenWidth, height: containerHeight, gap: GAP }}>
        {urls.slice(0, 2).map((url, index) => (
          <Image
            key={index}
            source={{ uri: url }}
            style={{
              width: screenWidth,
              height: (containerHeight - GAP) / 2,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
        ))}
      </View>
    );
  }

  // For 3 or more images
  return (
    <View
      style={{
        flexDirection: 'row',
        width: screenWidth,
        height: containerHeight,
        gap: GAP,
      }}
    >
      <Image
        source={{ uri: urls[0] }}
        style={{
          width: (screenWidth - GAP) * 0.6,
          height: containerHeight,
          borderRadius: 8,
        }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, justifyContent: 'space-between', gap: GAP }}>
        {urls.slice(1, 3).map((url, index) => (
          <Image
            key={index}
            source={{ uri: url }}
            style={{
              width: (screenWidth - GAP) * 0.4,
              height: (containerHeight - GAP) / 2,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
        ))}
      </View>
    </View>
  );
};




export const ImageGridSkeleton: React.FC<Props> = ({ urls, width, height }) => {
  const screenWidth = width ?? Dimensions.get('window').width;
  const containerHeight = height ?? 300;
  const count = urls.length;

  if (count === 1) {
    return (
      <Image
        source={{ uri: urls[0] }}
        style={{
          width: screenWidth,
          height: containerHeight,
          borderRadius: 8,
        }}
        resizeMode="cover"
      />
    );
  }

  if (count === 2) {
    return (
      <View style={{ width: screenWidth, height: containerHeight, gap: GAP }}>
        {urls.slice(0, 2).map((url, index) => (
          <Skeleton
            key={index}
            style={{
              width: screenWidth,
              height: (containerHeight - GAP) / 2,
              borderRadius: 8,
            }}
          />
        ))}
      </View>
    );
  }

  // For 3 or more images
  return (
    <View
      style={{
        flexDirection: 'row',
        width: screenWidth,
        height: containerHeight,
        gap: GAP,
      }}
    >
      <Image
        source={{ uri: urls[0] }}
        style={{
          width: (screenWidth - GAP) * 0.6,
          height: containerHeight,
          borderRadius: 8,
        }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, justifyContent: 'space-between', gap: GAP }}>
        {urls.slice(1, 3).map((url, index) => (
          <Image
            key={index}
            source={{ uri: url }}
            style={{
              width: (screenWidth - GAP) * 0.4,
              height: (containerHeight - GAP) / 2,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
        ))}
      </View>
    </View>
  );
};
