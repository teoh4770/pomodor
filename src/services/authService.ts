import { auth } from "./firebase.ts";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { DatabaseAdapter } from "@/services/StorageAdapterService.ts";
import { AlarmSoundEnum, TickingSoundEnum, TodosViewTypeEnum } from "@/types";

export const register = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

export const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const registerAndInitData = async (email: string, password: string) => {
  const userCredential = await register(email, password);
  const adapter = new DatabaseAdapter();

  // Initialise default user data if it does not exist
  const existingData = await adapter.getData(userCredential.user.uid);
  if (!existingData) {
    await adapter.setData({
      currentViewType: TodosViewTypeEnum.ALL,
      elapsedTime: 0,
      isTimerRunning: false,
      selectedTodoId: "",
      sessionCount: 0,
      soundSetting: {
        alarmSoundVolume: 50,
        alarmSoundType: AlarmSoundEnum.DIGITAL,
        tickingSoundType: TickingSoundEnum.NONE
      },
      taskSetting: {
        autoCheckTasks: false,
        autoSwitchTasks: false
      },
      themeSetting: {
        darkModeWhenRunning: true,
        themes: {
          pomodoro: 0,
          break: 1
        }
      },
      todos: []
    }, userCredential.user.uid);
  }

  return userCredential;
};