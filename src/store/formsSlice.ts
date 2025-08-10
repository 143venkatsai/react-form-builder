import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormSchema } from "../types";

const LOCAL_KEY = "forms_storage_v1";

const load = (): FormSchema[] => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as FormSchema[];
  } catch (e) {
    console.error("Failed to load forms from localStorage", e);
    return [];
  }
};

const save = (forms: FormSchema[]) => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(forms));
  } catch (e) {
    console.error("Failed to save forms to localStorage", e);
  }
};

const initialState: { forms: FormSchema[] } = {
  forms: load(),
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addForm(state, action: PayloadAction<FormSchema>) {
      state.forms.push(action.payload);
      save(state.forms);
    },
    updateForm(state, action: PayloadAction<FormSchema>) {
      const idx = state.forms.findIndex((f) => f.id === action.payload.id);
      if (idx >= 0) state.forms[idx] = action.payload;
      save(state.forms);
    },
    deleteForm(state, action: PayloadAction<string>) {
      state.forms = state.forms.filter((f) => f.id !== action.payload);
      save(state.forms);
    },
  },
});

export const { addForm, updateForm, deleteForm } = formsSlice.actions;
export default formsSlice.reducer;
