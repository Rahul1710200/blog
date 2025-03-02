Prerequisites

Before you begin, ensure you have the following installed:

Node.js (v16 or higher)

MongoDB (or MongoDB Atlas for cloud-based database)

Git

Installation

Backend Setup
1:Clone the repository:
git clone https://github.com/your-username/Sportsdunia.git
cd Sportsdunia/Backend


2: Install dependencies:
npm install

3 : Set up environment variables:

Create a .env file in the Backend folder.

Add the following variables:

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xuduj.mongodb.net/<database-name>
PORT=3000

4: Start the backend server:
npm start

Frontend Setup

1: Navigate to the Frontend folder:
cd ../Frontend

2 :Install dependencies
npm install

3 : Set up environment variables:

Create a .env file in the Frontend folder.

Add the following variable:

VITE_API_BASE_URL=http://localhost:3000

4: Start the frontend development server:
npm run dev


Testing
To run tests for the backend:

1: Navigate to the Backend folder:
cd Backend

2 :Run the tests
npm test





