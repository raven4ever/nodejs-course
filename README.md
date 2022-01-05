# Apps from the [The Complete Node.js Developer Course](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/)

## [Notes Application](./0_notes)

A basic CLI application which will create, remove, list and read notes from a file.

The notes will be stored in a local `notes.json` file.

Supported commands:

```shell
node app.js add --title="Note Title" --body="Note Body"
node app.js list
node app.js read --title="Note Title"
node app.js remove --title="Note Title"
```

## [Weather Application](./1_weather)

A CLI application which will return the weather forecast

The application uses the APIs from [weatherstack](weatherstack.com) and [mapbox](mapbox.com) so API keys are required for each service.

Supported commands:

```shell
node app.js location
node app.js "long location"
```

## [Server Weather Application](./2_webserver_weather)

An `express` application which will interogate the [weatherstack](weatherstack.com) and [mapbox](mapbox.com) APIs. The location is provided by the user using a HTML form.

The application is accesible at the following [URL](localhost:3000).

To start the application execute:

```shell
# install dependencies
npm install

# development environment
npm run dev

# production
npm run start
```

## [Tasks Manager Application](./3_tasks manager)

An `express` application which exposes API endpoints to create, read and update users and tasks.

The following API endpoints are available:

- /users
  - / [POST]
  - /login [POST]
  - /logout [POST]
  - /logoutAll [POST]
  - /me
    - /[GET]
    - / [DELETE]
    - / [PATCH]
    - /avatar [POST]
    - /avatar [DELETE]
    - /avatar [GET]

- /tasks
  - / [POST]
  - / [GET]
  - / [DELETE]
  - / [PATCH]

A `Postman` collection is available [here](./3_tasks manager/postman/task-manager-api.postman_collection.json) to test the endpoints.

The application needs a `.env` file in its root directory with the following structure:

```properties
PORT=3000

SENDGRID_FROM_EMAIL=
SENDGRID_API_KEY=

JWT_SECRET=SuperDuperUberSecret

MONGO_URL=mongodb://localhost:27017
MONGO_USR=root
MONGO_PASS=examplepassword
MONGO_DB=task-manager-api
```

The application uses SendGrid to send emails when a new user is added or deleted. This is why a SendGrid API key is required. If the SendGrid API key is not set or empty in the `.env` file, the application won't attempt to send any emails, it will print a message in the console.

To start the application execute:

```shell
# install dependencies
npm install

# development environment
npm run dev

# production
npm run start
```
