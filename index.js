const userform = document.getElementById("user-form");
let userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];

const getAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    const age = getAge(dob);
    if (age < 18 || age > 55) {
        alert("You must be between 18 and 55 years old to register.");
        return;
    }

    const entry = { name, email, password, dob, acceptTerms };
    userEntries.push(entry);
    localStorage.setItem("userEntries", JSON.stringify(userEntries));

    addEntryToTable(entry);
    userform.reset();
};

const addEntryToTable = (entry) => {
    const tableBody = document.querySelector("#user-table tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.acceptTerms ? "Yes" : "No"}</td>
    `;

    tableBody.appendChild(row);
};

const displayEntries = () => {
    const savedEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
    const tableBody = document.querySelector("#user-table tbody");
    tableBody.innerHTML = ""; // Clear previous rows

    savedEntries.forEach(entry => {
        addEntryToTable(entry);
    });
};

// Event Listeners
userform.addEventListener("submit", saveUserForm);
window.addEventListener("DOMContentLoaded", displayEntries);


