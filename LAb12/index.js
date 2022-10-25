
const root = document.getElementById('root');
var myID = 0;

function renderNav() {
  const list = ['Travel updates', 'Reviews', 'About', 'Contact']

  const nav = document.createElement('nav');
  nav.className = 'nav';
  const ul = document.createElement('ul');
  ul.className = 'nav__container';

  list.forEach((link) => {
    const li = document.createElement('li');
    li.className = 'nav__item';

    const a = document.createElement('a');
    a.className = 'nav__link';
    a.href = '/';
    a.textContent = link;

    li.appendChild(a);
    ul.appendChild(li);
  });
  nav.appendChild(ul);
  root.appendChild(nav);
}

function renderContainer() {
  const addContainer = document.createElement('div');
  addContainer.className = 'add__container';
  const addArticle = document.createElement('button');
  addArticle.className = 'button';
  addArticle.id = 'ADD';
  addArticle.textContent = '+ Add Article';
  addContainer.appendChild(addArticle);
  root.appendChild(addContainer);
  document.getElementById('ADD').addEventListener('click', () => functionModal());

}
function functionModal() {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal__overlay';
  const modal = document.createElement('div');
  modal.className = 'modal';
  const modalContent = document.createElement('div');
  modalContent.className = 'modal__content';
  const addEdit = document.createElement('h2');
  addEdit.className = 'title';
  addEdit.textContent = 'Add/Edit article';
  const inputsContainer = document.createElement('div');
  inputsContainer.className = 'inputs__container';
  const input1 = document.createElement('input');
  input1.className = 'input';
  input1.type = 'text';
  input1.placeholder = 'Please enter title';
  input1.id = 'input1'
  const input2 = document.createElement('input');
  input2.className = 'input';
  input2.type = 'text';
  input2.placeholder = 'Please enter tag';
  input2.id = 'input2';
  const input3 = document.createElement('input');
  input3.className = 'input';
  input3.type = 'text';
  input3.placeholder = 'Please enter author';
  input3.id = 'input3';
  const input4 = document.createElement('input');
  input4.className = 'input';
  input4.type = 'text';
  input4.placeholder = 'Please enter date';
  input4.id = 'input4';
  const input5 = document.createElement('input');
  input5.className = 'input';
  input5.type = 'text';
  input5.placeholder = 'Please enter image url';
  input5.id = 'input5';
  const input6 = document.createElement('input');
  input6.className = 'input';
  input6.type = 'text';
  input6.placeholder = 'Please enter saying';
  input6.id = 'input6';
  inputsContainer.appendChild(input1);
  inputsContainer.appendChild(input2);
  inputsContainer.appendChild(input3);
  inputsContainer.appendChild(input4);
  inputsContainer.appendChild(input5);
  inputsContainer.appendChild(input6);
  const textArea = document.createElement('textarea');
  textArea.className = 'textarea';
  textArea.name = 'content';
  textArea.cols = '28';
  textArea.rows = '7'
  textArea.placeholder = 'Please enter content';
  textArea.id = 'textAreaa';
  const modalButtons = document.createElement('div');
  modalButtons.className = ' show-modal modal__buttons ';
  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.className = 'button';
  cancelButton.textContent = 'Cancel';
  cancelButton.id = 'cancel';
  const saveButton = document.createElement('button');
  saveButton.type = 'button';
  saveButton.className = 'button button--pink';
  saveButton.textContent = 'Save';
  saveButton.id = 'save';
  saveButton.addEventListener('click', () => {
    if (myID == 0) {
      add();
    }
    else { updateArticles(myID) }
  }
  );
  modalButtons.appendChild(cancelButton);
  modalButtons.appendChild(saveButton);
  modalContent.appendChild(addEdit);
  modalContent.appendChild(inputsContainer);
  modalContent.appendChild(textArea);
  modalContent.appendChild(modalButtons);
  modal.appendChild(modalContent);
  modalOverlay.appendChild(modal);
  modalOverlay.setAttribute('style', 'display:flex');
  document.body.appendChild(modalOverlay);
  cancelButton.addEventListener('click', function () {
    modalOverlay.style.visibility = "hidden";
    updateArticles();
  })
}

function renderMain() {
  const main = document.createElement('main');
  main.id = 'main';
  root.appendChild(main);
}

