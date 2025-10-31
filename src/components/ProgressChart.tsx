import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";


/*


*/

// date : string,
// day : string,
//completed : number

type dataType = {
    date: string,
    day: string,
    completed: number
}
type Props = {
    data: dataType[] | [],
    isLoading: boolean,
    isError: boolean
}

const ProgressChart: React.FC<Props> = ({ data, isLoading, isError }) => {

    if (isLoading) return <Text className="text-gray-500">Loading weekly progress...</Text>;
    if (isError) return <Text className="text-red-500">Failed to load progress data.</Text>;

    const progress = data || [];

    const chartData = progress.map((item) => ({
        value: item.completed,
        label: item.date.slice(5), // "10-28"
        frontColor: "#5B5FEE",
        topLabelComponent: () => (
            <Text  className="text-[11px] text-gray-700">
                {item.completed}
            </Text>
        ),
    }));

    const totalCompleted = chartData.reduce((a, b) => a + b.value, 0);
    const avg = (totalCompleted / chartData.length).toFixed(1);

    return (
        <View className="mt-6">
            <Text className="text-lg font-semibold mb-4 text-gray-900">
                📈 Weekly Progress
            </Text>

            <View className="bg-white rounded-2xl shadow-sm px-2 py-3">
                <BarChart
                    data={chartData}
                    barWidth={22}
                    spacing={16}
                    initialSpacing={10}
                    xAxisThickness={1}
                    yAxisThickness={0}
                    hideRules
                    noOfSections={4}
                    isAnimated
                    barBorderRadius={6}
                    yAxisTextStyle={{ color: "#999" }}
                    xAxisLabelTextStyle={{ color: "#666", fontSize: 12 }}
                />
            </View>

            <Text className="text-center mt-2 text-gray-600 text-sm">
                Total completions: <Text className="font-semibold">{totalCompleted}</Text> • Daily avg:{" "}
                <Text className="font-semibold">{avg}</Text>
            </Text>
        </View>
    );
}

export default ProgressChart