var passwordCheckboxes = document.querySelectorAll('input[type="checkbox"]');
var passwordFields = document.querySelectorAll('input[type="password"]');
function showForm(formId){
    var forms = document.querySelectorAll('.form');
    for(let i = 0; i < forms.length; i++)
    {
        forms[i].classList.remove('show');
        resetForm(forms[i]);
    }
    var form = document.getElementById(formId);
    if(form){
        form.classList.add('show');
    }
}
function resetForm(form) {
    // Reset all input fields in the form
    var inputs = form.querySelectorAll('input:not([type="submit"])');
    for(let m = 0; m < passwordCheckboxes.length; m ++){
      passwordCheckboxes[m].checked = false;
    }
    for(let z = 0; z < passwordFields.length; z++){
      passwordFields[z].type = 'password';
    }
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
}

for (let i = 0; i < passwordCheckboxes.length; i++) {
  passwordCheckboxes[i].addEventListener('change', function() {
    
    if (this.checked) {
      passwordFields[i].type = 'text';
      passwordFields[i+1].type = 'text';
    } else {
        passwordFields[i].type = 'password';
        passwordFields[i+1].type = 'password';
    }
  });
}