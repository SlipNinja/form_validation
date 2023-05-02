

function buildForm() {
    const form = document.createElement('form');
    form.id = "mainelement";

    const title = document.createElement("div");
    title.id = "title";
    title.innerHTML = "Please fill this form it's really important !"

    const emailtext = document.createElement("span");
    emailtext.innerHTML = "Email adress : ";
    const email = document.createElement("input");
    email.id = "email";
    email.type = "email";
    email.required = true;
    email.minLength = 8;
    const emailerror = document.createElement("span");
    emailerror.ariaLive = "polite";
    emailerror.classList.add("error");
    addEmailValidation(email, emailerror);
    const emailline = createFormLine(emailtext, email, emailerror);

    const countrytext = document.createElement("span");
    countrytext.innerHTML = "Country :";
    const country = document.createElement("select");
    country.id = "country";
    const option1 = createOption("fr", "France");
    const option2 = createOption("en", "England");
    const option3 = createOption("de", "Germany");
    country.appendChild(option1);
    country.appendChild(option2);
    country.appendChild(option3);
    country.onchange = checkZIP;
    const countryline = createFormLine(countrytext, country);

    const ziptext = document.createElement("span");
    ziptext.innerHTML = "ZIP :";
    const zip = document.createElement("input");
    zip.type = "text";
    zip.id = "zip";
    zip.required = true;
    zip.oninput = checkZIP;
    const ziperror = document.createElement("span");
    ziperror.ariaLive = "polite";
    ziperror.classList.add("error");
    ziperror.id = "ziperror";
    const zipline = createFormLine(ziptext, zip, ziperror);

    const passwordtext = document.createElement("span");
    passwordtext.innerHTML = "Password :";
    const password = document.createElement("input");
    password.type = "text";
    password.id = "password";
    password.required = true;
    password.oninput = checkPassword;
    const passwordline = createFormLine(passwordtext, password);

    const confirmationtext = document.createElement("span");
    confirmationtext.innerHTML = "Confirm password :";
    const confirmation = document.createElement("input");
    confirmation.type = "text";
    confirmation.id = "confirmation";
    confirmation.required = true;
    confirmation.oninput = checkPassword;
    const confirmationerror = document.createElement("span");
    confirmationerror.id = "confirmationerror";
    confirmationerror.className = "error";
    const confirmationline = createFormLine(confirmationtext, confirmation, confirmationerror);


    const button = document.createElement("button");
    button.id = "submitbutton";
    button.innerHTML = "Submit";

    addSubmitValidation(button);
  
    form.appendChild(title);
    form.appendChild(emailline);
    form.appendChild(countryline);
    form.appendChild(zipline);
    form.appendChild(passwordline);
    form.appendChild(confirmationline);
    form.appendChild(button);
  
    return form;
}

function checkPassword() {
  const pass = document.getElementById("password").value;
  const conf = document.getElementById("confirmation");
  const conferror = document.getElementById("confirmationerror");

  if (pass == conf.value) {
    conferror.className = "error";
    conferror.innerHTML = "";
    conf.setCustomValidity("");

  } else {
    conferror.className = "error active"
    conferror.innerHTML = "Passwords must be identical";
    conf.setCustomValidity("Passwords must be identical");//Prevents submission too
  }
}

function checkZIP() {
  // For each country, defines the pattern that the ZIP has to follow
  const constraints = {
    fr: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    en: [
      "^(E-)?\\d{4}$",
      "England ZIPs must have exactly 4 digits: e.g E-4756 or 4756",
    ]
  };

  const country = document.getElementById("country").value;
  const zip = document.getElementById("zip");
  const ziperror = document.getElementById("ziperror");

  // Build the constraint checker
  const constraint = new RegExp(constraints[country][0], "");
  //console.log(constraint);

  if (constraint.test(zip.value)) {
    ziperror.className = "error";
    ziperror.innerHTML = "";
    zip.setCustomValidity("");

  } else {
    ziperror.className = "error active"
    ziperror.innerHTML = constraints[country][1];
    zip.setCustomValidity(constraints[country][1]);//Prevents submission too
  }
}

function createOption(val, text) {
    const option = document.createElement("option");
    option.value = val;
    option.innerHTML = text;

    return option;
}

function addEmailValidation(input, error) {
    input.addEventListener("input", (event) => {
        // Each time the user types something, we check if the
        // form fields are valid.
      
        if (input.validity.valid) {
          // In case there is an error message visible, if the field
          // is valid, we remove the error message.
          error.textContent = ""; // Reset the content of the message
          error.className = "error"; // Reset the visual state of the message
        } else {
          // If there is still an error, show the correct error
          showEmailError(input, error);
        }
      });
}

function showEmailError(input, error) {
    if (input.validity.valueMissing) {
      // If the field is empty,
      // display the following error message.
      error.textContent = "You need to enter an email address.";
    } else if (input.validity.typeMismatch) {
      // If the field doesn't contain an email address,
      // display the following error message.
      error.textContent = "Entered value needs to be an email address.";
    } else if (input.validity.tooShort) {
      // If the data is too short,
      // display the following error message.
      error.textContent = `Email should be at least ${input.minLength} characters; you entered ${input.value.length}.`;
    }
  
    // Set the styling appropriately
    error.className = "error active";
  }

function addSubmitValidation(form, email, emailerror) {
  form.addEventListener("submit", (event) => {
    // if the email field is valid, we let the form submit
    if (!email.validity.valid) {
      // If it isn't, we display an appropriate error message
      showEmailError(email, emailerror);
      // Then we prevent the form from being sent by canceling the event
      event.preventDefault();
    }
  });
}

function createFormLine(text, item, error) {
    const line = document.createElement("div");
    line.classList.add("formline");

    const top = document.createElement("div");
    top.classList.add("topline");

    top.appendChild(text);
    top.appendChild(item);

    line.appendChild(top);

    if(error){
        line.appendChild(error);
    }

    return line;
}


export { buildForm };