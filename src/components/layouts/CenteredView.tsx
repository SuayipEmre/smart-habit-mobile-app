import React from "react";
import { View, ViewProps } from "react-native";

interface CenteredViewProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

const CenteredView: React.FC<CenteredViewProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <View className={`w-[90%] self-center ${className}`} {...props}>
      {children}
    </View>
  );
};

export default CenteredView;
