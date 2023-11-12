const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "title": "Grab Restaurant API",
        "description": "All RESTful API Endpoint for Grab Restaurant",
        "version": "0.0.1"
    },
    "paths": {
        "/api/v1/auth/login": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Sign in for Carental",
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successfully signed in",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "user":{
                                            "_id": {
                                                "type": "string"
                                            },
                                            "firstname": {
                                                "type": "string"
                                            },
                                            "lastname": {
                                                "type": "string"
                                            },
                                            "email": {
                                                "type":"string"
                                            },"role":{
                                                "type":"string"
                                            },"orderRentedCar":{
                                                "type":"array"
                                            }
                                        },
                                        "accessToken": {
                                            "type": "string"
                                        },
                                        "refreshToken":{
                                            "type":"string"
                                        }
                                    },
                                    "example": {
                                        "user": {
                                            "_id": "654bc179fabc3f5e1bbfbfe2",
                                            "firstname": "admin01",
                                            "lastname": "admin01",
                                            "email": "admin01@gmail.com",
                                            "role": "admin",
                                            "orderRentedCar": []
                                          },
                                          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRiYzE3OWZhYmMzZjVlMWJiZmJmZTIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk3MDI4MDEsImV4cCI6MTY5OTcwNjQwMX0.KzkgCrJyZSYLysfNDp_u4X6OvS_Z0xzZcfacGkxwScg",
                                          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRiYzE3OWZhYmMzZjVlMWJiZmJmZTIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk3MDI4MDEsImV4cCI6MTY5OTc4OTIwMX0.iAdAIQufYR2nUj7zqH5sdgDMpRUBzfLAdDBq1du849I"
                                      }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/v1/auth/register": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Sign up for Carental",
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "firstname": {
                                    "type": "string"
                                },
                                "lastname": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "email": {
                                    "type": "string"
                                },
                                
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successfully signed up",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "user":{
                                            "_id": {
                                                "type": "string"
                                            },
                                            "firstname": {
                                                "type": "string"
                                            },
                                            "lastname": {
                                                "type": "string"
                                            },
                                            "email": {
                                                "type":"string"
                                            },"role":{
                                                "type":"string"
                                            },"orderRentedCar":{
                                                "type":"array"
                                            }
                                        },
                                        "accessToken": {
                                            "type": "string"
                                        },
                                        "refreshToken":{
                                            "type":"string"
                                        }
                                    },
                                    "example": {
                                        "user": {
                                          "username": "test01",
                                          "email": "test01@gmail.com",
                                          "password": "$2a$10$vyLY02h2lT5wC1wJYhWBge7F9FrjkZNOmbGjSUih6pq57o6V54kPW",
                                          "role": "user",
                                          "updatedAt": "2023-10-30T05:43:55.629Z",
                                          "createdAt": "2023-10-30T05:43:55.629Z"
                                        },
                                        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QwMSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4NjQ0NjM1LCJleHAiOjE2OTg2NDgyMzV9.HJ-Fn4Ck9merhMe2Gfcafv5WRNnjUzBPd0iQLyY5quI",
                                        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QwMSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4NjQ0NjM1LCJleHAiOjE2OTg3MzEwMzV9.alzkg4AulCU0ln2dvIad9rhnpKxMv88nFMIehwRAw0w"
                                      }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/v1/car": {
            "get": {
                "tags": [
                    "Car"
                ],
                "summary": "Get a list of all car",
                "parameters": [
                    {
                        "name": "Authorization",
                        "in": "header",
                        "type": "string", 
                        "description": "**Provide 'Bearer' front of your token ",
                        "required": true,
                    }
                  ],
                "responses": {
                    "200": {
                        "description": "Successfully retrieved list of car",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "_id":{
                                                "type":"string"
                                            },
                                            "car_id":{
                                                "type":"string"
                                            },
                                            "brand":{
                                                "type":"string"
                                            },
                                            "model":{
                                                "type":"string"
                                            },
                                            "system":{
                                                "type":"string"
                                            },
                                            "seat":{
                                                "type":"number"
                                            },
                                            "image":{
                                                "type":"string"
                                            },
                                            "price":{
                                                "type":"number"
                                            },
                                            "location":{
                                                "type":"string"
                                            }
                                        }
                                    },"example":[
                                        {
                                            "_id": "654bc0fbe96c87caaac37d41",
                                            "car_id": "CF-38-Q-095",
                                            "brand": "Toyota",
                                            "model": "XB-378-BA",
                                            "system": "Automatic",
                                            "seat": 4,
                                            "image": "https://purepng.com/public/uploads/large/purepng.com-toyotatoyotamotor-corporationautomotivemanufactureraichimultinational-1701527678510h6ezr.png",
                                            "price": 1300,
                                            "location": "Bangkok",
                                            "__v": 0
                                          },
                                          {
                                            "_id": "654bc0fbe96c87caaac37d40",
                                            "car_id": "CK-24-FD-8",
                                            "brand": "Toyota",
                                            "model": "JS-794-KO",
                                            "system": "Automatic",
                                            "seat": 4,
                                            "image": "https://purepng.com/public/uploads/large/purepng.com-toyotatoyotamotor-corporationautomotivemanufactureraichimultinational-1701527678653sdbwk.png",
                                            "price": 1300,
                                            "location": "Hua Hin",
                                            "__v": 0
                                          },
                                    ]
                                }
                            }
                        }
                    }
                },"security": [ { "bearerAuth": [] } ]
            },
            "post": {
                "tags": [
                    "Car"
                ],
                "summary": "Create a new car",
                "parameters": [
                    {
                        "name": "Authorization",
                        "in": "header",
                        "type": "string", 
                        "description": "**Provide 'Bearer' front of your token ",
                        "required": true,
                    },
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "car_id": {
                                    "type": "string"
                                },
                                "brand": {
                                    "type": "string"
                                },
                                "model": {
                                    "type": "string"
                                },
                                "system": {
                                    "type": "string"
                                },
                                "seat":{
                                    "type":"number"
                                },
                                "image":{
                                    "type":"string"
                                },
                                "price":{
                                    "type":"number"
                                },
                                "location":{
                                    "type":"string"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successfully created a new car  "
                    }
                },"security": [ { "bearerAuth": [] } ]
            }
        },
        "/api/v1/car/{id}": {
            "put": {
                "tags": [
                    "Car"
                ],
                "summary": "Update a car by ID",
                "parameters": [
                    {
                        "name": "Authorization",
                        "in": "header",
                        "type": "string", 
                        "description": "**Provide 'Bearer' front of your token ",
                        "required": true,
                    },
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "car_id": {
                                    "type": "string"
                                },
                                "brand": {
                                    "type": "string"
                                },
                                "model": {
                                    "type": "string"
                                },
                                "system": {
                                    "type": "string"
                                },
                                "seat": {
                                    "type": "number"
                                },
                                "image": {
                                    "type": "string"
                                },
                                "price": {
                                    "type": "number"
                                },
                                "location": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successfully updated car by Id"
                    }
                },"security": [ { "bearerAuth": [] } ]
            },
            "delete": {
                "tags": [
                    "Car"
                ],
                "summary": "Delete a Car by ID",
                "parameters": [
                    {
                        "name": "Authorization",
                        "in": "header",
                        "type": "string", 
                        "description": "**Provide 'Bearer' front of your token ",
                        "required": true,
                    },
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successfully deleted restaurant by Id"
                    }
                },"security": [ { "bearerAuth": [] } ]
            }
        },
        "/api/v1/order/": {
            "get": {
                "tags": [
                    "Order"
                ],
                "summary": "Get list of all order",
                "parameters": [
                    {
                        "name": "Authorization",
                        "in": "header",
                        "type": "string", 
                        "description": "**Provide 'Bearer' front of your token ",
                        "required": true,
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successfully retrieved list of all order"
                    }
                },"security": [ { "bearerAuth": [] } ]
            },
            "post": {
                "tags": [
                    "Order"
                ],
                "summary": "Make renting car order",
                "parameters": [
                    {
                        "name": "Authorization",
                        "in": "header",
                        "type": "string", 
                        "description": "**Provide 'Bearer' front of your token ",
                        "required": true,
                    },
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "car": {
                                    "type": "string"
                                },
                                "date_start": {
                                    "type": "string"
                                },
                                "date_return": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successfully Made order "
                    }
                },"security": [ { "bearerAuth": [] } ]
            }
        }
        },
        "/api/v1/order/{id}": {
            "put": {
                "tags": [
                    "Order"
                ],
                "summary": "Approve a Order by ID",
                "parameters": [
                    {
                        "name": "Authorization",
                        "in": "header",
                        "type": "string", 
                        "description": "**Provide 'Bearer' front of your token ",
                        "required": true,
                    },
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    },
                ],
                "responses": {
                    "200": {
                        "description": "Your Order was approved!"
                    }
                },"security": [ { "bearerAuth": [] } ]
            },
            "delete": {
                "tags": [
                    "Order"
                ],
                "summary": "Delete a Order by ID",
                "parameters": [
                    {
                        "name": "Authorization",
                        "in": "header",
                        "type": "string", 
                        "description": "**Provide 'Bearer' front of your token ",
                        "required": true,
                    },
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successfully deleted Order by Id"
                    }
                },"security": [ { "bearerAuth": [] } ]
            }
        }
    
  }

  export default swaggerDocument

