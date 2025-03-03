interface SettingsFooterProps {
  isFormValid: boolean;
}

const SettingsFooter = ({ isFormValid }: SettingsFooterProps) => {
  return (
    <footer className="flex justify-end bg-black/10 px-5 py-3">
      <button
        type="submit"
        className="button !bg-black"
        data-type="secondary"
        data-size="md"
        disabled={!isFormValid}
      >
        OK
      </button>
    </footer>
  );
};

export { SettingsFooter };
