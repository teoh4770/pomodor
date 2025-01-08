import { Validation } from "../Validation";

const validateTitle = (value: string): string[] => {
  const errors: string[] = [];
  if (!Validation.string(value)) {
    errors.push("Cannot be empty");
  }
  return errors;
};

export { validateTitle };