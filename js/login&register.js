var passwordCheckboxes = document.querySelectorAll('input[type="checkbox"]');
var passwordFields = document.querySelectorAll('input[type="password"]');

function showForm(formId) {
  var forms = document.querySelectorAll('.form');
  for (let i = 0; i < forms.length; i++) {
    forms[i].classList.remove('show');
    resetForm(forms[i]);
  }
  var form = document.getElementById(formId);
  if (form) {
    form.classList.add('show');
  }
}
function resetForm(form) {
  // Reset all input fields in the form
  var inputs = form.querySelectorAll('input:not([type="submit"])');
  for (let m = 0; m < passwordCheckboxes.length; m++) {
    passwordCheckboxes[m].checked = false;
  }
  for (let z = 0; z < passwordFields.length; z++) {
    passwordFields[z].type = 'password';
  }
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
}

for (let i = 0; i < passwordCheckboxes.length; i++) {
  passwordCheckboxes[i].addEventListener('change', function () {

    if (this.checked) {
      passwordFields[i].type = 'text';
      passwordFields[i + 1].type = 'text';
    } else {
      passwordFields[i].type = 'password';
      passwordFields[i + 1].type = 'password';
    }
  });
}
document.getElementById('register-form').addEventListener('submit', function (event) {
  event.preventDefault();
  RegisterUser(new FormData(event.target));
});
document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();
  LogUser(new FormData(event.target));
});

function RegisterUser(formData) {

  var jsonData = {};
  formData.forEach(function (value, key) {
    jsonData[key] = value;
  });

  /*
  more validations to come
  */
  if (jsonData['password'] === jsonData['confirm-password']) {
    delete jsonData['confirm-password'];
    var apiUrl = 'https://localhost:7014/UserProfile/CreateUser'; // Replace with your API endpoint

    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          console.log("User created. Login to proceed")
        } else {
          throw new Error('Request failed with status: ' + response.status);
        }
      })

  }
  else {
    console.log('passwords dont match');
  }
}
function LogUser(formData) {

  var jsonData = {};
  formData.forEach(function (value, key) {
    jsonData[key] = value;
  });

  var apiUrl = 'https://localhost:7014/UserProfile/LogUser'; // Replace with your API endpoint

  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(jsonData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(function (response) {
    console.log(response);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Login failed');
    }
})
.then(function (data) {
    localStorage.setItem('jwtLoginToken', data.Token);
    
    window.location.href = data.redirectUrl;
})
.catch(function (error) {
    console.error(error);
});
}