import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Option = { id: string; name: string };

interface InlineSelectInputProps {
  options: Option[];
  selected: string;
  placeholder: string;
  onChange: (option: Option) => void;
}

const InlineSelectInput: React.FC<InlineSelectInputProps> = ({
  options,
  selected,
  placeholder,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.id === selected);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={styles.selector}
      >
        <Text>{selectedOption?.name || placeholder}</Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>

      {open && (
        <FlatList
          data={options}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                onChange(item);
                setOpen(false);
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  selector: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9",
  },
});

export default InlineSelectInput;
