const fs = require('fs')
const chalk = require('chalk')

// function to save the JSON list of notes to the notes.json file
const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

// function to load the content of the notes.json file
// if the file doesn't exist or is not in JSOn format an empty list will be returned
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}

// function to handle the removal of a note
const removeNote = (title) => {
    const allNotes = loadNotes()

    const filteredNotes = allNotes.filter((note) => note.title != title)

    if (allNotes.length > filteredNotes.length) {
        saveNotes(filteredNotes)
        console.log(chalk.green.inverse('Note removed!'))
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

// function to handle to addition fo a new note
const addNote = (title, body) => {
    const allNotes = loadNotes()
    const duplicateNote = allNotes.find((note) => note.title === title)

    if (!duplicateNote) {
        allNotes.push({
            title: title,
            body, body
        })

        saveNotes(allNotes)

        console.log(chalk.green.inverse('Note added!'))
    } else {
        console.log(chalk.red.inverse('Note title has to be unique!'))
    }
}

// function to handle listing of all notes
const listNotes = () => {
    const allNotes = loadNotes()

    console.log(chalk.inverse('Your notes:'))

    allNotes.forEach((note) => console.log(note.title))
}

// funtion to handle reading a note given its title
const readNote = (title) => {
    const allNotes = loadNotes()

    const foundNote = allNotes.find((note) => note.title === title)

    if (foundNote) {
        console.log(chalk.inverse(foundNote.title))
        console.log(foundNote.body)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}