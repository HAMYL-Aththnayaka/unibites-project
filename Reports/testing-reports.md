# Unibites – Digital Canteen System
## Testing Report

### Course Code
IT 3162

### Group Number
Group 10

### Project Name
Unibites – Digital Canteen System

### Tested By
- Name: Ms. Sharanjana R.
- Student ID: 2021/ICT/51
- Role: Tester

### Test Date
26 / 01 / 2026

---

## 1. Introduction
This testing report presents the results of manual testing conducted on the Unibites – Digital Canteen System. The purpose of testing is to ensure that all system functionalities work correctly and meet the defined user requirements.

---

## 2. Test Environment
- Application Type: Web Application
- Browser: Google Chrome
- Operating System: Windows
- Testing Method: Manual Testing

---

## 3. Testing Types
- Manual Testing  
- Functional Testing  
- UI Testing  

---

## 4. User Login Module

| Test Case ID | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Post Condition | Actual Result | Status |
|-------------|--------------|--------------|-----------|----------|----------------|---------------|--------------|--------|
| TC_LOGIN_001 | Login with valid username and password | User has a valid Gmail account | 1. Enter valid username<br>2. Enter valid password<br>3. Click Login | Valid credentials | Successful login | User dashboard displayed | User logged in successfully | PASS |
| TC_LOGIN_002 | Login with valid username and invalid password | User has a valid Gmail account | 1. Enter valid username<br>2. Enter invalid password<br>3. Click Login | Invalid password | Error message displayed | User remains on login page | Error message displayed | PASS |
| TC_LOGIN_003 | Login with invalid username and valid password | User has a valid Gmail account | 1. Enter invalid username<br>2. Enter valid password<br>3. Click Login | Invalid username | Error message displayed | User remains on login page | Error message displayed | PASS |
| TC_LOGIN_004 | Login with invalid username and invalid password | User has a valid Gmail account | 1. Enter invalid username<br>2. Enter invalid password<br>3. Click Login | Invalid credentials | Error message displayed | User remains on login page | Error message displayed | PASS |

---

## 5. User Registration Module

| Test Case ID | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Post Condition | Actual Result | Status |
|-------------|--------------|--------------|-----------|----------|----------------|---------------|--------------|--------|
| TC_REG_001 | Register with valid user details | User is not registered | 1. Enter valid name<br>2. Enter valid email<br>3. Enter valid password<br>4. Click Register | Valid user data | Account created successfully | User account created | Account created successfully | PASS |
| TC_REG_002 | Register with invalid email | User is not registered | 1. Enter valid name<br>2. Enter invalid email<br>3. Enter valid password<br>4. Click Register | Invalid email | Error message displayed | User remains on registration page | Error message displayed | PASS |

---

## 6. Menu Viewing Module

| Test Case ID | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Post Condition | Actual Result | Status |
|-------------|--------------|--------------|-----------|----------|----------------|---------------|--------------|--------|
| TC_MENU_001 | View food menu | User is logged in | 1. Login to system<br>2. Navigate to menu page<br>3. View food items | Available menu items | Menu displayed correctly | Menu page visible | Menu displayed correctly | PASS |

---

## 7. Order Placement Module

| Test Case ID | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Post Condition | Actual Result | Status |
|-------------|--------------|--------------|-----------|----------|----------------|---------------|--------------|--------|
| TC_ORDER_001 | Place food order | User is logged in | 1. Select food items<br>2. Add items to cart<br>3. Click Place Order<br>4. Confirm order | Selected food items | Order placed successfully | Order saved in system | Order placed successfully | PASS |

---

## 8. Payment Module

| Test Case ID | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Post Condition | Actual Result | Status |
|-------------|--------------|--------------|-----------|----------|----------------|---------------|--------------|--------|
| TC_PAY_001 | Make online payment | Order already placed | 1. Select payment method<br>2. Enter payment details<br>3. Click Pay Now<br>4. Confirm payment | Valid payment details | Payment successful | Order confirmed | Payment successful | PASS |

---

## 9. Admin Login Module

| Test Case ID | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Post Condition | Actual Result | Status |
|-------------|--------------|--------------|-----------|----------|----------------|---------------|--------------|--------|
| TC_ADMIN_001 | Admin login with valid credentials | Admin account exists | 1. Enter admin username<br>2. Enter password<br>3. Click Login<br>4. View dashboard | Valid admin credentials | Dashboard loaded successfully | Admin session active | Dashboard displayed | PASS |

---

## 10. Issues Identified
- Minor UI alignment issues in the admin dashboard  
- Notification system requires further enhancement  

---

## 11. Conclusion
The Unibites – Digital Canteen System was successfully tested using manual testing techniques. All core functionalities performed as expected. Minor UI and notification improvements are recommended before final deployment.
