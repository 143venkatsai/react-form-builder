import { FieldSchema } from "../types";

export function validateField(value: any, field: FieldSchema) {
  const errors: string[] = [];
  const val = value;
  if (field.validations) {
    for (const rule of field.validations) {
      if (rule.type === "required") {
        if (val === undefined || val === null || String(val).trim() === "")
          errors.push("This field is required");
      }
      if (rule.type === "minLength") {
        if (String(val ?? "").length < rule.value)
          errors.push(`Minimum length ${rule.value}`);
      }
      if (rule.type === "maxLength") {
        if (String(val ?? "").length > rule.value)
          errors.push(`Maximum length ${rule.value}`);
      }
      if (rule.type === "email") {
        const re = /\S+@\S+\.\S+/;
        if (val && !re.test(String(val))) errors.push("Invalid email");
      }
      if (rule.type === "password") {
        if (val) {
          if (rule.min && String(val).length < rule.min)
            errors.push(`Password min ${rule.min} chars`);
          if (rule.mustContainNumber && !/\d/.test(String(val)))
            errors.push("Password must contain a number");
        }
      }
    }
  }
  return errors;
}

export function evalFormula(
  formula: string | undefined,
  values: Record<string, any>
) {
  if (!formula) return "";
  try {
    const fn = new Function("values", `with(values){ return (${formula}); }`);
    return fn(values);
  } catch (e) {
    console.error("Formula eval error", e);
    return "";
  }
}
