# Westminster Skin Consultation - Modernized Web Application

This project is a complete modernization of an original Java Swing desktop application into a full-stack, cloud-native web application. It transitions a legacy system into a modern, scalable, and secure platform using industry-standard technologies like React, Spring Boot, and Google Cloud Platform.

## The Original Application: A Java Swing Desktop App

The initial project was a university coursework assignment designed to demonstrate Object-Oriented Programming (OOP) principles in Java. It functioned as a skin consultation management system with two distinct user experiences.

this is the old repo link: https://github.com/vidushraj1/Skin-Consultation-Managing-Program

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

The goal of this refactoring process was to address the limitations of the original application (e.g., single-user design, fragile data persistence, outdated UI) and re-engineer it as a professional, multi-user, and scalable web service.

this is the product live webpage: https://vidushraj1.github.io/Skin-Consultation-Managing-webapp/

### New Features & Improvements

*   **Role-Based Access:** The application now has a clear separation between a public-facing **Patient View** and a secure **Admin Dashboard**.
*   **Secure Authentication:** The Admin Dashboard is protected by a secure, token-based (JWT) authentication system.
*   **Modern User Experience:** The outdated Java Swing GUI has been replaced with a responsive, fast, and intuitive **React Single-Page Application (SPA)**.
*   **Robust Backend:** The core logic was migrated to a powerful **Spring Boot** backend, providing a secure and scalable REST API.
*   **Persistent Cloud Storage:** The fragile file-based saving system was replaced with:
    *   **Google Cloud SQL (PostgreSQL):** A managed, production-grade database for all application data (doctors, patients, consultations, etc.).
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
    *   **Language:** Java 17/21
    *   **Data Persistence:** Spring Data JPA with Hibernate
    *   **Database:** PostgreSQL (managed by Google Cloud SQL)
    *   **Security:** Spring Security (JWT-based authentication)
    *   **Deployment:** Docker, Google Cloud Run
*   **Cloud Infrastructure:**
    *   **Google Cloud Platform (GCP)**
    *   **Google Cloud SQL:** For the database.
    *   **Google Cloud Storage:** For image uploads.
    *   **Google Artifact Registry:** For storing Docker container images.
    *   **Google Cloud Run:** For serverless backend hosting.

## How to Run This Project Locally

### Prerequisites
*   Node.js and npm (for the frontend)
*   Java JDK 17 or 21 (for the backend)
*   Maven
*   A configured Google Cloud project with a Cloud SQL instance (for full functionality) or an active local H2 database profile.

### Running the Backend (Spring Boot)
1.  Navigate to the `skin-consultation-backend` directory.
2.  Ensure your `application.properties` is configured for your local H2 database (this is the default test profile).
3.  Run the application using your IDE or the Maven wrapper: `./mvnw spring-boot:run`
4.  The backend will be running on `http://localhost:8080`.

### Running the Frontend (React)
1.  Navigate to the `skin-consultation-frontend` directory.
2.  Create a `.env` file in the root and add the line: `REACT_APP_API_BASE_URL=http://localhost:8080`.
3.  Install dependencies: `npm install`
4.  Start the development server: `npm start`
5.  The frontend will be running on `http://localhost:3000`.
