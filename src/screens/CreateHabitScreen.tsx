import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Platform,
    Alert,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import HabitInput from "@/components/HabitInput";
import { useCreateHabitMutation } from "@/services/HabitService";
import SelectFrequency from "@/components/SelectFrequency";
import SelectReminderTime from "@/components/SelectReminderTime";
import { formatTime } from "@/utils/formatTime";

const frequencyData = ["daily", "weekly", "monthly"]

const CreateHabitScreen = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState("daily");
    const [reminderTime, setReminderTime] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const [isSelectFrequency, setIsSelectFrequency] = useState(false)
    const { height } = Dimensions.get("window");

    const [sendCreateHabitReq, { isLoading, isError }] = useCreateHabitMutation()

    const handleTimeChange = (
        event: DateTimePickerEvent,
        selectedDate?: Date
    ) => {
        setShowPicker(false);
        if (selectedDate) {
            setReminderTime(selectedDate);
        }
    };



    const handleCreateCommit = async () => {
        // Eğer reminderTime seçildiyse stringe çevir
        const formattedTime = formatTime(reminderTime)

        const values = {
            title,
            description,
            frequency,
            reminderTime: formattedTime,
        };

        console.log("reminder time", values.reminderTime);

        try {
            await sendCreateHabitReq(values).unwrap();
            Alert.alert("SmartHabit", "Habit was successfully created");
        } catch (error) {
            console.log("error", error);
            Alert.alert("SmartHabit", (error as any)?.data?.message || "Something went wrong");
        }
    };


    return (
        <View className="flex-1 bg-white">
            <View className="w-[90%] self-center mt-5">
                {/* Title */}
                <View className="w-[90%] self-center">
                    <HabitInput
                        value={title}
                        setValue={setTitle}
                        placeholder="title"
                        height={height}
                        title="Habit Title"
                        isMultiline={false}
                    />

                    {/* Description */}
                    <HabitInput
                        value={description}
                        setValue={setDescription}
                        placeholder="description"
                        height={height}
                        title="Habit Description"
                        isMultiline={true}
                    />

                    <SelectFrequency
                        frequency={frequency}
                        setFrequency={setFrequency}
                    />

                    {/* Reminder Time */}
                    <SelectReminderTime
                        reminderTime={reminderTime}
                        setReminderTime={setReminderTime}
                        setShowPicker={setShowPicker}
                        showPicker={showPicker}
                    />

                </View>


                <View className="w-[90%]   self-center mt-5">
                    <TouchableOpacity
                        className="bg-[#5B5FEE] w-1/2 flex py-2 rounded-xl items-center justify-center self-end"
                        onPress={handleCreateCommit}
                    >
                        <Text className="text-white font-bold text-lg">Create Habit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CreateHabitScreen;

const styles = StyleSheet.create({});
