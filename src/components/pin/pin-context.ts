import { useContext } from '@/utils/useContext'
import { provide, type ComputedRef, type Ref } from 'vue'

export type PinContext = {
	pinRefs: Array<HTMLInputElement>
	pin: Readonly<Ref<readonly string[]>>
	pinSize: Readonly<Ref<number>>
	dataCompleted: Readonly<Ref<boolean>>
	mask?: Ref<boolean>
	placeholder?: Ref<string | undefined>
	labelFor: ComputedRef<string>
	handleComplete: () => void
	handlePinChange: (value: string, index: number) => void
	handleInputElementChange: (el: HTMLInputElement | null, index: number) => void
	handleFocusIndexChange: (index: number) => void
}

export const definePinContext = (provider: PinContext) => provide('pinInputContext', provider)
export const usePinContext = () => useContext<PinContext>('pinInputContext', 'PinRoot')
