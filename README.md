
#  Library Management API

A RESTful API for managing a library system, built with **Express**, **TypeScript**, and **MongoDB** (Mongoose).



## Features

- CRUD operations for Books with validation
- Borrowing functionality with business logic (availability control)
- Aggregation pipeline to get summary of borrowed books
- Consistent JSON response format
- Proper error handling for validation and not found errors

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB & Mongoose
- dotenv (for environment variables)


## Setup Instructions

### Prerequisites

- Node.js (>= 14.x)
- MongoDB instance (local or MongoDB Atlas)
- npm or yarn package manager


### Installation

1. Clone the repo:

```bash
git clone https://github.com/anamikagain559/Library-Management-API.git
cd library-management-api

```




## Install dependencies:
```bash
npm install
# or
yarn install

```

## Create a .env file in the root directory:


```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000

```


## Start the development server:


```bash
npm run dev
# or
yarn dev

```

The server will start on http://localhost:5000.

    