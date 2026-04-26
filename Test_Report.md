# Software Testing Report: Student Portal Web Application

**Team Names & IDs:**
1. ______________________ (ID: __________)
2. ______________________ (ID: __________)
3. ______________________ (ID: __________)
4. ______________________ (ID: __________)
5. ______________________ (ID: __________)

**Testing Team Names & IDs (for peer review):**
1. ______________________ (ID: __________)
2. ______________________ (ID: __________)
3. ______________________ (ID: __________)
4. ______________________ (ID: __________)

---

## 1. Functional Testing & Test Cases

### 1.1 Registration Functionality
| TC ID | Description | Input Data | Expected Result | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| REG-01 | Successful registration with valid data | Valid fields, matching passwords | User created, redirected to login/profile | | |
| REG-02 | Missing required fields | Empty Full Name | Validation error: "Full name is required" | | |
| REG-03 | Invalid Email Format | `test@gmail` (Missing .com) | Error: "Please include a valid email address with a domain" | | |
| REG-04 | Duplicate email registration | Already registered email | Error: "User already exists" | | |
| REG-05 | Password mismatch | Pass: 123456, Confirm: 123 | Error: "Passwords do not match" | | |

### 1.2 Login Functionality & Account Locking
| TC ID | Description | Input Data | Expected Result | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| LOG-01 | Successful login | valid@test.com, correct pass | Login success, redirected to profile dashboard | | |
| LOG-02 | Invalid password (attempts 1-2) | wrong password | Error: "Invalid Credentials" | | |
| LOG-03 | 3 failed attempts (Account lock) | wrong password 3rd time | Error: "Account locked", email sent, unlock field appears | | |
| LOG-04 | Correct code, correct pass | code from email + pass | Account unlocked, login successful | | |
| LOG-05 | Wrong code on 4th attempt | incorrect code | Redirected to **Blocked Page**, account permanently locked | | |
| LOG-06 | Show/Hide Password Toggle | Click eye icon | Password visibility toggles between masked and plain text | | |

### 1.3 Profile Update
| TC ID | Description | Input Data | Expected Result | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| PRO-01 | Update full name | New name | Name updated successfully, profile refreshes | | |
| PRO-02 | Invalid Email Update | `newemail@gmail` | Error: "Please include a valid email address with a domain" | | |
| PRO-03 | Change Password | New 6+ char password | Password updated successfully | | |

### 1.4 Image Upload Validation
| TC ID | Description | Input Data | Expected Result | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| IMG-01 | Upload valid JPG | profile.jpg (2MB) | Image uploaded and displayed on profile | | |
| IMG-02 | Upload invalid format | profile.png | Error: "Only JPG format is allowed!" | | |
| IMG-03 | File too large | image.jpg (6MB) | Error: "File too large" (Max 5MB) | | |

---

## 2. Boundary Value Analysis

**BVA for Password Length (Rule: Min 6 characters):**
| Test Case | Password Length | Expected Result |
|---|---|---|
| Below bound (5 chars) | `12345` | Error: "Please enter a password with 6 or more characters" |
| On bound (6 chars) | `123456` | Accepted |
| Above bound (7 chars) | `1234567` | Accepted |

---

## 3. Single Page Application (SPA) Verification
- **SPA-01**: Navigate between Home, Profile, and Login. Observe browser refresh icon.
- **Expected**: No full page reloads; only the components swap instantly.

---

## 4. Manual Peer Testing Evaluation (To be filled during session)
*Use this section to document bugs found when testing another team's project.*

| Bug ID | Feature | Description of Bug | Severity (High/Med/Low) |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
