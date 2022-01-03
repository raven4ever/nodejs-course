# Notes App

A basic CLI Node.JS application which will create, remove, list and read notes from a file.

The notes will be stored in a local `notes.json` file.

Supported commands:

```shell
node app.js add --title="Note Title" --body="Note Body"
node app.js list
node app.js read --title="Note Title"
node app.js remove --title="Note Title"
```
