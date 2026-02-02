# React Native Product App

A simple, production-style mobile application built using **React Native CLI** that demonstrates real-world app architecture, state management, API handling, and persistence.

---

## 📱 App Functionality

- Product listing with data fetched from a public API
- Infinite scrolling / pagination
- Search functionality for products
- Global state management using Redux Toolkit
- Local data persistence using AsyncStorage
- Handles app lifecycle (reloads data on app restart)
- Clean and scalable folder structure
- Optimized list rendering using FlatList

---

## 🛠 Tech Stack

- React Native (CLI)
- TypeScript
- Redux Toolkit
- React Redux
- React Navigation
- AsyncStorage
- Public REST API
  
---

## 📂 Folder Structure

src/
-├─ app/ # Redux store setup
-├─ features/ # Feature-based redux slices & APIs
-├─ screens/ # App screens
-├─ components/ # Reusable UI components
-├─ navigation/ # App navigation
-├─ storage/ # Local persistence logic
-└─ assets/ # Images & icons

---

## ▶️ How to Run the Project

### Prerequisites

- Node.js
- Android Studio
- Android SDK
- React Native CLI environment set up

### Steps

 //bash
- git clone https://github.com/TejasGorde67/React-Native-Product-App-
- cd React-Native-Product-App-
- npm install
- npx react-native run-android
