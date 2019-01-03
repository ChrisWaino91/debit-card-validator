Access to Actual App: https://chriswaino91.github.io/debit-card-validator/



Features of this include;

- card number will be painted on the card UI while it is being input
- card ui will be painted and branded a specific colour based on the bin range (first digit) being input by the user
- card number will only accept 15 (if the card is in the Amex bin range) and 16 digit (Visa / MC bin ranges) numerical inputs 
- if the user inputs the card number without any spaces, it will space the full card number accordinly; 4/4/4/4 for Visa/MC or 4/6/5 for Amex
- if the user inputs the card WITH spaces already, this will just be painted to the card UI as is 
- full name will be painted to the card UI
- full name will be set to local storage once it has been input (on keyup)
- full name will be retrieved from LS on DOM Load
- date will be painted with a "/" if not input by the user and just painted as input otherwise.
- date will not look for a valid date to ensure that is not in the page - this is just a text input but could be added using the Date object instead
- CVV value will not be painted to the UI - it would be on the back
- CVV value must be alpha and either three or four digits long
- if an Amex card has been selected, then the CVV will need to be four digits long - otherwise it will error
- if a Visa / MC has been input, then the CVV must be three digits long otherwise it will error
- if the user enters a CVV value first, for some reason, the cvv field will not error on a 3/4 basis until a card number has been selected


I haven't strenously tested this. 
