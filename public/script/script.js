let newPassword = document.getElementbyId('new-password'); 
let confirmPassword = document.getElementbyId('confirm-password');
let submitButton = document.getElementbyId('submit')
 

function check(input) {
    if (newPassword.value != confirmPassword.value) { 
		input.setCustomValidity('Password Must be Matching.'); 
	} else { 
		// input is valid -- reset the error message 
		input.setCustomValidity(''); 
    } 
}