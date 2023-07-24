# Calculator API

## Previous work

Create a `.env` file that should contain the next
```
MONGO_USER=
MONGO_PASS=
MONGO_URL=
JWT_PASS=
PORT=
```
This api use a mongodb database and JWT for access tokens.


## Install
Run `npm install` command

## Run
Run `npm start` command. To start using the api you need to first `login` or `signup`.

## Endpoints

### Signup
`POST /api/v1/users`

Body
````
{
    "username": "test@gmail.com",
    "password": "testpassword"
}
```````

### Login
`POST /api/v1/users/login`
````
{
    "username": "test@gmail.com",
    "password": "testpassword"
}
```````

### Logout
`GET /api/v1/users/logout`

### Create a Record
`POST /api/v1/records`
````
{
    "operation_id": "summary_operation_id",
    "operand1": "12",
    ,"operand2": "5"
}
```````

### Delete a Record
`DELETE /api/v1/records/:recordId`

### Get all records of a user
`GET /api/v1/records`

### Get all operations
`GET /api/v1/operations`