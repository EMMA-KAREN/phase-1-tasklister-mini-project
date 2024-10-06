const patientForm = document.getElementById("patientForm");
const patientList = document.getElementById("patientList");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const sortAscButton = document.getElementById("sortAsc");
const sortDescButton = document.getElementById("sortDesc");

let editingPatientIndex = -1;
let patients = [];

// Priority sorting helper function
function comparePriority(a, b) {
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  return priorityOrder[a.priority] - priorityOrder[b.priority];
}

// Add event listener to form submission
patientForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Extract values from form fields
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
    patients[editingPatientIndex] = {
      name: patientName,
      guardianName: guardianName,
      stage: stage,
      progress: progress,
      phone: guardianPhone,
      email: doctorEmail,
      priority: priority,
    };
    editingPatientIndex = -1;
    alert("Patient updated successfully!");
  } else {
    patients.push({
      name: patientName,
      guardianName: guardianName,
      stage: stage,
      progress: progress,
      phone: guardianPhone,
      email: doctorEmail,
      priority: priority,
    });
    alert("Patient submitted successfully!");
  }

  patientForm.reset();
  displayPatients();
});

function displayPatients(searchTerm = "") {
  patientList.innerHTML = "";
  let patientsFound = false; // Track if any patients are found

  patients.forEach((patient, index) => {
    if (searchTerm === "" || patient.name.toLowerCase().includes(searchTerm)) {
      const patientItem = document.createElement("div");
      patientItem.classList.add("patient-item");

      // Set the class based on priority
      switch (patient.priority) {
        case "high":
          patientItem.classList.add("priority-high");
          break;
        case "medium":
          patientItem.classList.add("priority-medium");
          break;
        case "low":
          patientItem.classList.add("priority-low");
          break;
        default:
          patientItem.classList.add("priority-default");
      }

      patientItem.innerHTML = `
        <strong>Patient Name:</strong> ${patient.name}<br>
        <strong>Guardian Name:</strong> ${patient.guardianName}<br>
        <strong>Stage:</strong> ${patient.stage}<br>
        <strong>Progress:</strong> ${patient.progress}<br>
        <strong>Guardian Phone:</strong> ${patient.phone}<br>
        <strong>Doctor Email:</strong> ${patient.email}<br>
        <strong>Priority:</strong> ${patient.priority}<br>
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>
      `;

      patientList.appendChild(patientItem);
      patientsFound = true; // Found at least one patient

      // Add event listeners for Edit and Delete buttons
      const editButton = patientItem.querySelector(".edit-button");
      editButton.addEventListener("click", () => {
        document.getElementById("patientName").value = patient.name;
        document.getElementById("guardianName").value = patient.guardianName;
        document.getElementById("stage").value = patient.stage;
        document.getElementById("progress").value = patient.progress;
        document.getElementById("guardianPhone").value = patient.phone;
        document.getElementById("doctorEmail").value = patient.email;
        document.getElementById("priority").value = patient.priority;
        editingPatientIndex = index;
      });

      const deleteButton = patientItem.querySelector(".delete-button");
      deleteButton.addEventListener("click", () => {
        patients.splice(index, 1);
        displayPatients();
      });
    }
  });

  // If no patients were found, display an alert message
  if (!patientsFound && searchTerm !== "") {
    alert(`No patients found with the name: "${searchTerm}"`);
  }
}

// Search functionality
searchInput.addEventListener("keyup", () => {
  const searchTerm = searchInput.value.toLowerCase();
  displayPatients(searchTerm);
});

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  displayPatients(searchTerm);
});
