import colors from "@utils/colors";
import React, { useEffect, useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

type Props = {
  length?: number;
  secureText?: boolean;
  setPin: React.Dispatch<React.SetStateAction<string>>;
  boxType?: "line" | "square";
  error?: boolean;
};

const PinInput: React.FC<Props> = ({
  length = 4,
  setPin,
  secureText = false,
  error = false,
  boxType = "square",
}) => {
  const [pinArr, setPinArr] = useState<string[]>(
    [...Array(length)].map(() => "")
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handlePinChange = (text: string, index: number) => {
    const newOtp = [...pinArr];
    newOtp[index] = text;
    setPinArr(newOtp);
    setPin(newOtp.join(""));
    if (currentIndex < length) {
      setCurrentIndex(currentIndex + 1);
    }

    if (text.length === 1) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }, (_, index) => (
        <TextInput
          key={index}
          style={[
            boxType === "square" ? styles.input : styles.lineInput,

            {
              borderColor: error ? colors.error : colors.gray,
            },
          ]}
          value={pinArr[index]}
          maxLength={1}
          secureTextEntry={secureText}
          keyboardType="numeric"
          onChangeText={(text) => handlePinChange(text, index)}
          onKeyPress={(event) => {
            if (event.nativeEvent.key === "Backspace") {
              if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
                if (index === length - 1) {
                  setCurrentIndex(currentIndex - length - 2);
                }
              }
              if (index !== 0 && index !== currentIndex - 1) {
                const newOtp = [...pinArr];
                newOtp[index] = "";
                setPinArr(newOtp);
                const previousInput = inputRefs.current[index - 1];
                if (previousInput) {
                  previousInput.focus();
                  return;
                }
              }
            }
          }}
          ref={(el) => (inputRefs.current[index] = el)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
  },
  input: {
    height: 72,
    width: 77,
    fontSize: 14,
    borderRadius: 8,
    textAlign: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    color: colors.black,
  },
  lineInput: {
    height: 72,
    width: 77,
    fontSize: 14,
    borderRadius: 8,
    textAlign: "center",
    backgroundColor: colors.white,
    borderBottomWidth: 1,
  },
  underline: {
    height: 72,
    width: 77,
    fontSize: 14,
    textAlign: "center",
    borderBottomWidth: 1,
  },
});

export default PinInput;
