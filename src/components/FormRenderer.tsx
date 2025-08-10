import React, { useMemo, useState, useEffect } from "react";
import { FieldSchema, FormSchema } from "../types";
import {
  Box,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
  Typography,
  FormHelperText,
} from "@mui/material";
import { validateField, evalFormula } from "../utils/formUtils";

interface Props {
  form: FormSchema;
}

export default function FormRenderer({ form }: Props) {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    form.fields.forEach((f) => (initial[f.id] = f.defaultValue ?? ""));
    return initial;
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Recompute derived fields whenever values change
  useEffect(() => {
    const next = { ...values };
    for (const f of form.fields.filter((ff) => ff.derived)) {
      try {
        next[f.id] = evalFormula(f.formula, next);
      } catch (e) {
        next[f.id] = "";
      }
    }
    setValues(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initial compute only

  const handleChange = (id: string, val: any) => {
    const next = { ...values, [id]: val };
    // update derived fields that depend on changed id
    for (const f of form.fields.filter((ff) => ff.derived)) {
      if (f.parents?.includes(id) || (f.formula && f.formula.includes(id))) {
        next[f.id] = evalFormula(f.formula, next);
      }
    }
    setValues(next);

    // validate on change
    const field = form.fields.find((ff) => ff.id === id);
    if (field) {
      const v = validateField(val, field);
      setErrors((prev) => ({ ...prev, [id]: v }));
    }
  };

  const handleSubmit = () => {
    const allErrors: Record<string, string[]> = {};
    for (const f of form.fields) {
      const e = validateField(values[f.id], f);
      if (e.length) allErrors[f.id] = e;
    }
    setErrors(allErrors);
    if (Object.keys(allErrors).length === 0) {
      alert("Form is valid — submit logic not required.");
    }
  };

  return (
    <Box>
      {form.fields.map((f) => (
        <Box key={f.id} sx={{ mb: 2 }}>
          {!f.derived ? (
            <>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                {f.label}
                {f.required ? " *" : ""}
              </Typography>
              {f.type === "text" && (
                <TextField
                  fullWidth
                  value={values[f.id] ?? ""}
                  onChange={(e) => handleChange(f.id, e.target.value)}
                  error={!!errors[f.id]?.length}
                  helperText={errors[f.id]?.join(", ")}
                />
              )}
              {f.type === "number" && (
                <TextField
                  fullWidth
                  type="number"
                  value={values[f.id] ?? ""}
                  onChange={(e) => handleChange(f.id, e.target.value)}
                  error={!!errors[f.id]?.length}
                  helperText={errors[f.id]?.join(", ")}
                />
              )}
              {f.type === "textarea" && (
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  value={values[f.id] ?? ""}
                  onChange={(e) => handleChange(f.id, e.target.value)}
                  error={!!errors[f.id]?.length}
                  helperText={errors[f.id]?.join(", ")}
                />
              )}
              {f.type === "select" && (
                <TextField
                  select
                  fullWidth
                  value={values[f.id] ?? ""}
                  onChange={(e) => handleChange(f.id, e.target.value)}
                  error={!!errors[f.id]?.length}
                >
                  {f.options?.map((o) => (
                    <MenuItem key={o.value} value={o.value}>
                      {o.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              {f.type === "radio" && (
                <RadioGroup
                  value={values[f.id] ?? ""}
                  onChange={(e) => handleChange(f.id, e.target.value)}
                >
                  {f.options?.map((o) => (
                    <FormControlLabel
                      key={o.value}
                      value={o.value}
                      control={<Radio />}
                      label={o.label}
                    />
                  ))}
                </RadioGroup>
              )}
              {f.type === "checkbox" && (
                <Box>
                  {(f.options || []).map((o) => (
                    <FormControlLabel
                      key={o.value}
                      control={
                        <Checkbox
                          checked={
                            Array.isArray(values[f.id])
                              ? values[f.id].includes(o.value)
                              : false
                          }
                          onChange={(e) => {
                            const arr = Array.isArray(values[f.id])
                              ? [...values[f.id]]
                              : [];
                            if (e.target.checked) arr.push(o.value);
                            else {
                              const idx = arr.indexOf(o.value);
                              if (idx >= 0) arr.splice(idx, 1);
                            }
                            handleChange(f.id, arr);
                          }}
                        />
                      }
                      label={o.label}
                    />
                  ))}
                </Box>
              )}
              {f.type === "date" && (
                <TextField
                  fullWidth
                  type="date"
                  value={values[f.id] ?? ""}
                  onChange={(e) => handleChange(f.id, e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors[f.id]?.length}
                  helperText={errors[f.id]?.join(", ")}
                />
              )}
              {errors[f.id] && errors[f.id].length > 0 && (
                <FormHelperText error>{errors[f.id].join(", ")}</FormHelperText>
              )}
            </>
          ) : (
            <>
              <Typography variant="subtitle2">{f.label} (derived)</Typography>
              <TextField
                fullWidth
                value={values[f.id] ?? ""}
                InputProps={{ readOnly: true }}
              />
            </>
          )}
        </Box>
      ))}

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
