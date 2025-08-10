import React from "react";
import { useAppSelector } from "../hooks";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
} from "@mui/material";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteForm } from "../store/formsSlice";

export default function MyFormsPage() {
  const forms = useAppSelector((s: RootState) => s.forms.forms);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box>
      <List>
        {forms.map((f) => (
          <ListItem
            key={f.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => dispatch(deleteForm(f.id))}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton onClick={() => navigate(`/preview/${f.id}`)}>
              <ListItemText
                primary={f.name}
                secondary={new Date(f.createdAt).toLocaleString()}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
