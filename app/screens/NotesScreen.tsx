// screens/NotesScreen.tsx
import React, { useEffect }  from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../src/types/RootStackParamList';
import {useNotes} from '../../src/hooks/NotesContext';
// import useNotes from '../hooks/useNotes';
import NoteItem from '../components/NoteItem';
import type {Note} from "../../src/types/Note"
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { MaterialIcons } from "@expo/vector-icons"; // 拖动按钮的图标

const NotesScreen = () => {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Notes'>;
    const navigation = useNavigation<NavigationProp>();
    const {notes, createNote,deleteNote} = useNotes();

  useEffect(() => {
    // 检查 notes 是否为空，避免重复添加初始数据
    if (Object.keys(notes).length === 0) {
      createNote('Note1');
      createNote('Note2');
      createNote('Note3');
    }
  }, [notes]); // 依赖 notes

  const handleDoublePress = (note: Note) => {
    // 导航到编辑页面，并传递便签数据
    console.log(`Note id: ${notes[note.id].id}, old content: ${notes[note.id].content}`)
    navigation.navigate('EditNote', { note });
  };

  const handleAddNote = () => {
    // 创建新便签并跳转到编辑页面
    console.log("Add button pushed.")
    const newNote = createNote(''); // 创建一个空便签
    console.log(`newNote id: ${newNote.id}`)
    navigation.navigate('EditNote', { note: newNote});
  };

  const handleDeleteNote = (id: string) => {
    console.log(`delete note: ${id}`)    
    deleteNote(id); // 调用删除函数
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.values(notes)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NoteItem note={item}  
                                            />}
        extraData={notes}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffe',
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  dragButton: {
    padding: 8,
  },
  activeItem: {
    backgroundColor: "#f0f0f0",
  },
});

export default NotesScreen;