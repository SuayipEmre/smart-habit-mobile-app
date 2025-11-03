export const formatTime = (reminderTime: Date | null) => {
    return reminderTime
        ? `${reminderTime.getHours().toString().padStart(2, "0")}:${reminderTime
            .getMinutes()
            .toString()
            .padStart(2, "0")}`
        : null;
        
}