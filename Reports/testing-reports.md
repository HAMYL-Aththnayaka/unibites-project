
# Digital Canteen System - Testing & Debugging Report

**Project Version:** 1.2.0 (Mobile & Backend Integration)  
**Date:** January 14–27, 2026  
**Status:** Resolved / Under Review  
**Environment:** Node.js v22.14.0, Expo (React Native), MongoDB  

---

## 1. Executive Summary
This report consolidates all testing, debugging, and fixes for the Digital Canteen System, including the Helping Hand (HH) Order Management module. Key objectives were to resolve data synchronization bugs, automate order flow, and ensure backend-frontend integration works seamlessly. Critical bugs related to order duplication, schema mismatch, delayed order visibility, and authentication persistence were resolved.

---

## 2. Bug Registry & Analysis

### 2.1 Backend & Database Bugs
| Bug ID | Component | Issue Description | Root Cause | Status |
|--------|-----------|-----------------|------------|--------|
| B001 | Backend | `SyntaxError: listOrders not provided` | Missing export keyword in `orderController.js` | Resolved |
| B002 | Backend | `TypeError: Cannot read properties of _id` | Auth Middleware used `userId` while Controller expected `req.user._id` | Resolved |
| B003 | Database | Mongoose Validation: `amount` is required` | Controller used `totalAmount` (Mobile) while Schema required `amount` (Web) | Resolved |
| B004 | Frontend | "Nothing happens" on Place Order | Circular reference crash caused by passing a React Event into Axios | Resolved |
| B005 | Admin | Order not deleting after "Add to HH" | Duplicate if blocks with a return statement blocking the delete logic | Resolved |

### 2.2 Helping Hand (HH) Module Bugs
| Bug ID | Description | Impact | Root Cause | Fix |
|--------|------------|--------|------------|-----|
| HH-01 | Orders manually added to HH | High risk of human error, delayed processing | No dedicated order schema | Created `HelpingHandOrder` schema, automated insertion |
| HH-02 | No time-based order visibility | Violated system requirement, confusion | Missing `visibleAt` logic | Added `visibleAt` field; orders visible after 30 mins |
| HH-03 | Schema misuse | Data inconsistency | Food schema used for orders | Separated food and order models |
| HH-04 | No order status tracking | Hard to manage active orders | Missing `status` field | Added `status` field (`pending`, `visible`, `completed`) |

### 2.3 Other Identified Bugs
| Bug ID | Module | Issue | Severity | Fix |
|--------|--------|-------|---------|-----|
| BUG-001 | Order API | POST create-order returns 500 Error | High | Added try-catch in backend, server-side validation, Axios interceptor for frontend |
| BUG-002 | Auth | Token not saved in local storage | Medium | Integrated `AsyncStorage.removeItem('token')` in logout hook |
| B002 | API Schema Mismatch | UI fails to render food items if backend key is lowercase | Medium | Flexible key checking: `res.data.Data || res.data.data || []` |
| B003 | Memory Leak / State Bloat | Cart items set to 0 but ID remains | Low | Destructured keys removed on quantity = 0 |
| B004 | Performance Bottleneck | `getTotalCartAmount` recalculates excessively | Medium | Wrapped function in `useCallback` and optimized list search |

---

## 3. Detailed Debugging & Fixes

### 3.1 Circular Reference Silent Crash (Mobile)
**Observation:** Clicking "Place Order" resulted in no feedback.  
**Fix:** Passed only data object instead of full React Event:
```javascript
<TouchableOpacity onPress={() => onPlaceOrder(data)} />
```

### 3.2 Platform Schema Conflict (Web vs Mobile)
**Observation:** Website worked; Mobile returned 500 error.  
**Fix:** Backend handles both `amount` and `totalAmount`:
```javascript
const finalAmount = totalAmount !== undefined ? totalAmount : amount;
```

### 3.3 Administrative Logic Flow (Add to HH)
**Observation:** Orders copied to HH but remained in Active Orders.  
**Fix:** Merged duplicate if blocks into atomic operation; deletion verified:
```javascript
await helpingHandModel.insertMany(order.items.map(item => ({
  name: item.name,
  price: 0,
  canteen: req.body.canteen || "Applied-Canteen",
  image: item.image || "default.png"
})));
const result = await orderModel.findByIdAndDelete(orderId);
if (!result) throw new Error("Deletion failed: Order ID not found");
```

### 3.4 StoreContextProvider Fixes
- **Auth Persistence:** Cleared AsyncStorage token on logout.  
- **Data Sync:** Cart items match backend after refresh.  
- **Memory/Performance:** Optimized cart and price calculations.

---

## 4. Test Cases & Results

### 4.1 HH Order Management
| Test Case ID | Description | Expected Result | Status |
|--------------|------------|----------------|--------|
| TC-01 | Place HH order | Order saved with delay | Pass |
| TC-02 | Check orders before 30 mins | Order hidden | Pass |
| TC-03 | Check orders after 30 mins | Order visible | Pass |
| TC-04 | Verify food-order separation | No data conflict | Pass |
| TC-05 | Multiple HH orders | All delayed correctly | Pass |

### 4.2 Backend & API
| Test Case ID | Scenario | Expected Result | Actual Result | Status |
|--------------|---------|----------------|---------------|--------|
| TC-01 | Update status to "Add to HH" | Items added to HH; Order deleted | Order NOT deleted (Before Fix) | FAILED |
| TC-02 | Update status to "Add to HH" | Items added to HH; Order deleted | Items added; Order deleted | PASSED |
| TC-03 | Free Order (Amount=0) | System marks as paid | System marks paid | PASSED |
| TC-04 | Update status to "Delivered" | Order deleted | Order deleted | PASSED |

### 4.3 Regression & Network Tests
- Positive Test: Create order with valid data → Pass  
- Negative Test: Create order with empty cart → Pass  
- Network Latency Test: Simulated slow 3G → Pass  

---

## 5. Final System State
- **Authentication:** Backend adapts to `req.body.userId`, `req.userId`, `req.user._id`.  
- **Navigation:** Mobile uses `router.replace('/(tabs)')` to prevent empty checkout navigation.  
- **UI Consistency:** "Helping Hand" screen now mirrors "Home" screen (large rounded cards, orange theme, professional headers).  
- **Order Automation:** Orders automatically added to HH with delayed visibility and status tracking.

---

## 6. Conclusion
The Digital Canteen System, including the Helping Hand module, has been fully tested, debugged, and optimized. All critical bugs were resolved, automation implemented, and the system is now scalable, reliable, and production-ready. Functional and integration tests confirm consistent behavior across mobile and web platforms.
