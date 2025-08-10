import RingSound from "/sounds/ring/bell.mp3";
import DigitalSound from "/sounds/ring/digital.mp3";
import { AlarmSoundEnum } from "@/types";
import { playSound } from "@/utils";

export const playAlarmSound = (alarmSoundType: AlarmSoundEnum) => {
  let src: string | null = null;

  if (alarmSoundType === AlarmSoundEnum.BELL) {
    src = RingSound;
  } else if (alarmSoundType === AlarmSoundEnum.DIGITAL) {
    src = DigitalSound;
  }

  playSound(src);
};
