import type { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SafeScreen({children}: {children: ReactNode}) {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
});