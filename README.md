# Westminster Skin Consultation - Modernized Web Application

This project is a complete modernization of an original Java Swing desktop application into a full-stack, cloud-native web application. It transitions a legacy system into a modern, scalable, and secure platform using industry-standard technologies like React, Spring Boot, MongoDB, and Google Cloud Platform.

## The Original Application: A Java Swing Desktop App

The initial project was a university coursework assignment designed to demonstrate Object-Oriented Programming (OOP) principles in Java. It functioned as a skin consultation management system with two distinct user experiences.

**Original project repository:** [Skin-Consultation-Managing-Program](https://github.com/vidushraj1/Skin-Consultation-Managing-Program)

### Original Functionality

*   **Administrator CLI:** A Command-Line Interface (CLI) for managers to perform administrative tasks. This included adding new doctors, deleting doctors by their medical license number, and saving the list of doctors to a local file for data persistence.
*   **Patient GUI:** A Graphical User Interface (GUI) built with **Java Swing** for patients. This interface allowed users to:
    *   View and sort a list of available doctors.
    *   Book a consultation for a specific doctor and time.
    *   Check for doctor availability. If a doctor was unavailable, the system would automatically and randomly assign another available doctor.
    *   View their past booking history after "logging in" with their patient ID and a password created during their first booking.

### Original Technology Stack

*   **Language:** Java
*   **UI Framework:** Java Swing
*   **Data Persistence:** Basic Java Serialization (saving an `ArrayList` to a local binary file).
*   **Concurrency:** None (designed for a single user at a time).

## The Modernization: A Full-Stack Cloud Application

The goal of this refactoring process was to address the limitations of the original application (e.g., single-user design, fragile data persistence, outdated UI) and re-engineer it as a professional, multi-user, and scalable web service. This modernization also involved a strategic migration from a relational SQL database to a flexible NoSQL solution to optimize for cost and scalability in a cloud environment.

**Live Web Application:** [https://vidushraj1.github.io/Skin-Consultation-Managing-webapp/](https://vidushraj1.github.io/Skin-Consultation-Managing-webapp/)

### New Features & Improvements

*   **Role-Based Access:** The application now has a clear separation between a public-facing **Patient View** and a secure **Admin Dashboard**.
*   **Secure Authentication:** The Admin Dashboard is protected by a secure, token-based (JWT) authentication system.
*   **Modern User Experience:** The outdated Java Swing GUI has been replaced with a responsive, fast, and intuitive **React Single-Page Application (SPA)**.
*   **Robust Backend:** The core logic was migrated to a powerful **Spring Boot** backend, providing a secure and scalable REST API.
*   **Persistent & Cost-Effective Cloud Storage:** The fragile file-based saving system was replaced with:
    *   **MongoDB Atlas:** A managed, highly scalable NoSQL database for all application data (doctors, patients, consultations). Using the free tier demonstrates cost-conscious development for portfolio and small-scale projects.
    *   **Google Cloud Storage:** A dedicated object storage solution for permanently and efficiently storing user-uploaded images.
*   **Cloud-Native Deployment:** The entire application is deployed on Google Cloud Platform for high availability and scalability.
    *   The **Spring Boot backend** is containerized with **Docker** and runs as a serverless service on **Google Cloud Run**.
    *   The **React frontend** is hosted as a static site on **GitHub Pages**, providing excellent performance and free hosting.

### Modern Technology Stack

*   **Frontend:**
    *   **Framework:** React
    *   **Styling:** CSS3, Modern UI/UX principles
    *   **API Communication:** Axios
    *   **Deployment:** GitHub Pages
*   **Backend:**
    *   **Framework:** Spring Boot 3
    *   **Language:** Java 17
    *   **Data Persistence:** Spring Data MongoDB
    *   **Database:** MongoDB (managed by MongoDB Atlas)
    *   **Security:** Spring Security (JWT-based authentication)
    *   **Deployment:** Docker, Google Cloud Run
*   **Cloud Infrastructure:**
    *   **Google Cloud Platform (GCP)**
    *   **MongoDB Atlas:** For the NoSQL database.
    *   **Google Cloud Storage:** For image uploads.
    *   **Google Artifact Registry:** For storing Docker container images.
    *   **Google Cloud Run:** For serverless backend hosting.

## Project Structure & Local Setup

This full-stack application consists of a public frontend repository and a private backend service.

### Backend (Private Repository & Architectural Overview)

Please note: The source code for the Spring Boot backend is maintained in a private repository and is not publicly available. It was developed by modernizing the business logic from the original [Java Swing project](https://github.com/vidushraj1/Skin-Consultation-Managing-Program).

The backend is a standard Spring Boot application responsible for handling business logic, data persistence with MongoDB, and exposing a secure REST API. The frontend communicates with this backend, which runs on `http://localhost:8080` during local development.

Key API endpoints provided by the backend include:
*   `POST /api/auth/login`: For admin authentication.
*   `GET /api/doctors`: To fetch all doctors.
*   `POST /api/consultations/book`: For patients to book a consultation.
*   `POST /api/files/upload`: For uploading consultation images.
*   Secure endpoints for `GET`, `POST`, and `DELETE` operations on `/api/admins`, `/api/doctors`, and `/api/patients` which require a valid JWT.

### Frontend (This Repository)

The React frontend is publicly available in this repository. To run it locally and connect it to a backend service (either a locally running instance or the live deployed service), follow these steps.

**Prerequisites:**
*   Node.js and npm

**Running the Frontend:**
1.  Navigate to the `skin-consultation-frontend` directory.
2.  Create a `.env` file in the root of the frontend project.
3.  Inside the `.env` file, add the following line, pointing to the backend's base URL: `REACT_APP_API_BASE_URL=http://localhost:8080` *(To test against the live version, you can replace `http://localhost:8080` with the actual Cloud Run service URL.)*
4.  Install dependencies: `npm install`
5.  Start the development server: `npm start`
6.  The frontend will be running on `http://localhost:3000`.
