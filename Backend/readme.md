# User Account Management

This project includes user account creation, login, profile
 retrieval, and logout functionality using Node.js, Express, and MongoDB.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/uber-project-backend.git
    cd uber-project-backend

    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    MONGODB_URI=mongodb://127.0.0.1:27017/UberProject
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:
    ```sh
    npm start
    ```

## User Account Creation

### Endpoint

`POST /users/register`

### Request Body

```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}

