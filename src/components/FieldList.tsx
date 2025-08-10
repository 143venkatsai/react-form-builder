import React from "react";
import { FieldSchema } from "../types";
import FieldEditor from "./FieldEditor";
import { Box, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface Props {
  fields: FieldSchema[];
  onChange: (fields: FieldSchema[]) => void;
}

export default function FieldList({ fields, onChange }: Props) {
  const updateAt = (i: number, f: FieldSchema) => {
    const copy = [...fields];
    copy[i] = f;
    onChange(copy);
  };
  const deleteAt = (i: number) => {
    const copy = [...fields];
    copy.splice(i, 1);
    onChange(copy);
  };
  const move = (i: number, j: number) => {
    if (j < 0 || j >= fields.length) return;
    const copy = [...fields];
    const [item] = copy.splice(i, 1);
    copy.splice(j, 0, item);
    onChange(copy);
  };

  return (
    <Box>
      {fields.map((f, i) => (
        <Box key={f.id}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <IconButton size="small" onClick={() => move(i, i - 1)}>
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => move(i, i + 1)}>
              <ArrowDownwardIcon fontSize="small" />
            </IconButton>
          </Box>
          <FieldEditor
            field={f}
            onChange={(next) => updateAt(i, next)}
            onDelete={() => deleteAt(i)}
            otherFields={fields}
          />
        </Box>
      ))}
    </Box>
  );
}
