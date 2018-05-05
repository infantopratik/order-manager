# Order Manager
Order Management Application

# Setup
1. Install NodeJS, MongoDB, Git SCM
2. Install yarn => npm install -g yarn
3. Clone the repository
4. Install all the dependencies of the project => cd order-manager && yarn install
5. Generate Build => yarn prod:build
6. Start the Server => yarn prod:start
7. The app uses MongoDB, which is deployed by Mongo Atlas, so will connect by itself.
8. App will be running on http://localhost:8000 OR http://127.0.0.1:8000

# API Endpoints
*Orders*
GET -> /api/orders - Lists all orders
POST -> /api/order - add an order

*Users*
POST -> /api/user - register a new user
GET -> /api/user/details - get user details
