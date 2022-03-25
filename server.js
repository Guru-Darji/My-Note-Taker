const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({
  extended:true
}));

app.get("*", (req, res) =>{
  res.sendFile(path.join()(__dirname, '/public/index.html'));
})

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
})


app.route("/api/notes")

    .get(function (req, res) {
        res.json(database);
    })

    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;


        let highestId = 99;

        for (let i = 0; i < database.length; i++) {
            let individualNote = database[i];

            if (individualNote.id > highestId) {

                highestId = individualNote.id;
            }
        }

        newNote.id = highestId + 1;

        database.push(newNote)


        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        });

        res.json(newNote);
    });

    app.delete("/api/notes/:id", function (req, res) {
      let jsonFilePath = path.join(__dirname, "/db/db.json");
      // request to delete note by id.
      for (let i = 0; i < database.length; i++) {
  
          if (database[i].id == req.params.id) {
              // Splice takes i position, and then deletes the 1 note.
              database.splice(i, 1);
              break;
          }
      }
      // Write the db.json file again.
      fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {
  
          if (err) {
              return console.log(err);
          } else {
              console.log("Your note was deleted!");
          }
      });
      res.json(database);
  });
  

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
