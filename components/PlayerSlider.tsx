import React, { useEffect, useState } from 'react';
import { colors, fontSize } from '@/constants/tokens'
import { formatTime } from '@/helpers/miscellaneous'
import { StyleSheet, Text, View, type ViewProps } from 'react-native'
import Slider from '@react-native-community/slider';
import { useAudioQueueStore } from '@/store/useAudioQueueStore';
import { seekTo, usePlayerStatus } from '@/store/player-service';


export const PlayerSlider = ({ style }: ViewProps) => {
	const { queue } = useAudioQueueStore();
	const { position, duration } = usePlayerStatus();

	const trackElapsedTime = formatTime(position)
	const trackRemainingTime = formatTime(Math.max(0, duration - position))

	return (
		<View style={style}>
			<Slider

                style={{width: 300 , height: 40}}
                value={position}
                minimumValue={0}
                maximumValue={duration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor= {colors.maximumTrackTintColor}
				onSlidingComplete={async (value: number) => {
					
						seekTo(value);
					
				}}
			/>

			<View style={styles.timeRow}>
				<Text style={styles.timeText}>{trackElapsedTime}</Text>

				<Text style={styles.timeText}>
					{'-'} {trackRemainingTime}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	timeRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		marginTop: 0,
	},
	timeText: {
		color: colors.text,
		opacity: 0.75,
		fontSize: fontSize.xs,
		letterSpacing: 0.7,
		fontWeight: '500',
	},
})
