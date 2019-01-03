// Get html elements and set them to JS variables we can work with
// On Card Variables
const cardNumber = document.getElementById('card-number'); 
const fullName = document.getElementById('full-name'); 
const expiryDate = document.getElementById('expiry-date'); 

// Form Input Variables
const nameInput = document.getElementById('name'); 
const cardInput = document.getElementById('card'); 
const expiryInput = document.getElementById('expiry'); 
const cvvInput = document.getElementById('cvv'); 
const cardFeedback = document.getElementById('card-invalid-feedback');
const expiryFeedback = document.getElementById('expiry-invalid-feedback');
const cvvFeedback = document.getElementById('cvv-invalid-feedback');

// Container and Logo Variables
const cardContainer = document.getElementById('card-container');
const visaLogo = document.getElementById('visa-logo'); 
const mastercardLogo = document.getElementById('mastercard-logo'); 
const amexLogo = document.getElementById('amex-logo'); 


// Set the function that will load the event listeners
loadEventListeners();

// Listen for relavnt events
function loadEventListeners(){
  cardInput.addEventListener('input', setCard);
  nameInput.addEventListener('input', setName);
  expiryInput.addEventListener('input', setExpiry);
  expiryInput.addEventListener('blur', formatExpiry);
  cardInput.addEventListener('input', setBank);
  cardInput.addEventListener('blur', formatCard);
  cvvInput.addEventListener('blur', formatCvv);
}

document.addEventListener("DOMContentLoaded", function() {
  let storedName = localStorage.getItem('storedName');
    nameInput.value = storedName;
    setName();
});


// Set the card number on the card to the same of the input in the form and revert to blank dots if empty
function setCard(){
    cardNumber.innerHTML = cardInput.value;
    if(cardInput.value === ''){
      cardNumber.innerHTML = '•••• •••• •••• ••••';
    }
  }

// Set the full name on the card to the same of the input in the form and revert to placeholder if empty
function setName(){
    fullName.innerHTML = nameInput.value;
    console.log(fullName.innerHTML);
    localStorage.setItem('storedName', fullName.innerHTML);
    if(nameInput.value === ''){
      fullName.innerHTML = 'Full Name';
    }
  }

// Set the expiry date on the card to the same value on the input in the form and revert to placeholer if emtpy
  function setExpiry(){
    expiryDate.innerHTML = expiryInput.value;
    if(expiryInput.value === ''){
      expiryDate.innerHTML = 'MM/YY';
    }
  }

  // Set the bank card being used from the card number input - change the bg colour and logo
  function setBank (){
    const visaRegEx = /^4/;
    const mastercardRegEx = /^5/;
    const amexRegEx = /^3/;
    let cardCheck = cardInput.value;

    const visaResult = visaRegEx.exec(cardCheck);
    const mastercardResult = mastercardRegEx.exec(cardCheck);
    const amexResult = amexRegEx.exec(cardCheck);

        
    if (amexResult || visaResult || mastercardResult){

    if(visaResult){  
      function setVisa(re, str){
        if(re.test(str) === true) {
          cardContainer.classList = 'card visa-card';
          visaLogo.style.visibility = 'visible';
          amexLogo.style.visibility = 'hidden';
          mastercardLogo.style.visibility = 'hidden';
        }
      }
      setVisa(visaRegEx, cardCheck);
    }

    if(mastercardResult){
    function setMastercard(re, str){
      if(re.test(str)){
        cardContainer.classList = 'card mastercard-card';
        mastercardLogo.style.visibility = 'visible';
        amexLogo.style.visibility = 'hidden';
        visaLogo.style.visibility = 'hidden';
      } 
    }
    setMastercard(mastercardRegEx, cardCheck);
  }

  if(amexResult){
    function setAmex(re, str){
      if(re.test(str)){
        cardContainer.classList = 'card amex-card';
        amexLogo.style.visibility = 'visible';
        visaLogo.style.visibility = 'hidden';
        mastercardLogo.style.visibility = 'hidden';
      }
    }
    setAmex(amexRegEx, cardCheck);
  }
} else {
  cardContainer.classList = 'card';
  amexLogo.style.visibility = 'hidden';
  mastercardLogo.style.visibility = 'hidden';
  visaLogo.style.visibility = 'hidden';
}
}

function formatCard(){
  let formattedCard;

  // if 15, it must be an amex > make sure it begins with a 3 and set the spaces accordingly
  // if 16, make sure it begins with a 4 or a 5 and insert spaces accordingly 
  // if 17, and an amex, display as it has been input
  // if 19, and a Visa / MC / display has it has been input

  if (cardInput.value.length === 15 && cardInput.value[0] === '3'){
    formattedCard = cardInput.value.slice(0, 4) + ' ' + cardInput.value.slice(5, 11) + ' ' + cardInput.value.slice(-5);
    cardNumber.innerHTML = formattedCard;
    cardFeedback.style.display = 'none';

  }  else if (cardInput.value.length === 16 && (cardInput.value[0] === '4' || cardInput.value[0] === '5')){
    formattedCard = cardInput.value.slice(0, 4) + ' ' + cardInput.value.slice(4, 8) + ' ' + cardInput.value.slice(8, 12) + ' ' + cardInput.value.slice(12, 16);
    cardNumber.innerHTML = formattedCard;
    cardFeedback.style.display = 'none';

  }  else if (cardInput.value.length === 17 && cardInput.value[0] === '3'){
    cardNumber.innerHTML = cardInput.value;
    cardFeedback.style.display = 'none';

  } else if (cardInput.value.length === 19 && (cardInput.value[0] === '4' || cardInput.value[0] === '5')){
    cardNumber.innerHTML = cardInput.value;
    cardFeedback.style.display = 'none';

  } else {
    cardFeedback.style.display = 'block'
  }
}


function formatExpiry(){

  // If the user has input a date with the forward slash already included, display that directly on the page
  // If the has input a date without the slash, add it and display

  if (expiryInput.value.length === 4){
    expiryDate.innerHTML = expiryInput.value.slice(0,2) + '/' + expiryInput.value.slice(2,4);
    expiryFeedback.style.display = 'none';
  } else if (expiryInput.value.length === 5){
    expiryFeedback.style.display = 'none';
  } else {
    expiryFeedback.style.display = 'block';
  }
}



function formatCvv(){
  // If Amex is used, ensure that the value is four digits long
  // If Visa or Mastercard, ensure the value is three digits long
  // error if any text is input

  let cvvRegEx = /[A-Za-z]/i;
  let cvvCheck = cvvInput.value;

  const cvvResult = cvvRegEx.exec(cvvCheck);

  function alertCvvAlpha(re, str){
    if(re.test(str) === true) {
      cvvFeedback.style.display = 'block';
    } else {
      cvvFeedback.style.display = 'none';
    }
  }

  
    if (cvvResult) {
    alertCvvAlpha(cvvRegEx, cvvCheck);
  } else if (cardInput.value[0] === '3' && cvvInput.value.length != 4){
    cvvFeedback.style.display = 'block';
  } else if ( (cardInput.value[0] === '4' || cardInput.value[0] === '5') && cvvInput.value.length != 3) {
    cvvFeedback.style.display = 'block';
  } else if (cvvInput.value.length < 3){
    cvvFeedback.style.display = 'block';
  } else if (cardInput.value === '') {
    cvvFeedback.style.display = 'none';
  } else {
    cvvFeedback.style.display = 'none';
  }
}