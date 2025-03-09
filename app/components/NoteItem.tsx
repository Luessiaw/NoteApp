// components/NoteItem.tsx
import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import type {Note} from '../../src/types/Note';
import {useNotes} from '../../src/hooks/NotesContext';

import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { MaterialIcons } from "@expo/vector-icons"; // 拖动按钮的图标

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../src/types/RootStackParamList';



type NoteItemProps = {
  note: Note;
};

const NoteItem = ({ note}: NoteItemProps) => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Notes'>;
  const navigation = useNavigation<NavigationProp>();
  const menuRef = useRef<Menu>(null); // 创建菜单引用
  let lastPress = 0; // 记录上次点击时间
  const {deleteNote} = useNotes();

  const navigate2Edit = () => {
    navigation.navigate('EditNote', { note });
  }

  const handlePress = () => {
      const currentTime = new Date().getTime();
      const delta = currentTime - lastPress;
  
      if (delta < 300) {
        // 双击事件
        console.log(`Note id: ${note.id}, old content: ${note.content}`)
        navigate2Edit()
        }
  
      lastPress = currentTime;
  };

  const handleEditOption = ()=>{
    console.log("Menu option Edit selected. Note id:", note.id)
    navigate2Edit()
  }

  const handleDeleteOption = ()=>{
    console.log("Menu option Delete selected. Note id:", note.id)
    deleteNote(note.id)
  }



  return (
    <Menu ref={menuRef}>
      <TouchableOpacity 
        onPress={handlePress} 
        style={styles.container}
        onLongPress={() => menuRef.current?.open()}
        >
        <View >
            <Text style={styles.content}>{note.content}</Text>
        </View>
      {/* 拖动按钮 */}
      {/* <TouchableOpacity onLongPress={drag} style={styles.dragButton}>
        <MaterialIcons name="drag-handle" size={24} color="gray" />
      </TouchableOpacity> */}

      </TouchableOpacity>

      {/* 这里必须有 `MenuTrigger`，否则 `Menu` 无法正确注册 */}
      <MenuTrigger text="" />

      <MenuOptions>
        <MenuOption onSelect={handleEditOption}>
          <Text style={styles.menuText}>编辑</Text>
        </MenuOption>
          <MenuOption onSelect={handleDeleteOption}>
          <Text style={[styles.menuText, { color: "red" }]}>删除</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: "row",
    justifyContent: "space-between", // 让文本和菜单按钮分开
    alignItems: "center",    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
    marginTop: 2,
    flex: 1, // 让文本部分占据剩余空间
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  pinned: {
    fontSize: 12,
    color: 'green',
    marginTop: 4,
  },
  menuButton: {
    padding: 8, // 增加点击区域
  },
  menuContainer: {
    padding: 8,
    borderRadius: 5,
  },
  menuText: {
    fontSize: 16,
    padding: 10,
  },
  dragButton: {
    padding: 8,
  },
  activeItem: {
    backgroundColor: "#f0f0f0",
  },
});

export default NoteItem;