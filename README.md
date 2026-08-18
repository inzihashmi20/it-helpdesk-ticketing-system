# IT Helpdesk Ticketing System

A full-stack IT Helpdesk Ticketing System developed during the Techox LLP internship program.

The application provides a centralized platform for employees to create and track IT support tickets while allowing administrators to manage users, monitor tickets, update ticket status and priorities, and manage support activities.

---

## Project Overview

The IT Helpdesk Ticketing System is designed to simplify the process of reporting, managing, and tracking IT-related issues within an organization.

The system provides role-based access for:

- Administrators
- Employees

Employees can create support tickets and track their requests.

Administrators can manage users, view and manage tickets, update ticket information, and monitor helpdesk activity through the dashboard.

The application uses a React frontend and Spring Boot REST API backend with MySQL for persistent data storage.

---

## Core Features

### Authentication & Security

- User login
- JWT-based authentication
- Secure password storage using password encoding
- Role-based authorization
- Protected application routes
- Separate access levels for administrators and employees
- Change password functionality
- Automatic logout after password change

### Employee Features

- Login securely
- View personal dashboard
- Create support tickets
- View own tickets
- Search and filter tickets
- View ticket details
- Update ticket information where permitted
- Track ticket status and priority
- Add messages to tickets
- Change account password
- Manage personal account information

### Administrator Features

- View helpdesk dashboard
- Monitor ticket statistics
- View all tickets
- Search and filter tickets
- Create tickets
- Edit tickets
- Delete tickets
- View ticket details
- Add ticket messages
- Manage employees and administrators
- Create users
- Edit user information
- Delete users
- Manage account information
- Change account password

### Dashboard

The dashboard provides an overview of helpdesk activity, including:

- Total tickets
- Open tickets
- In-progress tickets
- Closed tickets
- High-priority tickets

The dashboard content is adjusted according to the user's role.

---

## Technology Stack

### Backend

- Java 17
- Spring Boot 4.1.0
- Spring Web MVC
- Spring Data JPA
- Spring Security
- Spring Validation
- MySQL
- Lombok
- JSON Web Token (JWT)
- Maven

### Frontend

- React 19
- Vite
- JavaScript
- Axios
- React Router
- React Hot Toast

### Database

- MySQL

---

## Application Architecture

The application follows a client-server architecture.

```text
React Frontend
       |
       | HTTP / REST API
       v
Spring Boot Backend
       |
       +---- Spring Security
       |
       +---- JWT Authentication
       |
       +---- Service Layer
       |
       +---- Repository Layer
       |
       v
     MySQL