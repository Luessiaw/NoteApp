import React, { createContext, useContext, useState } from "react";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import type {Note} from "../types/Note";

type NotesContextType = {
  notes: Record<string, Note>;
  createNote: (content: string) => Note;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id:string) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Record<string, Note>>({});

  const createNote = (content: string = ""):Note =>  {
    const id = uuidv4();
    // const id = content;
    const newNote:Note = {
      id:id,
      content:content,
      isPinned:false,
      finished:false,
    }
  
    setNotes((prevNotes) => ({
      ...prevNotes,
      [id]: newNote,
    }));
    return newNote
  };

  const updateNote = (id: string, content: string) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [id]: { ...prevNotes[id], content },
    }));
  };

  const deleteNote = (id: string) =>  {
    setNotes((prevNotes) => {
      const newNotes = { ...prevNotes };
      delete newNotes[id]; // 删除指定 id 的便签
      return newNotes;
    });
  };

  return (
    <NotesContext.Provider value={{ notes, createNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
