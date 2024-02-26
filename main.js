$(document).ready(function () {

  /*index page icon navigations*/
  $("#Img-on-1").click(function () {
    window.location.href = "insert_student.html";
  })

  $("#Img-on-2").click(function () {
    window.location.href = "update_student.html";
  })

  $("#Img-on-3").click(function () {
    window.location.href = "show_students.html";
  })

  $("#Hide-div-img").mouseover(function () {
    $("#Hide-div").fadeIn().css("visibility", "visible");
  });

  $("#Hide-div-img").mouseleave(function () {
    $("#Hide-div").fadeOut().css("visibility", "hidden");
  });

  $("#Hide-div-img-1").mouseover(function () {
    $("#Hide-div-1").fadeIn().css("visibility", "visible");
  });

  $("#Hide-div-img-1").mouseleave(function () {
    $("#Hide-div-1").fadeOut().css("visibility", "hidden");
  });

  $("#Hide-div-img-2").mouseover(function () {
    $("#Hide-div-2").fadeIn().css("visibility", "visible");
  });

  $("#Hide-div-img-2").mouseleave(function () {
    $("#Hide-div-2").fadeOut().css("visibility", "hidden");
  });

  $("#Hide-div-img-3").mouseover(function () {
    $("#Hide-div-3").fadeIn().css("visibility", "visible");
  });

  $("#Hide-div-img-3").mouseleave(function () {
    $("#Hide-div-3").fadeOut().css("visibility", "hidden");
  });

  $("#Hide-div-img-4").mouseover(function () {
    $("#Hide-div-4").fadeIn().css("visibility", "visible");
  });

  $("#Hide-div-img-4").mouseleave(function () {
    $("#Hide-div-4").fadeOut().css("visibility", "hidden");
  });

});

function ClearData() {
  document.getElementById('ID').value = '';
  document.getElementById('email').value = '';
  document.getElementById('fname').value = '';
  document.getElementById('lname').value = '';
  document.getElementById('program').value = '';
  document.getElementById('guardian').value = '';
  document.getElementById('city').value = '';
}

//creates a new student

function addstudent() {

  var sid = $("#ID").val();
  var semail = $("#email").val();
  var fname = $("#fname").val();
  var lname = $("#lname").val();
  var nearcity = $("#city").val();
  var guardian = $("#guardian").val();
  var program = $("#program").val();

  var subjects = [];
  $("input:checkbox[name=type]:checked").each(function () {
    subjects.push($(this).val())
  })

  if (sid.trim() !== "" && semail.trim() !== "" && fname.trim() !== "" && lname.trim() !== "" &&
    nearcity.trim() !== "" && guardian.trim() !== "" && program.trim() !== "" && subjects.length > 0) {

    var studentData = {
      StudentId: sid,
      StudentEmail: semail,
      StudentFName: fname,
      StudentLName: lname,
      StudentCity: nearcity,
      guardian: guardian,
      ProgramSelect: program,
      subjects: subjects,
    };


    fetch('http://localhost:3000/studentsdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success', data);
        alert(data.message);

        // Clear the text fields after successful insertion
        document.getElementById('ID').value = '';
        document.getElementById('email').value = '';
        document.getElementById('fname').value = '';
        document.getElementById('lname').value = '';
        document.getElementById('city').value = '';
        document.getElementById('guardian').value = '';
        document.getElementById('program').value = '';

        $("input:checkbox[name=type]").each(function () {
          $(this).prop('checked', false);
        });

      })
      .catch((error) => {
        console.error('Error', error);
        alert(error);
      });

  } else {
    alert("Fill all the fields.");
  }

}
//end create new students

