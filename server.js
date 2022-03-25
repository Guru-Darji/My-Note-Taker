const express = require('express');
const path = require('path');
const fs = require("fs");
const database = require("./db/db.json")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({
  extended:true
}));

app.get("/", (req, res) =>{
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
        let newNotes = req.body;


        let maxId = 99;

        for (let i = 0; i < database.length; i++) {
            let seperateNotes = database[i];

            if (seperateNotes.id > maxId) {

                maxId = seperateNotes.id;
            }
        }

        newNotes.id = maxId + 1;

        database.push(newNotes)


        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        });

        res.json(newNotes);
    });

    app.delete("/api/notes/:id", function (req, res) {
      let jsonFilePath = path.join(__dirname, "/db/db.json");
      
      for (let i = 0; i < database.length; i++) {
          if (database[i].id == req.params.id) {
              database.splice(i, 1);
              break;
          }
      }

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
