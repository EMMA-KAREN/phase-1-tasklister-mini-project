// Select the HTML elements for the form, patient list, and search input
const patientForm = document.getElementById("patientForm");
const patientList = document.getElementById("patientList");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

let editingPatientIndex = -1;
let patients = []; // Array to store patient data


// Add an event listener to the form's submission event
patientForm.addEventListener("submit", (event) => {
  event.preventDefault();


   // Extract the values from the form fields
  const patientName = document.getElementById("patientName").value;
  const guardianName = document.getElementById("guardianName").value;
  const stage = document.getElementById("stage").value;
  const progress = document.getElementById("progress").value;
  const guardianPhone = document.getElementById("guardianPhone").value;
  const doctorEmail = document.getElementById("doctorEmail").value;
  const priority = document.getElementById("priority").value;

 
  // Input validation
  if (!patientName || !guardianName || !stage || !progress || !guardianPhone.trim() || !doctorEmail || !priority) {
    alert("Please fill out all required fields.");
    return;
  }

  if (editingPatientIndex !== -1) {
    // Update the existing patient in the array
    patients[editingPatientIndex] = {
      name: patientName,
      guardianName: guardianName,
      stage: stage,
      progress: progress,
      phone: guardianPhone,
      email: doctorEmail,
      priority: priority,
    };

    // Clear the form and hide the edit button
    patientForm.reset();
    editingPatientIndex = -1;

    // Display a message indicating patient updated
    alert("Patient updated successfully!");

    // Display the updated patient list
    displayPatients();
  } else {
    
     // Add the new patient to the array
     patients.push({
       name: patientName,
       guardianName: guardianName,
       stage: stage,
       progress: progress,
       phone: guardianPhone,
       email: doctorEmail,
       priority: priority,
     });
 
     // Clear the form
     patientForm.reset();
 
     // Display a message indicating patient submitted
     alert("Patient submitted successfully!");
 
     // Display the updated patient list
     displayPatients();
   }
 });
 
 searchInput.addEventListener("keyup", () => {
   const searchTerm = searchInput.value.toLowerCase();
   displayPatients(searchTerm);
 });

 searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  displayPatients(searchTerm);
});

 function displayPatients(searchTerm = "") {
   patientList.innerHTML = "";
   let patientsFound = false; 

   patients.forEach((patient, index) => {
     if (searchTerm === "" || patient.name.toLowerCase().includes(searchTerm)) {
      patientsFound = true; 
       const patientItem = document.createElement("div");
       patientItem.classList.add("patient-item");
       patientItem.classList.add(`priority-${patient.priority.toLowerCase()}`);
 
       patientItem.innerHTML = `
         <strong>Patient Name:</strong> ${patient.name}<br>
         <strong>Guardian Name:</strong> ${patient.guardianName}<br>
         <strong>Stage:</strong> ${patient.stage}<br>
         <strong>Progress:</strong> ${patient.progress}<br>
         <strong>Guardian Phone:</strong> ${patient.phone}<br>
         <strong>Doctor Email:</strong> ${patient.email}<br>
         <button class="edit-button">Edit</button>
         <button class="delete-button">Delete</button>
       `;
 
       patientList.appendChild(patientItem);
 
       const editButton = patientItem.querySelector(".edit-button");
       editButton.addEventListener("click", () => {
         // Populate the form with the patient's data
         patientForm.reset();
         document.getElementById("patientName").value = patient.name;
         document.getElementById("guardianName").value = patient.guardianName;
         document.getElementById("stage").value = patient.stage;
         document.getElementById("progress").value = patient.progress;
         document.getElementById("guardianPhone").value = patient.phone;
         document.getElementById("doctorEmail").value = patient.email;
         document.getElementById("priority").value = patient.priority;
 
         // Set the flag to indicate that the form is editing an existing patient
         editingPatientIndex = index;
 
         // Display the updated patient list (without hiding the current item)
         displayPatients();
       });
 
       const deleteButton = patientItem.querySelector(".delete-button");
       deleteButton.addEventListener("click", () => {
         // Remove the patient from the array based on index
         patients.splice(index, 1);
 
         // Update the displayed list
         displayPatients();
       });
     }
   });
   if (!patientsFound) {
    patientList.innerHTML = "No patient found by that name."; // Display message if no patients match
  }
  }
 