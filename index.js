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
    displayEntries();
    userform.reset();
};

const displayEntries = () => {
    const savedEntries = JSON.parse(localStorage.getItem("userEntries")) || [];

    const rows = savedEntries.map(entry => `
        <tr>
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.acceptTerms ? "True" : "False"}</td>
        </tr>
    `).join("");

    const table = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Date of Birth</th>
                    <th>Accepted Terms?</th>
                </tr>
            </thead>
            <tbody>
                ${rows || `<tr><td colspan="5">No entries yet</td></tr>`}
            </tbody>
        </table>
    `;

    document.getElementById("display").innerHTML = table;
};

userform.addEventListener("submit", saveUserForm);
window.addEventListener("DOMContentLoaded", displayEntries);