//show students
function showdata() {
  fetch('http://localhost:3000/studentsdata')
    .then(response => response.json())
    .then(students => {
      const tableBody = document.getElementById('stddata');
      tableBody.innerHTML = '';

      students.forEach(student => {
        const row = tableBody.insertRow();

        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        const cell7 = row.insertCell(6);
        const cell8 = row.insertCell(7);

        cell1.textContent = student.StudentId;
        cell2.textContent = student.StudentFName;
        cell3.textContent = student.StudentLName;
        cell4.textContent = student.StudentEmail;
        cell5.textContent = student.StudentCity;
        cell6.textContent = student.guardian;
        cell7.textContent = student.subjects;
        cell8.textContent = student.ProgramSelect;
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}
//end of show students

//update
function update() {
  const input1 = document.getElementById('input1').value;
  const input2 = document.getElementById('input2').value;

  if (input1 !== "" && input2 !== "") {
    // Make a request to your server to fetch the student details
    fetch(`http://localhost:3000/studentsdata/${input1}/${input2}`)
      .then(response => response.json())
      .then(student => {

        // Populate the form fields with the retrieved student details
        document.getElementById('ID').value = student.StudentId;
        document.getElementById('email').value = student.StudentEmail;
        document.getElementById('fname').value = student.StudentFName;
        document.getElementById('lname').value = student.StudentLName;
        document.getElementById('city').value = student.StudentCity;
        document.getElementById('program').value = student.ProgramSelect;
        document.getElementById('guardian').value = student.guardian;

      })
      .catch(error => console.error('Error getting student details:', error));
  } else {
    alert("Please fill in all the required fields.");
  }
}

function save() {

  var subjects = [];
  $("input:checkbox[name=type]:checked").each(function () {
    subjects.push($(this).val())
  })

  const update = {

    StudentId: document.getElementById('ID').value,
    StudentEmail: document.getElementById('email').value,
    StudentFName: document.getElementById('fname').value,
    StudentLName: document.getElementById('lname').value,
    StudentCity: document.getElementById('city').value,
    ProgramSelect: document.getElementById('program').value,
    StudentGurading: document.getElementById('guardian').value,
    subjects: subjects
  };


  fetch('http://localhost:3000/studentsdata/updatestudents', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
  })
    .then(response => response.json())
    .then(result => {
      console.log(result.message);
      alert(result.message);

      $('#id,#email, #fname, #lname, #city, #guardian, #program, #guardian').val('');

      $("input:checkbox[name=type]").prop('checked', false);
    })
    .catch(error => console.error('Error updating student details:', error));
}
//end of update


// Search Student
function SearchStudent() {

  const datafields = document.getElementById('data').value;
  const reqinput = document.getElementById('input').value;

  if (datafields !== "" && reqinput !== "") {
    fetch(`http://localhost:3000/studentsdata/${datafields}/${reqinput}`)
      .then(response => response.json())
      .then(data => {
        console.log('Server data:', data);

        const tableBody = document.getElementById('stddata');
        tableBody.innerHTML = ''; //

        if (Array.isArray(data)) {
          data.forEach(student => {
            const row = tableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);
            const cell6 = row.insertCell(5);
            const cell7 = row.insertCell(6);
            const cell8 = row.insertCell(7);

            cell1.textContent = student.StudentId;
            cell2.textContent = student.StudentFName;
            cell3.textContent = student.StudentLName;
            cell4.textContent = student.StudentEmail;
            cell5.textContent = student.StudentCity;
            cell6.textContent = student.StudentGurading;
            cell7.textContent = student.subjects;
            cell8.textContent = student.ProgramSelect;
          });
        } else if (typeof data === 'object') {
          const row = tableBody.insertRow();
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          const cell3 = row.insertCell(2);
          const cell4 = row.insertCell(3);
          const cell5 = row.insertCell(4);
          const cell6 = row.insertCell(5);
          const cell7 = row.insertCell(6);
          const cell8 = row.insertCell(7);

          cell1.textContent = data.StudentId;
          cell2.textContent = data.StudentFName;
          cell3.textContent = data.StudentLName;
          cell4.textContent = data.StudentEmail;
          cell5.textContent = data.StudentCity;
          cell6.textContent = data.StudentGurading;
          cell7.textContent = data.subjects;
          cell8.textContent = data.ProgramSelect;
        } else {
          console.error('Something went wrong:', data);
          alert('Something wen wrong');
        }
      })
      .catch(error => {
        console.error('Error finding student details:', error);
        alert('Error finding student details from the server.');
      });
  } else {
    alert('Please fill in all the required fields.');
  }
}
//end of search


//delete
function deletestd() {
  const id = document.getElementById('input1').value;
  const input = document.getElementById('input2').value;

  if (id !== "" && input !== "") {
    fetch(`http://localhost:3000/studentsdata/${id}/${input}`)
      .then(response => response.json())
      .then(data => {
        console.log('Server data:', data);

        const tableBody = document.getElementById('stddata');
        tableBody.innerHTML = '';

        if (Array.isArray(data)) {
          data.forEach(student => {
            const row = tableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);
            const cell6 = row.insertCell(5);
            const cell7 = row.insertCell(6);
            const cell8 = row.insertCell(7);


            cell1.textContent = student.StudentId;
            cell2.textContent = student.StudentFName;
            cell3.textContent = student.StudentLName;
            cell4.textContent = student.StudentEmail;
            cell5.textContent = student.StudentCity;
            cell6.textContent = student.StudentGurading;
            cell7.textContent = student.subjects;
            cell8.textContent = student.ProgramSelect;
          });
        } else if (typeof data === 'object') {
          const row = tableBody.insertRow();
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          const cell3 = row.insertCell(2);
          const cell4 = row.insertCell(3);
          const cell5 = row.insertCell(4);
          const cell6 = row.insertCell(5);
          const cell7 = row.insertCell(6);
          const cell8 = row.insertCell(7);
          const cell9 = row.insertCell(8);


          cell1.textContent = data.StudentId;
          cell2.textContent = data.StudentFName;
          cell3.textContent = data.StudentLName;
          cell4.textContent = data.StudentEmail;
          cell5.textContent = data.StudentCity;
          cell6.textContent = data.guardian;
          cell7.textContent = data.subjects;
          cell8.textContent = data.ProgramSelect;

          // Create a "Delete" button for the fetched student
          const dltbtn = document.createElement('button');
          dltbtn.type = 'button';
          dltbtn.className = 'btn btn-danger delete-button';
          dltbtn.textContent = 'Delete';
          dltbtn.setAttribute('data-student-id', data.StudentId);

          // Add an event listener to the "Delete" button
          dltbtn.addEventListener('click', function () {
            const studentIdToDelete = this.getAttribute('data-student-id');
            console.log(studentIdToDelete);
            // Call a function to handle the deletion based on the student ID
            deletestudentdata(studentIdToDelete);
          });

          // Append the "Delete" button to the table cell
          cell9.appendChild(dltbtn);
        } else {
          console.error('Unexpected data format:', data);
          alert('Unexpected data format from the server.');
        }
      })
      .catch(error => {
        console.error('Error fetching student details:', error);
        alert('Error fetching student details from the server.');
      });
  } else {
    alert('Please fill in all the required fields.');
  }
}

function deletestudentdata(studentId) {
  // Display a confirmation dialog
  const userConfirmed = window.confirm('Are you sure you want to delete this student?');

  // Check if the user confirmed the deletion
  if (userConfirmed) {
    // Make a request to your server to delete the student
    fetch(`http://localhost:3000/studentsdata/deletestudents/${studentId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.message);
        location.reload();
        alert(result.message);

        // Refresh the page after successful deletion

      })
      .catch(error => console.error('Error deleting student:', error));
  } else {
    // User canceled the deletion
    console.log('Canceled');
  }
}
//end of delete


function generatePDF() {
  // Create a new jsPDF instance
  var pdf = new jsPDF();

  // Add a title to the PDF
  pdf.text('Student Details', 10, 10);

  // Get the table data and iterate over rows
  $("#stddata tr").each(function () {
    // Initialize an array to store column data for the current row
    var rowData = [];

    // Iterate over columns in the current row
    $(this).find("td").each(function () {
      // Push column data to the array
      rowData.push($(this).text());
    });

    // Join the array elements with space and add to the PDF
    pdf.text(rowData.join(' '), 10, pdf.autoTable.previous.finalY + 10);
  });

  // Save the PDF with a specific name
  pdf.save('student_details.pdf');
}

$(document).ready(function () {
  // Show/hide the back-to-top button based on scroll position
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('#backToTopBtn').fadeIn();
    } else {
      $('#backToTopBtn').fadeOut();
    }
  });

  // Scroll to the top when the button is clicked
  $('#backToTopBtn').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    return false;
  });
});
