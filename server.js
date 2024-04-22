const express = require("express");
const path = require("path");
const { env } = require("process");
const fs = require("fs");
// Helper method for generating unique ids
const uuid = require("./helpers/uuid");
//intializes express
const app = express();
//sets the port
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//sets the homepage to be the index.html file
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
//sets the notes page to be the notes.html file
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);
//gets the data to be sent to the notes page
app.get("/api/notes", (req, res) => {
  // read existing notes
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // console out data
      console.log(data);
      res.send(data);
    }
    // Log the request to the terminal
    console.log(`${req.method} request received to get old notes`);
  });
});

// POST request to add notes
app.post("/api/notes", (req, res) => {
  console.log("Received request to add a note");

  const { title, text, id } = req.body;
  //requried properties present
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    //reading existing data
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        //convert note to a JSON object
        const storedNotes = JSON.parse(data);
        //add new note
        storedNotes.push(newNote);
        //update notes file
        fs.writeFile("./db/db.json", JSON.stringify(storedNotes, null, 4), (err) =>
          err ? console.log(err) : console.log("New note added successfully!")
        )
        res.send(data);
      }
    });
  }
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
