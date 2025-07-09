import { width } from '@/glob/style';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';

export const ShimmerLine: React.FC<{ style?: ViewStyle, duration?: number,swimingLineContent?:React.ReactNode }> = ({ style, duration,swimingLineContent }) => {
    const shimmerAnim = useRef(new Animated.Value(-1)).current;

    useEffect(() => {
        const animate = () => {
            shimmerAnim.setValue(-1);
            Animated.timing(shimmerAnim, {
                toValue: 1,
                duration: duration || 1000,
                useNativeDriver: true,
            }).start(() => {
                // Repeat after 5 seconds
                setTimeout(animate, 5000);
            });
        };
        animate();
    }, []);

    const translateX = shimmerAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: [-100, width],
    });

    return (
        <View style={[styles.container, style]}>
            <View style={styles.line} />
            <Animated.View
                style={[
                    styles.shimmer,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            >{swimingLineContent}</Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 4,
        backgroundColor: '#ccc',
        overflow: 'hidden',
        borderRadius: 2,
        marginVertical: 10,
    },
    line: {
        flex: 1,
        backgroundColor: '#ccc',
    },
    shimmer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '30%',
        height: '100%',
        backgroundColor: 'white',
        opacity: 0.6,
        borderRadius: 2,
    },
});
