# React Redux Form Builder

A dynamic **Form Builder** built with **React**, **Redux Toolkit**, and **React Router**.  
This app allows users to **create forms**, **add various field types**, and **view the collected data** in real-time.

---

## 🚀 Features

- Create new forms with customizable names
- Add fields of different types:
  - Text
  - Number
  - Select (Dropdown)
  - Checkbox
  - Derived Field (calculated from other fields)
- Rearrange or remove fields
- Save forms and reuse them
- Fill forms and view submitted data
- Built with **React**, **Redux Toolkit**, and **Material UI**

---

## 🛠️ Tech Stack

- **Frontend Framework:** React + Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **UI Components:** Material UI
- **Language:** TypeScript

---

## 📂 Folder Structure

form-builder/
│── src/
│ ├── components/ # Reusable components
│ ├── pages/ # Page components (Home, FormBuilder, FormFiller, etc.)
│ ├── redux/ # Redux slices and store configuration
│ ├── types/ # TypeScript type definitions
│ ├── utils/ # Utility functions (e.g., formula evaluator)
│ ├── App.tsx # Main App component
│ ├── main.tsx # Entry point
│── public/ # Static assets
│── package.json
│── tsconfig.json
