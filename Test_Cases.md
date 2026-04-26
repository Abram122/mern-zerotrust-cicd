# Comprehensive Test Cases

This document outlines the test cases for verifying the Student Portal functionality.

## 1. Authentication System

| ID | Feature | Test Step | Expected Result |
|:---|:---|:---|:---|
| **AUTH-01** | Register | Submit form with email `student@gmail` (no TLD) | **FAIL**: HTML5 validation blocks submission. Backend rejects it if bypassed. |
| **AUTH-02** | Register | Submit form with valid email `student@gmail.com` | **PASS**: Account created and user logged in. |
| **AUTH-03** | Register | Submit duplicate email | **FAIL**: "User already exists" error shown. |
| **AUTH-04** | Login | Enter wrong password twice | **PASS**: "Invalid Credentials" shown. |
| **AUTH-05** | Login | Enter wrong password 3rd time | **PASS**: Account locked. Email sent. Unlock field appears. |
| **AUTH-06** | Login | Enter wrong unlock code (4th attempt) | **PASS**: User redirected to "Blocked" page. |
| **AUTH-07** | Logout | Click Logout button | **PASS**: Token cleared, redirected to Login page. |

## 2. Profile Management

| ID | Feature | Test Step | Expected Result |
|:---|:---|:---|:---|
| **PROF-01** | Privacy | Access `/` without being logged in | **PASS**: Redirected to `/login`. |
| **PROF-02** | Update | Change name and click "Save Changes" | **PASS**: "Profile updated successfully" message appears. |
| **PROF-03** | Password | Update password with < 6 chars | **FAIL**: "Please enter a password with 6 or more characters" shown. |
| **PROF-04** | Upload | Upload a `.png` file | **FAIL**: Error "Only JPG format is allowed!" shown. |
| **PROF-05** | Upload | Upload a `.jpg` file > 5MB | **FAIL**: Error "File too large" shown. |

## 3. UI/UX & Aesthetics

| ID | Feature | Test Step | Expected Result |
|:---|:---|:---|:---|
| **UI-01** | Visibility | Click eye icon on password field | **PASS**: Password switches from dots to visible text. |
| **UI-02** | Navigation | Click "Elsewedy University" in Navbar | **PASS**: Opens official site in a new tab. |
| **UI-03** | Responsive | Resize browser to mobile width | **PASS**: Navbar collapses and forms stack vertically. |
| **UI-04** | SPA | Click links while watching browser refresh icon | **PASS**: Icon does not spin (no page reload). |
