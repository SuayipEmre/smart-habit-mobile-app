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
import { useHabitDescription, useHabitFrequency, useHabitReminderTime, useHabitShowPicker, useHabitTitle } from "@/store/features/habit/hooks";
import { setHabitDescription, setHabitFrequency, setHabitReminderTime, setHabitShowPicker, setHabitTitle } from "@/store/features/habit/actions";
import CenteredView from "@/components/layouts/CenteredView";

const frequencyData = ["daily", "weekly", "monthly"]

const CreateHabitScreen = () => {
    const { height } = Dimensions.get("window");

    const [sendCreateHabitReq, { isLoading, isError }] = useCreateHabitMutation()

    const title = useHabitTitle()
    const description = useHabitDescription()
    const frequency = useHabitFrequency()
    const reminderTime = useHabitReminderTime()
    const showPicker = useHabitShowPicker()

    const handleCreateHabit = async () => {
        // Eğer reminderTime seçildiyse stringe çevir
        const formattedTime = reminderTime
        ? formatTime(new Date(reminderTime)) // ISO → Date
        : null;

        const values = {
            title,
            description,
            frequency,
            reminderTime: formattedTime,
        };


        try {
            await sendCreateHabitReq(values).unwrap();
            setHabitTitle("");
            setHabitDescription("");
            setHabitFrequency("daily");
            setHabitReminderTime(null);
            Alert.alert("SmartHabit", "Habit was successfully created");
        } catch (error) {
            Alert.alert("SmartHabit", (error as any)?.data?.message || "Something went wrong");
        }
    };


    return (
        <View className="flex-1 bg-white">
            <CenteredView >
                {/* Title */}
                <View className="w-[90%] self-center">
                    <HabitInput
                        value={title}
                        setValue={setHabitTitle}
                        placeholder="title"
                        height={height}
                        title="Habit Title"
                        isMultiline={false}
                    />

                    {/* Description */}
                    <HabitInput
                        value={description}
                        setValue={setHabitDescription}
                        placeholder="description"
                        height={height}
                        title="Habit Description"
                        isMultiline={true}
                    />

                    <SelectFrequency
                        frequency={frequency}
                        setFrequency={setHabitFrequency}
                    />

                    {/* Reminder Time */}
                    <SelectReminderTime
                        reminderTime={reminderTime}
                        setReminderTime={setHabitReminderTime}
                        setShowPicker={setHabitShowPicker}
                        showPicker={showPicker}
                    />

                </View>


                <View className="w-[90%]   self-center mt-5">
                    <TouchableOpacity
                        className="bg-[#5B5FEE] w-1/2 flex py-2 rounded-xl items-center justify-center self-end"
                        onPress={handleCreateHabit}
                    >
                        <Text className="text-white font-bold text-lg">Create Habit</Text>
                    </TouchableOpacity>
                </View>
            </CenteredView>
        </View>
    );
};

export default CreateHabitScreen;

const styles = StyleSheet.create({});
