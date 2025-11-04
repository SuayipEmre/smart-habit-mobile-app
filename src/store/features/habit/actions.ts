import { store } from "@/store/app/store"
import { _setDescription, _setFrequency, _setReminderTime, _setShowPicker, _setTitle } from "."
import { frequencyType } from "@/types/frequencyType"


export const setHabitTitle = (value: string) => store.dispatch(_setTitle(value))
export const setHabitDescription = (value: string) => store.dispatch(_setDescription(value))
export const setHabitFrequency = (value: frequencyType) => store.dispatch(_setFrequency(value))
export const setHabitReminderTime = (value: Date | null | string) => store.dispatch(_setReminderTime(value))
export const setHabitShowPicker = (value: boolean) => store.dispatch(_setShowPicker(value))