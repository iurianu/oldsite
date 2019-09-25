
// ------------- FORM VALIDATION ------------------

function validateForm() {
	var valid = true;
	var errorMessage = 'Please correct the following errors:\n';
	
	var reChar = /^[A-Za-z\s]+$/;
	//var reNum = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/; 
	//var reNum = /(^(\+?\-? *[0-9]+)([,0-9 ]*)([0-9 ])*$)|(^ *$)/; 
	var reEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;	
	
	var name = jQuery('input[name="name"]').val();
	var email = jQuery('input[name="email"]').val();
	var comment = jQuery('textarea[name="comment"]').val();
	
	//NAME validation
	if (name == "") {
		errorMessage = errorMessage + "\n" + "Name must be filled out";
		valid = false;
	}

	else if(!reChar.test(name)) {
		errorMessage = errorMessage + "\n" + "Error: Name contains invalid characters!";
		valid = false;
	}	

	//EMAIL validation
	if (email == "") {
		errorMessage = errorMessage + "\n" + "Email must be filled out!";	
		valid = false;				
	}
	
	else if(!reEmail.test(email)) {
		errorMessage = errorMessage + "\n" + "Error: Email contains invalid characters!";
		valid = false;
	}			
	
	//COMMENT validation
	if (comment == "") {
		errorMessage = errorMessage + "\n" + "Please fill out your comment!";	
		valid = false;				
	}
	
	if (valid == false)
	{
		alert(errorMessage);
	}
	
	return valid;
}



// ------------- COOKIE HANDLER ------------------

function deleteCookie(name) {
	document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	}
	else
	{
		begin += 2;
		var end = document.cookie.indexOf(";", begin);
		if (end == -1) {
		end = dc.length;
		}
	}
	return unescape(dc.substring(begin + prefix.length, end));
} 

function checkCookie() {
	var myCookie = getCookie("url");

	if (myCookie != null) {
		deleteCookie("url");
		document.getElementById("contactForm").innerHTML = "<br /><h4>Thank you for you message!<br /><br />We will contact you shortly!</h4>";
	}
}

$.noConflict();
jQuery(document).ready(function(){
	checkCookie();
	
	jQuery('#contactForm').submit(function() {
		if(!validateForm()) {
			return false;
		} 
	});
});