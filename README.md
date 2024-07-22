# social-network-api-mongodb

# Social Network API

## Description

The Social Network API is a RESTful API built with Node.js, Express.js, and MongoDB using Mongoose. This API allows users to create, read, update, and delete thoughts, as well as reactions to those thoughts. Users can also have multiple thoughts and manage reactions within those thoughts.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation and Usage
* ```npm i``` to get all the node modules
* ```npm run seed``` to seed the data
* ```node server`` to start server
* Go to insomnia to test api endpoints
* ```http://localhost:3000/api``` 

## API Endpoints

* Users
- GET /api/users: Get all users
- GET /api/users/:id: Get a single user by ID
- POST /api/users: Create a new user
- PUT /api/users/:id: Update a user by ID
- DELETE /api/users/:id: Delete a user by ID
* Thoughts
- GET /api/thoughts: Get all thoughts
- GET /api/thoughts/:id: Get a single thought by ID
- POST /api/thoughts: Create a new thought
- PUT /api/thoughts/:id: Update a thought by ID
- DELETE /api/thoughts/:id: Delete a thought by ID
* Reactions
- POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Delete a reaction from a thought

## Links
* [Github Repo Link](https://github.com/veyselarslan12/social-network-api-mongodb)
* [Test Video Link](https://drive.google.com/file/d/1ZVDoXHiEse5RcY9r-8FlSEwCMOtvkLZF/view)
