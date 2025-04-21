Freaky Furniture
Welcome to Freaky Furniture, a full-stack web application that brings a unique furniture shopping experience to life! This project showcases my skills in building modern, user-friendly applications with a React frontend, Node.js/Express backend, and a relational database. Whether you’re browsing quirky furniture or managing inventory, Freaky Furniture delivers a seamless experience.

Live Demo: https://freaky-furniture.onrender.com

Source Code: https://github.com/justin-Attinoto-Coder/freaky-furniture
Tech Stack

Frontend: React, JavaScript, CSS
Backend: Node.js, Express
Database: [Specify database, e.g., MySQL/SQLite – replace with your DB]
Deployment: Render.com
Tools: npm, Git

Prerequisites
To run Freaky Furniture locally, you’ll need:

Node.js (v16 or higher) and npm – Download here
[Your Database, e.g., MySQL] – Install and set up (e.g., MySQL Community Server)
Git – For cloning the repository
A code editor like VS Code

Installation and Setup
Follow these steps to get Freaky Furniture running on your machine:
1. Clone the Repository
git clone https://github.com/your-username/freaky-furniture.git
cd freaky-furniture

2. Set Up the Server

Navigate to the server folder:cd server


Install server dependencies:npm install


Start the server:npm run start


This runs the Express server, typically on http://localhost:8000 (check server/src/server.js for the port).



3. Set Up the Client

Open a new terminal and navigate to the client folder:cd client


Install client dependencies:npm install


Start the React development server:npm run dev


This starts the client on http://localhost:3000. Open it in your browser to view the app.



4. Set Up the Database
Freaky Furniture uses a [your database, e.g., MySQL] database to store furniture data. To initialize the database:

Ensure your database server is running (e.g., MySQL server).
Configure database connection:
Create a .env file in the server/ folder.
Add your database credentials, e.g.:DB_HOST=localhost
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=freaky_furniture


Replace with your actual credentials (check server/src/server.js or related files for exact variables).


Run the database initialization script:node server/src/init.js


This creates the necessary tables (e.g., furniture, users) in your database.


Populate the database:
Add random data to the tables (e.g., sample furniture items) manually via your database client (e.g., MySQL Workbench) or modify init.js to include seed data.
Example (if init.js supports seeding):// In init.js
await db.query("INSERT INTO furniture (name, price) VALUES ('Funky Chair', 499)");


Run node server/src/init.js again if you add seed data.



5. Verify the App

With the server running (npm run start) and client running (npm run dev), visit http://localhost:3000.
You should see the Freaky Furniture app, displaying furniture data fetched from the server (assuming tables are populated).

Deploying to Render.com
To showcase Freaky Furniture online (e.g., for a portfolio):

Push your repo to GitHub (public or private).
Sign up at render.com and create a Static Site for the client:
Connect your GitHub repo.
Set:
Branch: main
Root Directory: client
Build Command: npm run build
Publish Directory: build


Deploy to get a URL like https://freaky-furniture.onrender.com.


For the server, create a Web Service:
Set:
Root Directory: server
Build Command: npm install
Start Command: npm run start


Add environment variables (e.g., DB_HOST, DB_USER) in Render’s Environment settings.


Update the client to use the server’s Render URL (e.g., https://freaky-furniture-server.onrender.com/api/furniture).

Troubleshooting

Server fails to start: Check server/src/server.js for errors and ensure database credentials in .env are correct.
Client doesn’t load: Verify npm run dev runs on http://localhost:3000 and check console errors (F12 > Console).
Database issues: Confirm init.js ran successfully and tables exist (use a DB client to check).
Render deployment fails: Check build logs in Render Dashboard. Ensure package.json scripts are correct and dependencies are listed.

Contributing
Got ideas to make Freaky Furniture even freakier? Feel free to fork the repo, make changes, and submit a pull request! Questions? Reach out at [your-email@example.com].
About
Freaky Furniture is a portfolio project to demonstrate my skills in full-stack development, built with passion for creating user-friendly apps. Deployed on Render.com to share with the world!

License: MITAuthor: [Your Name]
