# CI/CD Automation with Zero-Trust & Dependabot

This document outlines the professional **Zero-Level Trust** Automated Testing and CI/CD pipeline integrated into the project.

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
* **Advanced Pipeline Jobs:**
  * **Backend Quality Gate:** Runs dependency security audits (`npm audit`) and tests with code coverage analysis.
  * **Frontend Quality Gate:** Runs code linting (`ESLint`), verifies production build success (`npm run build`), and executes unit tests.

---

## 🚀 How to Run Tests Locally

### Backend
Navigate to the backend directory and run:
```bash
cd backend
npm test
```

### Unified Local Quality Gate (Recommended)
As a senior practice, you can run all CI/CD checks (Audit, Lint, Build, and Tests) at once from the root directory before pushing your code:
```powershell
./check-quality.ps1
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

## 🛡️ Automated Safety & Maintenance

### 1. Git Hooks (Husky)
The project is configured with **Husky** to prevent broken code from being committed. 
- **Pre-commit Hook:** Every time you run `git commit`, the system automatically runs `lint-staged` (to check your changed frontend files) and the backend test suite. 
- If these fail, the commit is blocked, ensuring the repository remains stable.

### 2. Automated Updates (Dependabot)
GitHub **Dependabot** is integrated to monitor dependencies in both `./frontend` and `./backend`.
- It will automatically open Pull Requests for security vulnerabilities and version updates.
- Our CI/CD pipeline will verify these updates automatically.

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
