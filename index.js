console.log(1);

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
  console.log(user, pass);

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
