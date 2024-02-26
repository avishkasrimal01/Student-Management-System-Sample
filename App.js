/* Creta Api */
let express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Node.js applications running on port 3000");
});

let students = [];



app.post("/studentsdata", (req, res) => {
  try {
    const newStudent = req.body;
    students.push(newStudent);
    res.json({ message: 'Student added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }

});

app.get("/studentsdata", (req, res) => {
  res.json(students);

});

/* update */
app.get('/studentsdata/:searchCriteria/:searchInput', (req, res) => {
  const { searchCriteria, searchInput } = req.params;

  // Convert both search input and data to lowercase for case-insensitivity
  const lowercaseSearchInput = searchInput.toLowerCase();

  // Mapping object for search criteria
  const searchCriteriaMapping = {
    id: 'StudentId',
    firstName: 'StudentFName',
    lastName: 'StudentLName',
    email: 'StudentEmail',
    city: 'StudentCity',
    guardingName: 'StudentGurading'
  };

  // Validate search criteria
  const validSearchCriteria = searchCriteriaMapping[searchCriteria];

  if (!validSearchCriteria) {
    return res.status(400).json({ error: 'Invalid search criteria' });
  }

  // Find the student based on the provided search criteria
  const foundStudent = students.find(student => {
    const studentValue = student[validSearchCriteria].toLowerCase();
    return studentValue === lowercaseSearchInput;
  });

  if (foundStudent) {
    res.json(foundStudent);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});


// Route to update a student
app.put('/studentsdata/updatestudents', (req, res) => {
  const updatedStudent = req.body;

  const studentIndex = students.findIndex(student => student.StudentId == updatedStudent.StudentId);

  if (studentIndex !== -1) {
    students[studentIndex] = { ...students[studentIndex], ...updatedStudent };
    res.json({ message: 'Student updated successfully' });
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

/* update */

app.delete('/studentsdata/deletestudents/:id', (req, res) => {
  const studentIdToDelete = req.params.id;

  // Find the index of the student with the given ID
  const indexToDelete = students.findIndex(student => student.StudentId === studentIdToDelete);

  if (indexToDelete !== -1) {
    // Remove the student from the array
    const deletedStudent = students.splice(indexToDelete, 1)[0];
    res.json({ message: 'Student deleted successfully', deletedStudent });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});


