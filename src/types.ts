export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date";

export type ValidationRule =
  | { type: "required" }
  | { type: "minLength"; value: number }
  | { type: "maxLength"; value: number }
  | { type: "email" }
  | { type: "password"; min?: number; mustContainNumber?: boolean };

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldSchema {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  defaultValue?: any;
  options?: FieldOption[];
  validations?: ValidationRule[];
  derived?: boolean;
  parents?: string[];
  formula?: string;
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: number;
  fields: FieldSchema[];
}
