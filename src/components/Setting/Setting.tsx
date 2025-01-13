import { forwardRef } from "react";
import RemoveBlackSm from "/remove-black-sm.png";

type SettingProps = object;

type Ref = HTMLDialogElement;

const Setting = forwardRef<Ref, SettingProps>((_, ref) => {
  // use context of app setting here

  return (
    <dialog
      ref={ref}
      className="h-fit w-full max-w-[25rem] rounded-lg backdrop:bg-black/50 backdrop:backdrop-blur-md"
      id="modal"
    >
      <form method="dialog">
        {/* Setting header */}
        <div className="dialog__header flex items-center justify-between border-b border-solid px-5 py-3">
          <div></div>
          <h2 className="text-md font-bold uppercase">Setting</h2>
          <button className="aspect-square h-3 w-3" aria-label="Close button">
            <img src={RemoveBlackSm} alt="" />
          </button>
        </div>

        <div className="px-5">
          {/* Timer Setting */}
          <div className="space-y-4 border-b py-6">
            <h3 className="mb-3 font-bold uppercase tracking-wider text-gray-400">
              Timer
            </h3>

            <div className="grid gap-1">
              <p className="font-bold">Time (minutes)</p>
              <div className="flex flex-wrap justify-between">
                <label className="grid">
                  <span className="text-sm text-gray-400 font-bold">Pomodoro</span>
                  <input type="number" className="block border border-black" />
                </label>
                <label className="grid">
                  <span className="text-sm text-gray-400 font-bold">Short Break</span>
                  <input type="number" className="block border border-black" />
                </label>
              </div>
            </div>

            <label className="flex items-center justify-between" htmlFor="">
              <span>Auto Start Breaks</span>
              <input type="checkbox" name="" id="" className="checkbox" />
            </label>

            <label className="flex items-center justify-between" htmlFor="">
              <span>Auto Start Pomodoros</span>
              <input type="checkbox" name="" id="" className="checkbox" />
            </label>

            <label className="flex items-center justify-between">
              <span>Short Break</span>
              <input type="number" className="block border border-black" />
            </label>
          </div>

          {/* Task Setting */}
          <div className="space-y-4 border-b py-6">
            <h3 className="mb-3 font-bold uppercase tracking-wider text-gray-400">
              Task
            </h3>

            <label className="flex items-center justify-between" htmlFor="">
              <span>Auto Check Tasks</span>
              <input className="checkbox" type="checkbox" name="" id="" />
            </label>

            <label className="flex items-center justify-between" htmlFor="">
              <span>Auto Switch Tasks</span>
              <input className="checkbox" type="checkbox" name="" id="" />
            </label>
          </div>

          {/* Sound Setting */}
          <div className="space-y-4 border-b py-6">
            <h3 className="mb-3 font-bold uppercase tracking-wider text-gray-400">
              Sound
            </h3>

            <div>
              <label className="flex items-center justify-between" htmlFor="">
                <span>Alarm Sound</span>
                <select name="" id="">
                  <option value="">Bell</option>
                  <option value="">Bird</option>
                  <option value="">Digital</option>
                  <option value="">Kitchen</option>
                  <option value="">Wood</option>
                </select>
              </label>
              <label className="flex items-center justify-between" htmlFor="">
                <span className="invisible">Volume</span>
                <input type="range" name="" id="" />
              </label>
            </div>

            <div>
              <label className="flex items-center justify-between" htmlFor="">
                <span>Ticking Sound</span>
                <select name="" id="">
                  <option value="">None</option>
                  <option value="">Ticking Fast</option>
                  <option value="">Ticking Slow</option>
                  <option value="">White Noise</option>
                  <option value="">Brown Noise</option>
                </select>
              </label>
              <label className="flex items-center justify-between" htmlFor="">
                <span className="invisible">Volume</span>
                <input type="range" name="" id="" />
              </label>
            </div>
          </div>

          {/* Theme Setting */}
          {/* <div className="py-6 space-y-4">
            <h3 className="mb-3 font-bold uppercase tracking-wider underline">Theme</h3>

            <label className="flex items-center justify-between" htmlFor="">
              <span>Dark Mode when running</span>
              <input className="checkbox" type="checkbox" name="" id="" />
            </label>
          </div> */}
        </div>

        <footer className="flex justify-end bg-black/10 px-5 py-3">
          <button
            className="button !bg-black"
            data-type="secondary"
            data-size="md"
          >
            OK
          </button>
        </footer>
      </form>
    </dialog>
  );
});

export { Setting };
