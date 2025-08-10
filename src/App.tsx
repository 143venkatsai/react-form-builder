import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateFormPage from "./pages/CreateFormPage";
import PreviewFormPage from "./pages/PreviewFormPage";
import MyFormsPage from "./pages/MyFormsPage";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

export default function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            Form Builder
          </Typography>
          <Button color="inherit" component={Link} to="/create">
            Create
          </Button>
          <Button color="inherit" component={Link} to="/preview">
            Preview
          </Button>
          <Button color="inherit" component={Link} to="/myforms">
            My Forms
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<CreateFormPage />} />
          <Route path="/create" element={<CreateFormPage />} />
          <Route path="/preview" element={<PreviewFormPage />} />
          <Route path="/preview/:formId" element={<PreviewFormPage />} />
          <Route path="/myforms" element={<MyFormsPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
