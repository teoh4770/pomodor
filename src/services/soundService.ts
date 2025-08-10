import { AlarmSoundEnum } from "@/types";
import { playSound } from "@/utils";

import BellSound from "/sounds/ring/bell.mp3";
import DigitalSound from "/sounds/ring/digital.mp3";
import KitchenSound from "/sounds/ring/microwave.mp3";

export const alarmSoundOptions = [
  { value: AlarmSoundEnum.BELL, label: 'Bell', src: BellSound },
  { value: AlarmSoundEnum.DIGITAL, label: 'Digital', src: DigitalSound },
  { value: AlarmSoundEnum.KITCHEN, label: 'Kitchen', src: KitchenSound },
];

const alarmSoundMap = new Map(
  alarmSoundOptions.map(alarmSound => [alarmSound.value, alarmSound.src])
);

export const playAlarmSound = (alarmSoundType: AlarmSoundEnum) => {
  const alarmSoundSrc = alarmSoundMap.get(alarmSoundType) || null;
  if (alarmSoundSrc) {
    playSound(alarmSoundSrc);
  }
};