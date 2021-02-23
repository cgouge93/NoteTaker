const noteData = require('../db/db');
const fs = require('fs');
const path = require('path');
module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(noteData));
    app.post('/api/notes', (req, res) => {
            let jsonFilePath = path.join(__dirname, "../db/db.json");
            let newNote = req.body;
    
            // This allows the test note to be the original note.
            let highestId = 99;
            // This loops through the array and finds the highest ID.
            for (let i = 0; i < noteData.length; i++) {
                let individualNote = noteData[i];
    
                if (individualNote.id > highestId) {
                    // highestId will always be the highest numbered id in the notesArray.
                    highestId = individualNote.id;
                }
            }
            // This assigns an ID to the newNote. 
            newNote.id = highestId + 1;
            // We push it to db.json.
            noteData.push(newNote)
    
            // Write the db.json file again.
            fs.writeFile(jsonFilePath, JSON.stringify(noteData), function (err) {
    
                if (err) {
                    return console.log(err);
                }
                console.log("Your note was saved!");
            });
            // Gives back the response, which is the user's new note. 
            res.json(newNote);
        });
    ;
    app.delete('/api/notes/:id', (req, res) => {
        let note = noteData.find( ({id}) => id === JSON.parse(req.params.id));
        noteData.splice(noteData.indexOf(note), 1);
        res.end("Note deleted")
    })
}
