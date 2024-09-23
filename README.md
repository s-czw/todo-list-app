# todo-list-app

## Todo-app:
1. To start
```
docker-compose up -d
```
2. To stop
```
docker-compose down
```

## Initialize database before startup
1. start the app
```
npm start
```
2. run database seeding in todo_app_backend directory
```
cd ./todo_app_backend
node db/seed.js
```

## To start individually
Backend:
```
cd todo_app_backend
npm start
```
Frontend:
```
cd todo_app_frontend
npm start
```

## To test backend
```
cd todo_app_backend
npm test
```
