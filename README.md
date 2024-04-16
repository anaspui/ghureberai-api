GhureBerai - Your Ultimate Travel Companion
-------------------------------------------

Welcome to GhureBerai, your go-to travel agency website designed to make your travel experiences seamless and unforgettable. Explore exotic destinations, plan your dream trips, and embark on adventures with ease, all through GhureBerai.

About
-----

This repository houses the project "ghureBerai-api," developed as part of the "Advanced Web Technologies" course during the Spring semester of 2022-2023. GhureBerai serves as a comprehensive travel agency website, empowering users to discover diverse travel destinations and meticulously plan their journeys.
<br>
[Frontend](https://github.com/anaspui/ghureberai-web)

Instructor
----------

-   [MIR MD. KAWSUR](https://cs.aiub.edu/profile/kawsur)

Author
------

-   [Mohammad Omar](https://www.github.com/anaspui)

Technologies Utilized
---------------------

GhureBerai is built using cutting-edge technologies to ensure a seamless user experience:

-   NestJS
-   TypeORM
-   PostgreSQL
-   JWT (JSON Web Tokens)
-   SMTP Mailer
-   Hashing
-   class-validator
-   class-transformer
-   TJS Cookies


Endpoints
------------
<details>
  <summary>API Endpoints</summary>

  1. **Add Admin**
     - Method: POST
     - URL: `http://localhost:3000/admin/addadmin`
     - Request Body:
       ```json
       {
           "Username": "",
           "Password": "",
           "Email": ""
       }
       ```

  2. **Registration**
     - Method: POST
     - URL: `http://localhost:3000/registration`
     - Request Body:
       ```json
       {
           "Username": "",
           "Password": "",
           "FirstName": "",
           "LastName": "",
           "Dob": "",
           "Email": "",
           "Phone": "",
           "Address": "",
           "Picture": "",
           "Gender": ""
       }
       ```

  3. **Login**
     - Method: POST
     - URL: `http://localhost:3000/auth/login`
     - Request Body:
       ```json
       {
           "Username": "",
           "Password": ""
       }
       ```

  4. **Logout**
     - Method: POST
     - URL: `http://localhost:3000/auth/logout`

  5. **View Users**
     - Method: GET
     - URL: `http://localhost:3000/admin/allusers`

  6. **Add Employee**
     - Method: POST
     - URL: `http://localhost:3000/admin/addEmployee`
     - Request Body:
       ```json
       {
           "Username": "",
           "Password": "",
           "Email": ""
       }
       ```

  7. **View All Employees**
     - Method: GET
     - URL: `http://localhost:3000/admin/viewEmployees`

  8. **Update Employee**
     - Method: PUT
     - URL: `http://localhost:3000/admin/updateEmployee/466`
     - Request Body:
       ```json
       {
           "Username": "",
           "Password": ""
       }
       ```

  9. **Delete Employee**
     - Method: POST
     - URL: `http://localhost:3000/admin/deleteEmployee/56`

  10. **Session Dump**
      - Method: GET
      - URL: `http://localhost:3000/sessiondump`

  11. **Approve Hotel Manager**
      - Method: PUT
      - URL: `http://localhost:3000/admin/approveHotelManager/45`

  12. **User**
      - Method: GET
      - URL: `http://localhost:3000/user`

  13. **Show All Packages**
      - Method: GET
      - URL: `http://localhost:3000/admin/showallpackages`

  14. **Show All Transport**
      - Method: GET
      - URL: `http://localhost:3000/admin/showalltpmanager`

  15. **Show All Hotel**
      - Method: GET
      - URL: `http://localhost:3000/admin/showallhotel`

  16. **Show All Hotel Manager**
      - Method: GET
      - URL: `http://localhost:3000/admin/showallhotelmanager`

</details>

Installation
------------

To access GhureBerai, follow these simple steps:

1.  Clone this repository to your local machine using the following command:

`git clone https://github.com/anaspui/ghureberai-api.git`

1.  Set up the local environment.

2.  Run the project:


`npm run start:dev`

Once the project is successfully running, you can explore the endpoints using Postman or any similar application.

Contributing
------------

We welcome contributions from the community! If you encounter a bug or have an idea for a new feature, feel free to create a pull request with your changes.

License
-------

This project is licensed under the [MIT License](https://chat.openai.com/c/LICENSE). Feel free to use, modify, and distribute it as per the terms of the license.
