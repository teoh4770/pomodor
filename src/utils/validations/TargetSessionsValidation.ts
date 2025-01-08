import { Validation } from "../Validation";

const validateTargetSessions = (value: number): string[] => {
  const errors: string[] = [];
  if (!Validation.positiveNumber(value)) {
    errors.push("Cannot accept negative value");
  }
  return errors;
};

export { validateTargetSessions };
