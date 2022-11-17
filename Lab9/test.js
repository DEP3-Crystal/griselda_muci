let root = document.getElementById('root');
let formContainer = document.getElementById('form');
let isLoading = false;
var myID = 0;

function showLoading() {
  if (isLoading) { return }

  // Create loading Node
  let loading = document.createElement('p')
  loading.textContent = 'Loading!!!'
  isLoading = true;

  // Add loading to root
  root.appendChild(loading);
}

function removeRootChildren() {
  // Remove all node from root
  while (root.firstChild) {
    root.removeChild(root.lastChild);
  }

  isLoading = false;
}


function getDogs() {
  showLoading();
  fetch('http://localhost:3000/dogs')
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          removeRootChildren();
          renderDogs(data);
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}

function renderForm() {
  const form = document.createElement('form')
  const name = document.createElement('input')
  name.placeholder = 'name';
  name.type = 'text';
  name.id = 'name';
  const img = document.createElement('input');
  img.placeholder = 'img';
  img.type = 'text';
  img.id = 'img';
  const addButton = document.createElement('button');
  addButton.textContent = 'Add';
  addButton.type = 'button';
  addButton.addEventListener('click', addDog);
  const updateButton = document.createElement('button');
  updateButton.textContent = 'Update';
  updateButton.type = 'button';
  updateButton.addEventListener('click', () => updateDog(myID));
  form.appendChild(name);
  form.appendChild(img);
  form.appendChild(addButton);
  form.appendChild(updateButton);
  formContainer.appendChild(form)
}


async function addDog() {
  const name = document.getElementById('name').value;
  const img = document.getElementById('img').value;

  const dataForServer = {
    name,
    img
  }
  
  removeRootChildren();
  showLoading();
  const response = await fetch('http://localhost:3000/dogs', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(dataForServer)
  });
  const movies = await response.json();
  clearForm();
  getDogs();

}

function updateForm(dog) {
  const nameInput = document.getElementById('name');
  const imgInput = document.getElementById('img');
  nameInput.value = dog.name;
  imgInput.value = dog.img;
  myID = dog.id;
}

async function deleteDog(id) {
  removeRootChildren();
  showLoading();
  const response = await fetch('http://localhost:3000/dogs/' + id, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json"
    }
  });
  getDogs();
}


async function updateDog(id) {
  const name = document.getElementById('name').value;
  const img = document.getElementById('img').value;
  const dataForServer = {
    name,
    img
  }
  removeRootChildren();
  showLoading();

  const response = await fetch('http://localhost:3000/dogs/' + id, {
    method: 'PUT',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(dataForServer)
  });
  // const movies = await response.json();
  clearForm();
  getDogs();

}


function clearForm() {
  updateForm('', '', '');
}

function renderDogs(dogList) {
  const container = document.createElement('ul');
  dogList.forEach(dog => {
    const list = document.createElement('li');
    const img = document.createElement('img');
    img.src = dog.img;
    const name = document.createElement("label");
    name.textContent = dog.name;
    name.setAttribute('style', 'font-size:25px ; font-weight:bold')
    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.textContent = 'Edit Dog';
    editButton.addEventListener('click', () => updateForm(dog));
    editButton.setAttribute('style', 'font-size:20px');

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('style', 'font-size:20px');
    deleteButton.addEventListener('click', () => deleteDog(dog.id));
    list.setAttribute('style', 'display:flex; align-items:center;');
    list.appendChild(img);
    list.appendChild(name);
    list.appendChild(editButton);
    list.appendChild(deleteButton);
    container.appendChild(list);
  });
  root.appendChild(container);
}


function init() {
  renderForm();
  getDogs();
}

init();