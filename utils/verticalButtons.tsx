import React, { memo, useEffect, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, StyleProp, ViewStyle, TextStyle, ScrollView } from "react-native";

export interface ButtonItem {
  name: string;
  active: boolean;
  clickEvent: () => void;
}

interface VerticalButtonListProps {
  items: ButtonItem[];
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  activeButtonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
  scrollPoint?: number |'left' |'right'

}

const VerticalButtonList: React.FC<VerticalButtonListProps> = ({
  items,
  containerStyle,
  buttonStyle,
  activeButtonStyle,
  textStyle,
  activeTextStyle,
  scrollPoint
}) => {
  const [activeIndex, setActiveIndex] =useState<number>(() => {
    const idx = items.findIndex((i) => i.active);
    return idx >= 0 ? idx : 0;
  });


  useEffect(() => {
    setActiveIndex(() => {
        const idx = items.findIndex((i:any) => i.active);
        return idx >= 0 ? idx: 0;
      })
  },[items])

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollRef = useRef<ScrollView>(null);

  // Helper function to scroll based on the target parameter
  const scrollTo = (target: number | 'left' | 'right') => {
      if(target === 'right') target= scrollRef.current?.getScrollableNode().getLayout().width;
    console.log("Scrolling to ...",target);
    if (!scrollRef.current) return;
    if (target === 'left') {
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    } else if (target === 'right') {
      scrollRef.current.scrollToEnd({ animated: true });
    } else {
      scrollRef.current.scrollTo({ x: target, y: 0, animated: true });
    }
  }


  useEffect(()=>{

    scrollPoint && scrollTo(scrollPoint)
  },[scrollPoint])
  return (
    <ScrollView ref={scrollViewRef}   horizontal showsHorizontalScrollIndicator={false} style={[styles.container, containerStyle]}>      
      {items.map((item, idx) => {
        const isActive = idx === activeIndex;
        return (
          <TouchableOpacity
            key={item.name}
            style={[
              styles.button,
              buttonStyle,
              isActive && styles.activeButton,
              isActive && activeButtonStyle,
            ]}
            onPress={() => {
              setActiveIndex(idx);
              item.clickEvent();
            }}
          >
            <Text
              style={[
                styles.text,
                textStyle,
                isActive && styles.activeText,
                isActive && activeTextStyle,
              ]}
            >
            {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}

      <View style={{width:10,height:0}}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    gap:7,
    height:60,
    minHeight:60,
    maxHeight:60,
    marginLeft:-8
    // backgroundColor:"REd"
  },
  button: {
    paddingVertical: 5,
    alignSelf:"flex-start",
    paddingHorizontal: 16,
    marginBottom: 8,
    marginLeft:7,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default memo(VerticalButtonList);
