import { Validation } from "../Validation";

const validateCompletedSessions = (value: number, target: number): string[] => {
  const errors: string[] = [];
  if (!Validation.positiveNumber(value)) {
    errors.push("Cannot accept negative value");
  }
  if (!Validation.lessThan(value, target)) {
    errors.push("Cannot be larger than or equal to target sessions");
  }
  return errors;
};

export { validateCompletedSessions };
