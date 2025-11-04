import { Alert } from "react-native";
import { useCompleteHabitMutation } from "@/services/HabitService";

export const useCompleteHabit = () => {
  const [sendCompleteHabitRequest, mutationState] = useCompleteHabitMutation();

  const completeHabit = async (habitId: string) => {
    try {
      await sendCompleteHabitRequest(habitId).unwrap();
      Alert.alert("SmartHabit", "The habit was successfully completed");
    } catch (err: any) {
      const message = err?.data?.message || "Something went wrong";
      Alert.alert("SmartHabit", message);
    }
  };

  return { completeHabit, ...mutationState };
};
