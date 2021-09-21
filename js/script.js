const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
let employees = [];
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

// fetch data from API
async function getData() {
    const res = await fetch(urlAPI);
    const data = await res.json();
    return data.results
}

getData()
    .then(displayEmployees)
    .catch(err => console.log('Seems to be a problem:',err));


// Apply data to grid-container and display info
function displayEmployees(employeeData) {
     employees = employeeData;

         // store the employee HTML as we create it
    let employeeHTML = '';

         // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

        // template literals make this so much cleaner!
    employeeHTML +=`<div class="card" data-index="${index}">
                      <img class="avatar picGridCont" src="${picture.large}"/>
                      <div class="text-container" id="firstTxtCont">
                        <h2 class="name">${name.first} ${name.last}</h2>
                        <p class="email">${email}</p>
                        <p class="address">${city}</p>
                      </div>
                    </div>`

});

gridContainer.innerHTML = employeeHTML;
};


//Modal
function displayModal(index) {

    // Object destructuring makes template literal cleaner
    let {name, dob, phone, email, location: {city, street, state, postcode}, picture} = employees[index];

    let date = new Date(dob.date);
    const modalHTML = `<img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street.name}, ${state} ${postcode}</p>
    <p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>`;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

//Display modal when clicking card
gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
});
// close modal
modalClose.addEventListener('click', e => {
    if (e.target === modalClose) {
        overlay.classList.toggle("hidden");
    }
});
// filter searched name
function findSearched() {
    let input = document.getElementById('search').value.toLowerCase();
    let emplNames = document.querySelectorAll('.name');

    emplNames.forEach( empl => {
        let card = empl.parentNode.parentNode;
        if(!empl.textContent.toLowerCase().includes(input)) {
            card.style.display="none";
        }
        else if(textContent = "none") {
            card.style.display="";
        }
    });
};
