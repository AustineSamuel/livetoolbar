import React, { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar } from 'react-native-paper';

const ImageAvatar = ({
  source,
  size = 50,
  imageStyle = {},
}: {
  source: any;
  size?: number;
  imageStyle?: object;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setVisible(true)}>
        <Avatar.Image source={source} size={size} style={imageStyle} />
      </Pressable>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalBackground}>
            <Image source={source} resizeMode="contain" style={styles.fullImage} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '70%',
    borderRadius: 10,
  },
});

export default ImageAvatar;