function getArticles() {
  fetch('http://localhost:3000/articles')

    .then(function (response) {
      if (response.status !== 200) {
        console.log('Error. Response Status: ' + response.status);
        return;
      }

      response.json().then(function (data) {
        renderArticles(data);
        console.log(data)
      });
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}
function add() {
  const title = document.getElementById('input1').value;
  const tag = document.getElementById('input2').value;
  const author = document.getElementById('input3').value;
  const date = document.getElementById('input4').value;
  const imgUrl = document.getElementById('input5').value;
  const saying = document.getElementById('input6').value;
  const content = document.getElementById('textAreaa').value;
  const dataForServer = {
    title,
    tag,
    author,
    date,
    imgUrl,
    saying,
    content,
  }
  const response = fetch('http://localhost:3000/articles', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(dataForServer)

  });
  getArticles();


}
function renderArticles(articlesList) {
  const main = document.getElementById('main');
  if (articlesList != undefined) {
    articlesList.forEach(item => {
      const article = document.createElement('article');
      const h2 = document.createElement('h2');
      h2.className = 'title';
      h2.textContent = item.title;
      const infoContainer = document.createElement('ul');
      infoContainer.className = 'info__container';
      const li1 = document.createElement('li');
      li1.className = 'info__item';
      li1.textContent = item.tag;
      const li2 = document.createElement('li');
      li2.className = 'info__item';
      li2.textContent = 'Added by';
      const span = document.createElement('span');
      span.className = 'info__mark';
      span.textContent = item.author;
      li2.appendChild(span);
      const li3 = document.createElement('li');
      li3.className = 'info__item';
      li3.textContent = item.date;
      infoContainer.appendChild(li1);
      infoContainer.appendChild(li2);
      infoContainer.appendChild(li3);
      const actions_conatiner = document.createElement('div');
      actions_conatiner.className = 'actions__container';
      const edit = document.createElement('button');
      edit.className = 'actions__btn';
      edit.textContent = 'Edit';
      edit.addEventListener('click', function () {
        functionModal();
        const input_1 = document.getElementById('input1');
        input_1.value = item.title;
        const input_2 = document.getElementById('input2');
        input_2.value = item.tag;
        const input_3 = document.getElementById('input3');
        input_3.value = item.author;
        const input_4 = document.getElementById('input4');
        input_4.value = item.date;
        const input_5 = document.getElementById('input5');
        input_5.value = item.imgUrl;
        const input_6 = document.getElementById('input6');
        input_6.value = item.saying;
        const input_7 = document.getElementById('textAreaa');
        input_7.value = item.content;
        myID = item.id;
        document.getElementById('save').addEventListener('click', () => updateArticles(myID));
      })

      const del = document.createElement('button');
      del.className = 'actions__btn';
      del.textContent = 'Delete';
      del.addEventListener('click', async function () {
        const response = await fetch('http://localhost:3000/articles/' + item.id, {
          method: 'DELETE',
          headers: {
            "Content-type": "application/json"
          }
        });
        getArticles();
      })
      actions_conatiner.appendChild(edit);
      actions_conatiner.appendChild(del);
      const img = document.createElement('img');
      img.src = item.imgUrl;
      const content_container = document.createElement('div');
      content_container.className = 'content__container';
      const p1 = document.createElement('p');
      p1.textContent = item.saying;
      const p2 = document.createElement('p');
      //p2.textContent=item.content;
      content_container.appendChild(p1);
      content_container.appendChild(p2);
      const readMoreContainer = document.createElement('div');
      readMoreContainer.className = 'readmore__container';
      const readButton = document.createElement('button');
      readButton.className = 'button';
      readButton.textContent = 'Read More';
      //Read More Button
      readButton.addEventListener('click', function () {
        p2.textContent = item.content;

      })

      readMoreContainer.appendChild(readButton);
      article.appendChild(h2);
      article.appendChild(infoContainer);
      article.appendChild(actions_conatiner);
      article.appendChild(img);
      article.appendChild(content_container);
      article.appendChild(readMoreContainer);
      main.appendChild(article);

    })
  }
}
async function updateArticles(id) {
  const title = document.getElementById('input1').value;
  const tag = document.getElementById('input2').value;
  const author = document.getElementById('input3').value;
  const date = document.getElementById('input4').value;
  const imgUrl = document.getElementById('input5').value;
  const saying = document.getElementById('input6').value;
  const content = document.getElementById('textAreaa').value;
  const dataForServer = {
    title,
    tag,
    author,
    date,
    imgUrl,
    saying,
    content,
  }

  const response = await fetch('http://localhost:3000/articles/' + id, {
    method: 'PUT',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(dataForServer)


  });
  clearForm();
  getArticles();
}

function clearForm() {
  updateForm('', '', '', '', '', '', '', '');
}

function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  const button1 = document.createElement('button');
  button1.className = 'footer__link';
  button1.textContent = 'previous';
  const button2 = document.createElement('button');
  button2.className = 'footer__link footer__link--next';
  button2.textContent = 'next';
  footer.appendChild(button1);
  footer.appendChild(button2);
  root.appendChild(footer);

}

function initFunction() {
  renderNav();
  renderContainer();
  renderMain();
  getArticles();
  renderArticles();
  renderFooter();
}

initFunction();













