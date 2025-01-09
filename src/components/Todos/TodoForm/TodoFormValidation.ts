import { toast } from "react-toastify";
import { Validation } from "../../../utils/Validation";
import { TodoFormData, ValidationErrors } from "./TodoForm.types";

const validateTitle = (value: string): string[] => {
  const errors: string[] = [];
  if (!Validation.string(value)) {
    errors.push("Cannot be empty");
  }
  return errors;
};

const validateCompletedSessions = (value: number, target: number): string[] => {
  const errors: string[] = [];
  if (Validation.negativeNumber(value)) {
    errors.push("Cannot accept negative value");
  }
  if (!Validation.lessThan(value, target)) {
    errors.push("Cannot be larger than or equal to target sessions");
  }
  return errors;
};

const validateTargetSessions = (value: number): string[] => {
  const errors: string[] = [];
  if (Validation.negativeNumber(value)) {
    errors.push("Cannot accept negative value");
  }
  return errors;
};

const validateForm = (data: TodoFormData) => {
  return {
    title: validateTitle(data.title),
    targetSessions: validateTargetSessions(data.targetSessions),
    completedSessions: data.completedSessions ? validateCompletedSessions(data.completedSessions, data.targetSessions): [],
  };
};

const hasValidationErrors = (errors: ValidationErrors): boolean =>
  Object.values(errors).some((error) => error.length > 0);

const handleValidationErrors = (errors: ValidationErrors) => {
  toast.error("You have invalid entries, try again!");
  console.error(errors);
};

export { validateForm, hasValidationErrors, handleValidationErrors };
