
function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = "HELLO WORLD";
  
    return element;
  }

  console.log("COUCOU ?");
  
  document.body.appendChild(component());