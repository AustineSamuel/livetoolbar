import { defaultStyles } from '@/glob/Styles';
import { Fontisto } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type Option = {
  id: string;
  name: string;
};

type Props = {
  options: Option[];
  onChange: (selected: Option) => void;
  placeholder?: string;
  selected?: Option;
  sheetPosition?: 'fromBottom' | 'center';
  showFilter?: boolean; // <-- NEW PROP
  styles?:React.CSSProperties| any
};

const SelectInput = (props: Props) => {
  const {
  options,
  onChange,
  placeholder = 'Select an option',
  selected,
  sheetPosition = 'center',
  showFilter = false, // default is off
  styles:moreStyles
}=props;
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter((opt) =>
    opt.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item: Option) => {
    onChange(item);
    setModalVisible(false);
    setSearch('');
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[defaultStyles.inputField, styles.selectInput,moreStyles]}
      >
        <Text style={{ color: selected ? '#000' : '#aaa', flex: 1 }}>
          {selected ? selected.name : placeholder}
        </Text>
        <Fontisto
          name={modalVisible ? 'angle-up' : 'angle-down'}
          size={16}
          color="#888"
        />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View
          style={[
            styles.modalOverlay,
            sheetPosition === 'center' ? styles.centerOverlay : styles.bottomOverlay,
          ]}
        >
          <View
            style={[
              styles.modalContent,
              sheetPosition === 'center' && styles.centerModal,
            ]}
          >
            {showFilter && (
              <TextInput
                placeholder="Search..."
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />
            )}
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={{ fontSize: 16 }}>{item.name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={{ padding: 10, color: '#999' }}>No matches found</Text>}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
              <Text style={{ textAlign: 'center', color: '#ff4444' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  selectInput: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomOverlay: {
    justifyContent: 'flex-end',
  },
  centerOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '60%',
  },
  centerModal: {
    width: '85%',
    borderRadius: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  optionItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  closeBtn: {
    marginTop: 10,
  },
});
