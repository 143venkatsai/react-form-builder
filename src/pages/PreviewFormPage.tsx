import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import FormRenderer from "../components/FormRenderer";
import { Box, Typography, Button } from "@mui/material";
import { RootState } from "../store";

export default function PreviewFormPage() {
  const params = useParams();
  const formId = params.formId;
  const forms = useAppSelector((s: RootState) => s.forms.forms);
  const navigate = useNavigate();

  const form = formId ? forms.find((f) => f.id === formId) : undefined;

  if (!form) {
    return (
      <Box>
        <Typography variant="h6">No form found to preview.</Typography>
        <Button onClick={() => navigate("/create")}>Go to Create</Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {form.name}
      </Typography>
      <FormRenderer form={form} />
    </Box>
  );
}
