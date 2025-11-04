import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type Props = {
    showPicker : boolean,
    setShowPicker : (value : boolean) => void,
    reminderTime : Date | null | string,
    setReminderTime : (value:string) => void

}
const SelectReminderTime : React.FC<Props> = ({setShowPicker, showPicker, reminderTime, setReminderTime}) => {
    
    const handleTimeChange = (
        event: DateTimePickerEvent,
        selectedDate?: Date
    ) => {
        setShowPicker(false);
        if (selectedDate) {
            setReminderTime(selectedDate.toISOString());
        }
    };

    return (
        <View className="w-full self-center mt-5">
            <Text className="font-semibold mb-2 text-[#F25D07]">
                Reminder Time
            </Text>

            <TouchableOpacity
                onPress={() => setShowPicker(true)}
                className="border px-3 py-4 rounded-md bg-gray-50"
            >
                <Text className="text-gray-700">
                    {reminderTime
                        ? (new Date(reminderTime)).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })
                        : "Select reminder time"}
                </Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                value={reminderTime ? new Date(reminderTime) : new Date()} 
                    mode="time"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={handleTimeChange}
                    is24Hour={true}
                />
            )}
        </View>
    )
}

export default SelectReminderTime
