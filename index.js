let userform = document.getElementById("user-form");

let userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];

const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptTerms
    };

    userEntries.push(entry);
    localStorage.setItem("userEntries", JSON.stringify(userEntries));
    displayEntries(); // show updated entries
    userform.reset(); // optional: reset form after submit
};

const displayEntries = () => {
    const savedEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
    const tableEntries = savedEntries.map((entry) => {
        return `
            <tr>
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.password}</td>
                <td>${entry.dob}</td>
                <td>${entry.acceptTerms ? "True" : "False"}</td>
            </tr>
        `;
    }).join("");

    const table = `
        <table border="1" style="width:100%; border-collapse: collapse;">
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
                ${tableEntries}
            </tbody>
        </table>
    `;

    document.getElementById("display").innerHTML = table;
};

userform.addEventListener("submit", saveUserForm);
window.addEventListener("DOMContentLoaded", displayEntries); // display on page load
