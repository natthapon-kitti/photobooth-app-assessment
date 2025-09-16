📸 Photobooth App: Project Documentation
Project Overview
This section should provide a brief, high-level summary of the application. Explain what the "photobooth app" is, its purpose, and who its intended users are.

Example:
This is a full-stack web application designed for a photobooth experience. It allows users to take photos, view a gallery of past photos, and manage their account. The application includes a backend API to handle photo storage and user authentication, and a frontend user interface for interacting with the photobooth.

Features
List the key features of the application. Use a bulleted list for clarity.

User Authentication: Secure user registration and login.

Photo Capture: Take new photos from a webcam or other connected device.

Photo Gallery: View a collection of previously taken photos.

API: A RESTful API for handling photo uploads, retrieval, and user data.

Prerequisites
List all the necessary software and tools required to run the project.

Node.js: v18.x or higher

Bun: v1.x or higher

PostgreSQL: A running instance of the database.

Prisma CLI: npm install -g prisma

Installation
Walk the user through the process of getting the project up and running.

Clone the repository:
git clone https://github.com/natthapon-kitti/photobooth-app-assessment.git
cd photobooth-app-assessment

Install dependencies:
bun install

Database Setup:
Run database migrations: bun prisma migrate deploy

Start the server:
bun run dev

API Endpoints
Document the main API endpoints of your application. Include the HTTP method, endpoint URL, and a brief description of its function.

Method	Endpoint	Description
POST	/register	Creates a new user account.
POST	/login	Authenticates a user and returns a token.
POST	/gallery/save-image	Uploads a new photo.
GET	/gallery/get-image-by-user-id	Retrieves all photos for the logged-in user.

Export to Sheets
Technologies Used
List the main technologies, frameworks, and libraries used to build the project.


Backend: Bun, Express.js

Database: PostgreSQL

ORM: Prisma

Authentication: bcryptjs

Frontend: Next.js, React.js

Styling: Tailwind CSS

Platform: Render, Vercel, Neon
