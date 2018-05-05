# Seller Point
Order Management Application

# Setup
1. Install NodeJS, MongoDB, Git SCM
2. Install yarn => npm install -g yarn
3. Clone the repository
4. Install all the dependencies of the project => cd order-manager && yarn install
5. Start MongoDB Server => sudo mongod
6. Start Backend Server => yarn start (OR) yarn debug
7. Generate Token => curl -X POST http://localhost:8000/api/login -d 'email=youremail@example.com&password=yourpassword'
8. Start Frontend Server => yarn dev:wds --env.accessToken=youraccesstoken

# Output
Output will be on http://localhost:8000 OR http://127.0.0.1:8000
