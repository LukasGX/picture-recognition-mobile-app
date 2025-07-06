import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

type MyInputProps = {
  text: string;
  setText: (text: string) => void;
};

const MyInput = ({ text, setText }: MyInputProps) => {
  return (
    <TextInput
      style={[styles.input]}
      value={text}
      onChangeText={setText}
      placeholder="Text hier eingeben"
      placeholderTextColor="#888"
    />
  );
};

const RootLayout = () => {
  const [text, setText] = useState('');

  const handleImageSearch = async () => {
    console.log('image search');
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      console.log('Selected image:', result.assets[0].uri);
    } else {
      console.log('User cancelled image picker');
    }
  };

  const handleTextSearch = (text: string) => {
    console.log('Text search:', text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Drag & Drop Image Search</Text>
      {/* <TouchableOpacity style={[styles.button, styles.BottomButton]}>
        <Text style={{ color: 'white' }}>Search by Text</Text>
      </TouchableOpacity> */}
      <MyInput text={text} setText={setText} />
      <TouchableOpacity style={styles.button} onPress={() => handleTextSearch(text)}>
        <Text style={{ color: 'white' }}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.imageButton]}
        onPress={handleImageSearch}
      >
        <Text style={{ color: 'white' }}>Search by Image</Text>
      </TouchableOpacity>
    </View>
  )
}

export default RootLayout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7160bf',
    paddingHorizontal: 10,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 60,
    gap: 0
  },
  headline: {
    fontSize: 30,
    color: 'white',
    // position: 'absolute',
    // top: 150
    marginBottom: 40
  },
  button: {
    backgroundColor: '#40366e',
    // position: 'absolute',
    width: '100%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 0
    // bottom: 330 - 70
  },
  imageButton: {
    marginTop: 15
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: '#40366e',
    color: 'white',
    borderRadius: 15,
    paddingHorizontal: 12,
    marginVertical: 20,
    fontSize: 16,
    margin: 0
    // position: 'absolute',
    // bottom: 330
  }
})
