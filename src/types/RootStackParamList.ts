import type {Note} from "./Note"

export type RootStackParamList = {
    Notes: undefined; // 如果页面不需要参数，写 `undefined`
    EditNote: { note: Note }; // 如果需要参数，写 `{ note: Note }`
  };
  
