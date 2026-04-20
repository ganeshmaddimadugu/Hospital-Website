function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

/* DOCTOR FILTER */
function filterDoctors() {
  let input = document.getElementById("search").value.toLowerCase();
  let doctors = document.querySelectorAll(".doctor");

  doctors.forEach(doc => {
    let name = doc.getAttribute("data-name");
    if (name.includes(input)) {
      doc.style.display = "block";
    } else {
      doc.style.display = "none";
    }
  });
}
/* BUTTON FILTER (CARDIOLOGY, DENTIST, ETC.) */
function filterDoctor(type) {
  let doctors = document.querySelectorAll(".doctor");

  doctors.forEach(doc => {
    let docType = doc.getAttribute("data-type");

    if (type === "all" || docType === type) {
      doc.style.display = "block";
    } else {
      doc.style.display = "none";
    }
  });
}
/* Doctors popup */
function openDoctor(name, specialty, experience, about) {
  document.getElementById("docName").innerText = name;
  document.getElementById("docSpec").innerText = specialty;
  document.getElementById("docExp").innerText = experience;
  document.getElementById("docAbout").innerText = about;

  document.getElementById("doctorModal").style.display = "flex";

  // attach selected doctor for booking
  window.selectedDoctor = name;
}

function closeDoctor() {
  document.getElementById("doctorModal").style.display = "none";
}
document.addEventListener("click", function(event) {
  let doctorModal = document.getElementById("doctorModal");

  if (event.target === doctorModal) {
    doctorModal.style.display = "none";
  }
});
function closeBooking() {
  document.getElementById("bookingModal").style.display = "none";
}

/* APPOINTMENT FORM */
function bookAppointment(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let doctor = window.selectedDoctor || "Not Selected";
  let time = document.getElementById("time").value;

  document.getElementById("bookMsg").innerText =
    `Patient: ${name} | Doctor: ${doctor} | Time: ${time}`;

  document.getElementById("bookingModal").style.display = "flex";

  document.querySelector("form").reset();
}
/* for specefic doctor card appoinment*/
function goToAppointment() {
  // close doctor modal
  document.getElementById("doctorModal").style.display = "none";

  // scroll to appointment section
  document.getElementById("appointment").scrollIntoView({ behavior: "smooth" });

  // auto-fill selected doctor
  if (window.selectedDoctor) {
    document.getElementById("doctor").value = window.selectedDoctor;
  }
}// OPEN SERVICE DETAILS
function openService(title, desc) {
  document.getElementById("serviceTitle").innerText = title;
  document.getElementById("serviceDesc").innerText = desc;

  document.getElementById("serviceModal").style.display = "flex";
}

// CLOSE SERVICE POPUP
function closeService() {
  document.getElementById("serviceModal").style.display = "none";
}

/*booking service*/
function bookService(serviceName) {
  document.getElementById("serviceBookModal").style.display = "flex";

  document.getElementById("selectedServiceText").innerText =
    "Service: " + serviceName;

  window.selectedService = serviceName;
}

function submitServiceBooking() {
  let name = document.getElementById("serviceUserName").value;
  let phone = document.getElementById("serviceUserPhone").value;
  let time = document.getElementById("serviceTime").value;

  if (!name || !phone || !time) {
    alert("Please fill all details");
    return;
  }

  document.getElementById("serviceBookModal").innerHTML = `
    <div class="modal-content">
      <h2>🎉 Booking Confirmed!</h2>
      <p><b>Service:</b> ${window.selectedService}</p>
      <p><b>Name:</b> ${name}</p>
      <p><b>Time:</b> ${time}</p>

      <button onclick="closeServiceBooking()">Close</button>
    </div>
  `;
}
function closeServiceBooking() {
  document.getElementById("serviceBookModal").style.display = "none";
  location.reload(); // reset modal content
}
// FROM SERVICE POPUP → APPOINTMENT
function goToAppointmentFromService() {
  closeService();

  document.getElementById("appointment").scrollIntoView({ behavior: "smooth" });

  window.selectedService = document.getElementById("serviceTitle").innerText;
}