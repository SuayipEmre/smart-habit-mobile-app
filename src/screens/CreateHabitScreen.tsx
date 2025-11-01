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

const frequencyData = ["daily", "weekly", "monthly"]

const CreateHabitScreen = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState("daily");
    const [reminderTime, setReminderTime] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const [isSelectFrequency, setIsSelectFrequency] = useState(false)
    const { height } = Dimensions.get("window");

    const[sendCreateHabitReq, {isLoading, isError}] = useCreateHabitMutation()

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
        const formattedTime = reminderTime
          ? `${reminderTime.getHours().toString().padStart(2, "0")}:${reminderTime
              .getMinutes()
              .toString()
              .padStart(2, "0")}`
          : null;
      
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
                <HabitInput
                    value={title}
                    setValue={setTitle}
                    placeholder="title"
                    height={height}
                    title="Habit Title"
                />

                {/* Description */}
                <HabitInput
                    value={description}
                    setValue={setDescription}
                    placeholder="description"
                    height={height}
                    title="Habit Description"
                />

                {/* Frequency (şimdilik sabit daily, istersen picker eklenir) */}
                <View className="w-[90%] self-center mt-4">
                    <Text className="font-semibold mb-2 text-[#F25D07]">Habit Frequency</Text>

                    <View className="flex flex-row gap-5 flex-wrap">
                        {frequencyData.map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => setFrequency(item)}
                                className={`w-[25%] py-2 rounded-md mt-5 items-center justify-center ${frequency === item ? "bg-green-500" : "bg-green-100"
                                    }`}
                            >
                                <Text
                                    className={`${frequency === item ? "text-white" : "text-green-900"
                                        } font-semibold capitalize`}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>




                </View>

                {/* Reminder Time */}
                <View className="w-[90%] self-center mt-5">
                    <Text className="font-semibold mb-2 text-[#F25D07]">
                        Reminder Time
                    </Text>

                    <TouchableOpacity
                        onPress={() => setShowPicker(true)}
                        className="border px-3 py-4 rounded-md bg-gray-50"
                    >
                        <Text className="text-gray-700">
                            {reminderTime
                                ? reminderTime.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })
                                : "Select reminder time"}
                        </Text>
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker
                            value={reminderTime || new Date()}
                            mode="time"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={handleTimeChange}
                            is24Hour={true}
                        />
                    )}
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
