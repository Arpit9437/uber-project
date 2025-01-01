# Backend API Documentation

## User Endpoints

### /users/register Endpoint

**Description**  
Registers a new user by creating a user account with the provided information.

**HTTP Method**  
POST

**Request Body**  
The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters)
  - `lastname` (string, optional): User's last name (minimum 3 characters)
- `email` (string, required): User's email address (must be a valid email)
- `password` (string, required): User's password (minimum 6 characters)

**Example Response**
```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string"
  },
  "token": "string"
}
```

### /users/login Endpoint

**Description**  
Authenticates a user using their email and password, returning a JWT token upon successful login.

**HTTP Method**  
POST

**Request Body**  
The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address (must be a valid email)
- `password` (string, required): User's password (minimum 6 characters)

**Example Response**
```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string"
  },
  "token": "string"
}
```

### /users/profile Endpoint

**Description**  
Retrieves the profile information of the currently authenticated user.

**HTTP Method**  
GET

**Authentication**  
Requires a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

**Example Response**
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "socketId": "string"
}
```

### /users/logout Endpoint

**Description**  
Logout the current user and blacklist the token provided in cookie or headers.

**HTTP Method**  
POST

**Authentication**  
Requires a valid JWT token in the Authorization header or cookie.

**Example Response**
```json
{
  "message": "Logged out."
}
```

## Captain Endpoints

### /captains/register Endpoint

**Description**  
Registers a new captain by creating a captain account with the provided information.

**HTTP Method**  
POST

**Request Body**  
The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): Captain's first name (minimum 3 characters)
  - `lastname` (string, optional): Captain's last name (minimum 3 characters)
- `email` (string, required): Captain's email address (must be a valid email)
- `password` (string, required): Captain's password (minimum 6 characters)
- `vehicle` (object):
  - `color` (string, required): Vehicle color (minimum 3 characters)
  - `plate` (string, required): Vehicle plate number (minimum 3 characters)
  - `capacity` (number, required): Vehicle passenger capacity (minimum 1)
  - `vehicleType` (string, required): Type of vehicle (must be 'car', 'motorcycle', or 'auto')

**Example Response**
```json
{
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "inactive",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "location": {
      "ltd": "number",
      "lng": "number"
    },
    "socketId": "string"
  },
  "token": "string"
}
```

### /captains/login Endpoint

**Description**  
Authenticates a captain using their email and password, returning a JWT token upon successful login.

**HTTP Method**  
POST

**Request Body**  
The request body should be in JSON format and include the following fields:

- `email` (string, required): Captain's email address (must be a valid email)
- `password` (string, required): Captain's password (minimum 6 characters)

**Example Response**
```json
{
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "location": {
      "ltd": "number",
      "lng": "number"
    },
    "socketId": "string"
  },
  "token": "string"
}
```

### /captains/profile Endpoint

**Description**  
Retrieves the profile information of the currently authenticated captain.

**HTTP Method**  
GET

**Authentication**  
Requires a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

**Example Response**
```json
{
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "location": {
      "ltd": "number",
      "lng": "number"
    },
    "socketId": "string"
  }
}
```

### /captains/logout Endpoint

**Description**  
Logout the current captain and blacklist the token provided in cookie or headers.

**HTTP Method**  
POST

**Authentication**  
Requires a valid JWT token in the Authorization header or cookie.

**Example Response**
```json
{
  "message": "Captain logged out."
}
```

## Error Responses

### Validation Error (400)
```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

### Authentication Error (401)
```json
{
  "message": "Invalid email or password"
}
```

### Duplicate Entry Error (400)
```json
{
  "message": "User/Captain already exists"
}
```