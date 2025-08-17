import { db } from "./firebase.ts";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ISoundSetting, ITaskSetting, IThemeSettings, ITodo, TodosViewTypeEnum } from "@/types";

export interface UserData {
  currentViewType: TodosViewTypeEnum,
  elapsedTime: number,
  isTimerRunning: boolean,
  selectedTodoId: string,
  sessionCount: number,
  soundSetting: ISoundSetting,
  taskSetting: ITaskSetting,
  themeSetting: IThemeSettings,
  todos: ITodo[],
}

interface StorageAdapter {
  getData(userId: string | undefined): Promise<UserData | null>;

  setData(data: UserData, userId: string | undefined): Promise<void> | void;
}

export class LocalStorageAdapter implements StorageAdapter {
  getData() {
    return JSON.parse(localStorage.getItem("user-data") ?? "{}");
  }

  setData(data: UserData) {
    localStorage.setItem("user-data", JSON.stringify(data));
  }
}

export class DatabaseAdapter implements StorageAdapter {
  async getData(userId: string | undefined) {
    if (!userId) return null;

    const docRef = doc(db, "users", userId);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? (snapshot.data() as UserData) : null;
  }

  async setData(data: UserData, userId: string | undefined) {
    if (!userId) return;

    const docRef = doc(db, "users", userId);
    await setDoc(docRef, data, { merge: true }); // merge so you don't overwrite everything
  }
}