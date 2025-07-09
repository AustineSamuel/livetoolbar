import axios from 'axios';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
type location=any;

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY;

const GooglePlaceSelector: React.FC<{ onSelect: (location:location) => void }> = ({ onSelect }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null|any>(null);

  const fetchCities = async (text: string) => {
    if (!text) return setSuggestions([]);
    setLoading(true);

    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
        params: {
          input: text,
          key: GOOGLE_API_KEY,
          types: '(cities)',
          language: 'en',
        },
      });

      if (response.data?.predictions) {
        setSuggestions(response.data.predictions);
      }
    } catch (error) {
      console.error('Autocomplete Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (text: string) => {
    setInput(text);
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      fetchCities(text);
    }, 300);
    setDebounceTimer(timer);
  };

  const handleSelect = async (item: any) => {
    try {
      const placeId = item.place_id;
      const detailResponse = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
        params: {
          place_id: placeId,
          key: GOOGLE_API_KEY,
          fields: 'address_component,geometry,name,place_id',
        },
      });

      const result = detailResponse.data.result;

      const location: location = {
        name: result.name || '',
        placeId: result.place_id,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        city: '',
        country: '',
        zipCode: '',
      };

      for (let component of result.address_components) {
        if (component.types.includes('locality')) {
          location.city = component.long_name;
        }
        if (component.types.includes('country')) {
          location.country = component.long_name;
        }
        if (component.types.includes('postal_code')) {
          location.zipCode = component.long_name;
        }
      }

      setInput(location.name);
      setSuggestions([]);
      onSelect(location);
    } catch (error) {
      console.error('Details Fetch Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for your city"
        value={input}
        onChangeText={handleInputChange}
        style={styles.input}
      />

      {loading && <ActivityIndicator size="small" color="#aaa" style={{ marginTop: 10 }} />}

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default GooglePlaceSelector;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
});