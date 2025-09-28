# Student Management System - Postman API Collection

This Postman collection contains all the API endpoints for testing the Student Management System.

## Import Instructions

1. Open Postman
2. Click "Import"
3. Select the `Student-Management-System-API.postman_collection.json` file
4. The collection will be imported with all endpoints ready to test

## Environment Setup

The collection uses these variables:
- `baseUrl`: http://localhost:8080/api/v1
- `accessToken`: Auto-populated after login
- `csrfToken`: Auto-populated after login from cookies

## Testing Flow

### 1. Authentication
- **Login**: Use admin credentials to get access token
  - Username: `admin@school-admin.com`
  - Password: `3OU4zn3q6Zh9`
  - The access token will be automatically saved for other requests

### 2. Students CRUD Operations
- **Get All Students**: Retrieve student list with optional filters
- **Get Student by ID**: Get specific student details
- **Add New Student**: Create new student record
- **Update Student**: Modify existing student data
- **Update Student Status**: Change student status (active/inactive)

### 3. Other Endpoints
- **Classes & Sections**: Manage academic classes and sections
- **Notices**: Create and manage school notices
- **Staff Management**: Handle staff records
- **Dashboard**: Get dashboard statistics

## Demo Scenarios for Interview

### Problem 2 Demo: Students Controller CRUD Testing

1. **Login first** to get authentication token
2. **Test all CRUD operations**:
   - `GET /students` - List all students
   - `POST /students` - Add new student
   - `GET /students/{id}` - Get student details
   - `PUT /students/{id}` - Update student
   - `POST /students/{id}/status` - Update status

3. **Verify responses** show proper data structure and status codes

### Problem 1 Demo: Notice Form Field Testing

1. **Test Notice Creation**:
   - `POST /notices` - Shows 'description' field is working
   - Verify the request uses 'description' not 'content'

## Server Requirements

Make sure these are running before testing:
- **Backend**: http://localhost:8080
- **Frontend**: http://localhost:5174
- **Database**: PostgreSQL with school_mgmt database

## Authentication Notes

- All endpoints (except login) require authentication
- The collection automatically handles bearer token authentication
- **IMPORTANT**: This API also requires CSRF token protection
- Login first to populate both access token and CSRF token variables
- CSRF token is automatically extracted from login response cookies
- All requests include `X-CSRF-Token` header automatically

## CSRF Token Solution

The API uses CSRF protection. After login:
1. CSRF token is saved from `csrfToken` cookie
2. All subsequent requests include `X-CSRF-Token: {{csrfToken}}` header
3. This prevents "Invalid csrf token" errors

## Manual Testing with curl

If testing with curl:
```bash
# 1. Login and save cookies
curl -X POST http://localhost:8080/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"username": "admin@school-admin.com", "password": "3OU4zn3q6Zh9"}' \\
  -c cookies.txt

# 2. Extract CSRF token from cookies.txt (look for csrfToken value)

# 3. Use both cookies and CSRF header
curl -X GET http://localhost:8080/api/v1/students \\
  -H "X-CSRF-Token: YOUR_CSRF_TOKEN_HERE" \\
  -b cookies.txt
```