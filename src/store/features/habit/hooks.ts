import { RootState } from "@/store/app/store";
import { useSelector } from "react-redux";

export const useHabitTitle = () => useSelector((state : RootState) =>  state.habitSlice.title);
export const useHabitDescription = () => useSelector((state : RootState) => state.habitSlice.description)
export const useHabitFrequency = () => useSelector((state : RootState) => state.habitSlice.frequency)
export const useHabitReminderTime = () => useSelector((state : RootState) => state.habitSlice.reminderTime)
export const useHabitShowPicker = () => useSelector((state : RootState) => state.habitSlice.showPicker)