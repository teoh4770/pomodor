import RemoveBlackSm from "/remove-black-sm.png";

interface SettingsHeaderProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
}

const SettingsHeader = ({ dialogRef }: SettingsHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-solid px-5 py-3">
      <div></div>
      <h2 className="text-md font-bold uppercase">Setting</h2>
      <button
        type="button"
        className="aspect-square h-3 w-3"
        aria-label="Close button"
        onClick={() => {
          if (dialogRef.current) {
            dialogRef.current.close();
          }
        }}
      >
        <img src={RemoveBlackSm} alt="" />
      </button>
    </div>
  );
};

export { SettingsHeader };
