# Eden Frontend Task
This is a simple task that involves creating an employee management module using React. 


# Task Requirements
* Create two pages: one page to view the employee list and another to view a single employee's info
* The employee list page should allow the addition of new employee and should be paginated
* The employee info page should allow editing
* Don't use CSS frameworks (Such as Bootstrap and MaterialUI)
* Bonus
  - Responsive Design
  
# Instructions
* Fork this repostiry to your personal account
* Clone The repository
* Run the server stub:
  - Install the dependencies
  ```bash
  npm i
  ```
  - Run the server
  ```bash
  npm start
  ```
* Create your react app in the same directory (https://www.npmjs.com/package/create-react-app)
* Complete the requirements
* Send us the link to your **public** repository after completing the task

# API Stub Documentation
The repository includes a script for a simple API stub (server.js). It contains four enpoints:
* GET /employees
  - Query Paramaters
    - **page:** the number of the page
  - Response Example
  ```JSON
  [
    {
      "name": "Michael Scott",
      "age": 45,
      "title": "Regional Manager",
      "id": 1
    },
    {
      "name": "Dwight Schrute",
      "age": 32,
      "title": "Assisstant to the Regional Manager",
      "id": 2
    }
  ]
  ```
* GET /employee/:id
  - Response Example
  ```JSON
  {
    "name": "Michael Scott",
    "age": 45,
    "title": "Regional Manager",
    "id": 1
  }
  ```
* POST /employees
  - Request Example
  ```JSON
  {
    "name": "Michael Scott",
    "age": 45,
    "title": "Regional Manager"
  }
  ```
  - Response Example
  ```JSON
  {
    "name": "Michael Scott",
    "age": 45,
    "title": "Regional Manager",
    "id": 3
  }
  ```
* PATCH /employee/:id
  - Request Example
  ```JSON
  {
    "age": 46
  }
  ```
  - Response Example
  ```JSON
  {
    "name": "Michael Scott",
    "age": 46,
    "title": "Regional Manager",
    "id": 3
  }
  ```




#### Notes: #### 
* Make sure to mention any assumptions you've made, extra features you've added in your email

