import React, { useState, useEffect } from "react";
import { FieldSchema, FieldType } from "../types";
import {
  Box,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
  Divider,
} from "@mui/material";
import { v4 as uuid } from "uuid";

const ALL_TYPES: FieldType[] = [
  "text",
  "number",
  "textarea",
  "select",
  "radio",
  "checkbox",
  "date",
];

interface Props {
  field?: FieldSchema;
  onChange: (f: FieldSchema) => void;
  onDelete?: () => void;
  otherFields?: FieldSchema[];
}

export default function FieldEditor({
  field,
  onChange,
  onDelete,
  otherFields,
}: Props) {
  const [local, setLocal] = useState<FieldSchema>(
    field ?? {
      id: uuid(),
      type: "text",
      label: "New Field",
      required: false,
      defaultValue: "",
      options: [],
      validations: [],
    }
  );

  useEffect(() => {
    onChange(local);
  }, [local]);

  function patch(p: Partial<FieldSchema>) {
    const next = { ...local, ...p };
    setLocal(next);
  }

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1, mb: 2 }}>
      <TextField
        fullWidth
        label="Label"
        value={local.label}
        onChange={(e) => patch({ label: e.target.value })}
        sx={{ mb: 1 }}
      />
      <TextField
        select
        fullWidth
        label="Type"
        value={local.type}
        onChange={(e) => patch({ type: e.target.value as FieldType })}
        sx={{ mb: 1 }}
      >
        {ALL_TYPES.map((t) => (
          <MenuItem key={t} value={t}>
            {t}
          </MenuItem>
        ))}
      </TextField>
      <FormControlLabel
        control={
          <Switch
            checked={!!local.required}
            onChange={(e) => patch({ required: e.target.checked })}
          />
        }
        label="Required"
      />
      <TextField
        fullWidth
        label="Default value"
        value={local.defaultValue ?? ""}
        onChange={(e) => patch({ defaultValue: e.target.value })}
        sx={{ mt: 1 }}
      />

      <Divider sx={{ my: 2 }} />

      <TextField
        fullWidth
        label="Options (comma separated)"
        value={(local.options || []).map((o) => o.label).join(",")}
        onChange={(e) => {
          const arr = e.target.value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .map((s) => ({ label: s, value: s }));
          patch({ options: arr });
        }}
        sx={{ mb: 1 }}
      />

      <Box sx={{ mt: 1 }}>
        <TextField
          fullWidth
          label="Validation: minLength"
          type="number"
          value={
            local.validations?.find((v) => (v as any).type === "minLength")
              ? String(
                  (
                    local.validations!.find(
                      (v) => (v as any).type === "minLength"
                    ) as any
                  ).value
                )
              : ""
          }
          onChange={(e) => {
            const v = Number(e.target.value);
            const others = (local.validations || []).filter(
              (r) => (r as any).type !== "minLength"
            );
            if (!isNaN(v) && v > 0)
              patch({
                validations: [
                  ...others,
                  { type: "minLength", value: v },
                ] as any,
              });
            else patch({ validations: others as any });
          }}
          sx={{ mb: 1 }}
        />

        <TextField
          fullWidth
          label="Validation: maxLength"
          type="number"
          value={
            local.validations?.find((v) => (v as any).type === "maxLength")
              ? String(
                  (
                    local.validations!.find(
                      (v) => (v as any).type === "maxLength"
                    ) as any
                  ).value
                )
              : ""
          }
          onChange={(e) => {
            const v = Number(e.target.value);
            const others = (local.validations || []).filter(
              (r) => (r as any).type !== "maxLength"
            );
            if (!isNaN(v) && v > 0)
              patch({
                validations: [
                  ...others,
                  { type: "maxLength", value: v },
                ] as any,
              });
            else patch({ validations: others as any });
          }}
          sx={{ mb: 1 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={!!local.validations?.find((v) => v.type === "email")}
              onChange={(e) => {
                const others = (local.validations || []).filter(
                  (r) => r.type !== "email"
                );
                if (e.target.checked)
                  patch({ validations: [...others, { type: "email" }] as any });
                else patch({ validations: others as any });
              }}
            />
          }
          label="Email validation"
        />

        <FormControlLabel
          control={
            <Switch
              checked={!!local.validations?.find((v) => v.type === "password")}
              onChange={(e) => {
                let others = (local.validations || []).filter(
                  (r) => r.type !== "password"
                );
                if (e.target.checked)
                  patch({
                    validations: [
                      ...others,
                      { type: "password", min: 8, mustContainNumber: true },
                    ] as any,
                  });
                else patch({ validations: others as any });
              }}
            />
          }
          label="Password rule (min8 + number)"
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <FormControlLabel
        control={
          <Switch
            checked={!!local.derived}
            onChange={(e) => patch({ derived: e.target.checked })}
          />
        }
        label="Derived Field"
      />
      {local.derived && (
        <>
          <TextField
            fullWidth
            label="Parent field ids (comma)"
            value={(local.parents || []).join(",")}
            onChange={(e) =>
              patch({
                parents: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            sx={{ my: 1 }}
          />
          <TextField
            fullWidth
            label="Formula (use `values` object)"
            value={local.formula || ""}
            onChange={(e) => patch({ formula: e.target.value })}
            helperText={`Example: values.dob ? Math.floor((Date.now()-new Date(values.dob))/31557600000) : ''`}
          />
        </>
      )}

      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        {onDelete && (
          <Button color="error" variant="outlined" onClick={onDelete}>
            Delete
          </Button>
        )}
      </Box>
    </Box>
  );
}
