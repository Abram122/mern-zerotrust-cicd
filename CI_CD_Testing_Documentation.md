# Automated Testing & CI/CD Pipeline Documentation

This document outlines the professional Automated Testing and Continuous Integration/Continuous Deployment (CI/CD) pipeline integrated into the MERN stack project.

## 🎯 Overview

The objective of this integration is to ensure code quality, prevent regressions, and automate the validation process. The pipeline is designed to automatically execute unit and integration tests across both the frontend (React/Vite) and backend (Express/MongoDB) whenever new code is pushed to the repository.

## 🛠️ Technology Stack

* **Frontend:**
  * **Vitest:** A blazing fast unit test framework powered by Vite. Used as the modern, high-performance alternative to Jest.
  * **React Testing Library:** Used to test React components by simulating user behavior and interactions.
  * **JSDOM:** Simulates a browser environment in Node.js for testing React components.
* **Backend:**
  * **Jest:** A comprehensive JavaScript testing framework used for backend unit testing.
  * **Supertest:** An HTTP assertion library used to test Express API endpoints (Integration Testing).
  * **MongoDB Memory Server:** Spins up an actual, temporary in-memory MongoDB instance for testing. This ensures tests interact with a real database engine without polluting the production or development databases.
* **CI/CD Platform:**
  * **GitHub Actions:** Automates the testing workflow on every push or pull request to the main branch.

---

## 🏗️ Architecture & Implementation Details

### 1. Backend Testing Setup
* **Configuration:** Jest is configured via `package.json` to run using `cross-env NODE_ENV=test` to ensure the server behaves appropriately under test conditions.
* **Server Adaptation:** The `server.js` file was refactored to conditionalize the `app.listen()` and `mongoose.connect()` functions. This prevents port collisions and allows `Supertest` to directly invoke the Express app.
* **Database Isolation:** Tests utilize `mongodb-memory-server`. In the `beforeAll` hook of our test suites, a temporary database is spun up, connected to, and populated. In the `afterAll` hook, the connection is closed and the memory server is completely wiped and stopped.
* **Example:** `backend/tests/auth.test.js` tests the `/api/auth/login` endpoint to ensure unauthorized users are properly rejected.

### 2. Frontend Testing Setup
* **Configuration:** Vitest is integrated directly into `vite.config.js`. A dedicated `setupTests.js` file imports `@testing-library/jest-dom` to provide custom DOM element matchers (e.g., `toBeInTheDocument()`).
* **Component Testing:** React components are wrapped in necessary providers (like `AuthContext` and `MemoryRouter`) during tests to simulate the real application tree.
* **Example:** `frontend/src/components/Navbar.test.jsx` verifies conditional rendering logic—ensuring "Login/Register" buttons appear for guests, and "Logout/My Profile" buttons appear for authenticated users.

### 3. CI/CD Workflow (GitHub Actions)
The workflow is defined in `.github/workflows/ci.yml`.
* **Triggers:** Executes on `push` and `pull_request` to the `main` or `master` branches.
* **Environment:** Runs on a clean `ubuntu-latest` virtual machine using Node.js v20.
* **Parallel Execution:** The workflow defines two separate jobs: `test-backend` and `test-frontend`.
  * **Steps executed per job:**
    1. Check out the repository code.
    2. Setup Node.js environment.
    3. Navigate to the respective directory (`./backend` or `./frontend`).
    4. Install dependencies (`npm install`).
    5. Execute the test suite (`npm test`).

---

## 🚀 How to Run Tests Locally

### Backend
Navigate to the backend directory and run the test script:
```bash
cd backend
npm test
```
*Note: You do not need to start your local MongoDB server; the tests will spin up their own isolated instance.*

### Frontend
Navigate to the frontend directory and run the test script:
```bash
cd frontend
npm test
```
*Note: Vitest runs in watch mode by default. If you make changes to a component, the test will automatically re-run.*

---

## 🔄 CI/CD Pipeline Execution

No manual intervention is required to trigger the CI pipeline. Simply commit your code and push it to GitHub:

```bash
git add .
git commit -m "Your descriptive commit message"
git push
```

Upon pushing, navigate to the **"Actions"** tab in your GitHub repository. You will see the pipeline executing in real-time. 
* If all tests pass, the commit will receive a ✅. 
* If any test fails, the commit will receive a ❌, and you can click into the logs to see exactly which test failed and why.
