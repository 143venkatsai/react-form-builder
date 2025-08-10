import React from "react";
import { FieldSchema } from "../types";
import { evalFormula } from "../utils/formUtils";

interface Props {
  field: FieldSchema;
  values: Record<string, any>;
}

export default function DerivedFieldEvaluator({ field, values }: Props) {
  const val = evalFormula(field.formula, values);
  return <>{val ?? ""}</>;
}
