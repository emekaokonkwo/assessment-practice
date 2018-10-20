// console.log(1);

const myHeader = document.createElement('h1');
myHeader.innerText = 'Hello World';

document.body.appendChild(myHeader);

// for (let i = 0; i < 3; i += 1) {
//   const myDiv = document.createElement('div');
//   myDiv.className = 'shape';
//   document.body.appendChild(myDiv);
// }

const myForm = document.createElement('form');
const root = document.getElementById('root');
root.appendChild(myForm);
myForm.setAttribute('id', 'myForm');

const username = document.createElement('input');
username.setAttribute('type', 'text');
username.setAttribute('id', 'username');
myForm.appendChild(username);

const password = document.createElement('input');
password.setAttribute('type', 'password');
password.setAttribute('id', 'password');
myForm.appendChild(password);

const submit = document.createElement('button');
submit.setAttribute('type', 'submit');
submit.innerHTML = 'Submit';
myForm.appendChild(submit);

document.querySelector('#myForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const user = username.value;
  const pass = password.value;
  // console.log(user, pass);

  fetch('/form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      username: user,
      password: pass,
    }),
  })
    .then(data => data.json())
    .then((newUser) => {
      console.log(newUser);
    });
});

// Get data.
const getMessages = document.createElement('button');
getMessages.innerHTML = 'Get Messages';
document.body.appendChild(getMessages);
const messageBox = document.createElement('div');
messageBox.style.backgroundColor = 'red';
document.body.appendChild(messageBox);

getMessages.addEventListener('click', () => {
  fetch('/getMessages')
    .then(data => data.json())
    .then((messages) => {
      messageBox.innerHTML = '';
      messages.forEach((message, index) => {
        // Wrapper container.
        const wrapperDiv = document.createElement('div');
        wrapperDiv.id = message._id;

        // P tag for message.
        const pName = document.createElement('p');
        pName.style.display = 'inline';
        pName.id = '';
        pName.innerHTML = `${index + 1}. ${message.username} `;

        const pPass = document.createElement('p');
        pPass.style.display = 'inline';
        pPass.id = '';
        pPass.innerHTML = `${index + 1}. ${message.password} `;

        // Delete message button.
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', deleteMessage);

        // Text inputs to update message.
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'name';

        const passInput = document.createElement('input');
        passInput.type = 'text';
        passInput.placeholder = 'pass';

        // Update message button.
        const updateButton = document.createElement('button');
        updateButton.innerHTML = 'Update';
        updateButton.addEventListener('click', updateMessage);

        // Append to wrapper.
        wrapperDiv.appendChild(pName);
        wrapperDiv.appendChild(pPass);
        wrapperDiv.appendChild(deleteButton);
        wrapperDiv.appendChild(nameInput);
        wrapperDiv.appendChild(passInput);
        wrapperDiv.appendChild(updateButton);
        wrapperDiv.appendChild(document.createElement('br'));
        messageBox.appendChild(wrapperDiv);
      });
    });
});

function deleteMessage(event) {
  event.target.parentNode.remove();
  console.log(event.target.parentNode.id);
  fetch('/deleteMessage', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ _id: event.target.parentNode.id }),
  });
}

function updateMessage(event) {
  const parent = event.target.parentNode;
  const { id } = parent;
  const inputs = parent.querySelectorAll('input');
  const params = { _id: id, username: inputs[0].value, password: inputs[1].value };
  const pTags = parent.querySelectorAll('p');
  console.log(pTags);

  fetch('/updateMessage', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
    .then(data => data.json())
    .then((update) => {
      console.log(update);
      // pTags[0].innerHTML = params.username;
      // pTags[1].innerHTML = params.password;
      pTags[0].innerHTML = update.username;
      pTags[1].innerHTML = update.password;
    });
}
