import type { ReactNode } from 'react'
import { View } from 'react-native'

export const StopPropagation = ({ children }: { children: ReactNode }) => {
	return (
		<View onStartShouldSetResponder={() => true} onTouchEnd={(e) => e.stopPropagation()}>
			{children}
		</View>
	)
}
