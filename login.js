// Create login container.
const loginContainer = document.createElement('div');
loginContainer.id = 'loginContainer';
loginContainer.style.height = '500px';
loginContainer.style.width = '500px';
loginContainer.style.backgroundColor = 'red';
document.body.appendChild(loginContainer);

// Create name field.
const nameField = document.createElement('input');
nameField.type = 'text';
nameField.placeholder = 'username';
loginContainer.appendChild(nameField);

// Create pass field.
const passField = document.createElement('input');
passField.type = 'text';
passField.placeholder = 'pass';
loginContainer.appendChild(passField);

// Create login button.
const loginButton = document.createElement('button');
loginButton.innerHTML = 'Login';
loginButton.addEventListener('click', (event) => {
  loginUser(event);
});

loginContainer.appendChild(loginButton);

function loginUser(event) {
  const containerDiv = event.target.parentNode;
  const inputArray = containerDiv.querySelectorAll('input');
  const params = { username: inputArray[0].value, password: inputArray[1].value };
  // console.log(params);

  fetch('/loginUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
    .then((response) => {
      // console.log(response.status);
      if (response.status === 200) {
        window.location.href = '/secret';
      } else {
        window.location.href = '/signup';
      }
    });
}
