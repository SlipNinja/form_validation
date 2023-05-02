

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


    const button = document.createElement("button");
    button.id = "submitbutton";
  
    form.appendChild(title);
    form.appendChild(emailline);
  
    return form;
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

function createFormLine(text, item, error) {
    const line = document.createElement("div");
    line.classList.add("formline");

    const top = document.createElement("div");
    top.classList.add("topline");

    top.appendChild(text);
    top.appendChild(item);

    line.appendChild(top);
    line.appendChild(error);

    return line;
}


export { buildForm };