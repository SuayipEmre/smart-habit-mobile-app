import { frequencyType } from "@/types/frequencyType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";




type initialStateTypes = {
  title: string,
  description: string,
  frequency: frequencyType,
  reminderTime: Date | null | string,
  showPicker: boolean,
}

const initialState: initialStateTypes = {
  title: '',
  description: '',
  frequency: 'daily',
  reminderTime: null,
  showPicker: false,
}
const HabitSlice = createSlice({
  name: 'habit slice',
  initialState,
  reducers: {
    _setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    _setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    _setFrequency: (state, action: PayloadAction<frequencyType>) => {
      state.frequency = action.payload
    },
    _setReminderTime: (state, action: PayloadAction<Date | null | string>) => {
      state.reminderTime = action.payload
    },
    _setShowPicker: (state, action: PayloadAction<boolean>) => {
      state.showPicker = action.payload
    }
  }
})

export const {
  _setTitle,
  _setDescription,
  _setFrequency,
  _setReminderTime,
  _setShowPicker
} = HabitSlice.actions
export default HabitSlice.reducer
