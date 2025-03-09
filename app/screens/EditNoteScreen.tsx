// screens/EditNoteScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {useNotes} from '../../src/hooks/NotesContext';
// import useNotes from '../hooks/useNotes';
import type {Note} from '../../src/types/Note';

const EditNoteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { note } = route.params as { note: Note }; // 获取传递的便签数据
  const {updateNote} = useNotes();

  const [content, setContent] = useState(note.content);

  // console.log(`Enter edit screen. note id: ${note.id}.`)

  const handleSave = () => {
    console.log(`Handling save. note id: ${note.id}. content: ${content}`)
    updateNote(note.id, content); // 更新便签内容
    navigation.goBack(); // 返回上一页
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16 }}
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default EditNoteScreen;