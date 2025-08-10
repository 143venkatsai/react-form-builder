import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FieldSchema, FormSchema } from "../types";
import FieldList from "../components/FieldList";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { addForm } from "../store/formsSlice";
import { useNavigate } from "react-router-dom";

export default function CreateFormPage() {
  const [fields, setFields] = useState<FieldSchema[]>([]);
  const [openSave, setOpenSave] = useState(false);
  const [formName, setFormName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addField = (type?: string) => {
    const id = uuid();
    const base: FieldSchema = {
      id,
      type: (type as any) ?? "text",
      label: "New Field",
      required: false,
      defaultValue: "",
      options: [],
      validations: [],
    };
    setFields((prev) => [...prev, base]);
  };

  const handleSave = () => {
    if (!formName.trim()) return;
    const form: FormSchema = {
      id: uuid(),
      name: formName.trim(),
      createdAt: Date.now(),
      fields,
    };
    dispatch(addForm(form));
    setOpenSave(false);
    setFormName("");
    navigate(`/preview/${form.id}`);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Button variant="contained" onClick={() => addField("text")}>
          Add Text
        </Button>
        <Button variant="outlined" onClick={() => addField("number")}>
          Add Number
        </Button>
        <Button variant="outlined" onClick={() => addField("textarea")}>
          Add Textarea
        </Button>
        <Button variant="outlined" onClick={() => addField("select")}>
          Add Select
        </Button>
        <Button variant="outlined" onClick={() => addField("radio")}>
          Add Radio
        </Button>
        <Button variant="outlined" onClick={() => addField("checkbox")}>
          Add Checkbox
        </Button>
        <Button variant="outlined" onClick={() => addField("date")}>
          Add Date
        </Button>
        <Box sx={{ flex: 1 }} />
        <Button
          color="success"
          variant="contained"
          onClick={() => setOpenSave(true)}
        >
          Save Form
        </Button>
      </Box>

      <FieldList fields={fields} onChange={setFields} />

      <Dialog open={openSave} onClose={() => setOpenSave(false)}>
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Form name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSave(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
