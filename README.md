# Apps from the `The Complete Node.js Developer Course (3rd Edition)` Udemy course

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
# development environment
npm run dev

# production
npm run start
```
