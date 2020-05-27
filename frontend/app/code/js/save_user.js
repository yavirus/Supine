let data = document.getElementById("sign-up-form");


fine1 = false;
fine2 = false;
fine3 = false;
	
async function sendUserData() {
		
		let userData = JSON.stringify($("#sign-up-form").serializeArray());

		let response = await fetch('http://supine.local/api/v1/create-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: userData
		});

		let result = await response.json();
		console.log(result.message);

}


function checkPassword(){
		let rePassword = data.rePassword.value;
		let password = data.new_password.value;

		if(password !== rePassword){

			invalidPassInput('Passwords do not match');
			disableButton();
		}
		else if(password == ""){
			invalidPassInput('You need to enter a password')
			disableButton();
		}
		else if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password))){
			invalidPassInput('Password must contain 6 to 20 characters, one numeric digit, uppercase and one lowercase letter');
			disableButton();
		}
	
		else{
			vailidPassInput();
			enableButton();
		}

}
function enableButton(){
	button = document.getElementById('sign-up-btn');
	if(fine1 & fine2 & fine3){
		button.removeAttribute('disabled');
	}
	
}
function disableButton(){
	button = document.getElementById('sign-up-btn');
	button.setAttribute('disabled', 'true');
}



function invalidPassInput(errorTxt){
			let passForm = document.getElementById("pass-form");
			let repassForm = document.getElementById("repass-form");
			data.new_password.classList.add("is-invalid");
			data.rePassword.classList.add("is-invalid");
			let error = document.getElementById('error');
			let cet = document.createTextNode(errorTxt);

			if(error){

				repassForm.removeChild(document.getElementById('error'));
		}

			errorMesDiv = document.createElement("div");
			errorMesDiv.classList.add("col-sm-4");
			errorMesDiv.id = 'error';

			repassForm.appendChild(errorMesDiv);

			errorMes = document.createElement("small");
			errorMes.classList.add("text-danger");
			errorMes.appendChild(cet);
			errorMesDiv.appendChild(errorMes);

			fine1 = false;
			return false;
	
}

function vailidPassInput(){
		let error = document.getElementById('error');

		data.rePassword.classList.remove('is-invalid');
		data.new_password.classList.remove('is-invalid');
		data.new_password.classList.add('is-valid');
		data.rePassword.classList.add('is-valid');

		if(error){
			error.parentNode.removeChild(error);
		}
		else{

		}
		fine1 = true;
		return true;
}

function checkUsername(errorTxt = 'Username is invalid', unique = true){
		let username = data.new_uname.value;
		if (username == "" || /\W/.test(username) || !unique) {
			let unameForm = document.getElementById("uname-form");
			let error = document.getElementById('uname-error');


			if(error){
				unameForm.removeChild(error);
			}

			data.new_uname.classList.add('is-invalid');
			errorMesDiv = document.createElement("div");
			errorMesDiv.classList.add("col-sm-4");
			errorMesDiv.id = 'uname-error';

			unameForm.appendChild(errorMesDiv);

			errorMes = document.createElement("small");
			errorMes.classList.add("text-danger");
			errorMes.appendChild(document.createTextNode(errorTxt));
			errorMesDiv.appendChild(errorMes);
			fine2 = false;
			disableButton();
			return false;
		}
		validUsername();
		fine2 = true;
		enableButton();
		
}

function validUsername(){
		let error = document.getElementById('uname-error');

		data.new_uname.classList.remove('is-invalid');
		
		data.new_uname.classList.add('is-valid');

		if(error){
			error.parentNode.removeChild(error);
		}
		else{

		}
		
		return true;

}

function validateEmail(){
	let email = data.new_email.value;


	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
		let error = document.getElementById('email-error');

		data.new_email.classList.remove('is-invalid');
		
		data.new_email.classList.add('is-valid');


		if(error){
			error.parentNode.removeChild(error);
		}
		else{

		}
		fine3 = true;
		enableButton();
		return true;
	}
		invalidEmailInput();
		disableButton();


}

function invalidEmailInput(){
		let emailForm = document.getElementById("email-form");
		let error = document.getElementById('email-error');


		if(error){
			emailForm.removeChild(error);
		}


		data.new_email.classList.add('is-invalid');
		errorMesDiv = document.createElement("div");
		errorMesDiv.classList.add("col-sm-4");
		errorMesDiv.id = 'email-error';

		emailForm.appendChild(errorMesDiv);

		errorMes = document.createElement("small");
		errorMes.classList.add("text-danger");
		errorMes.appendChild(document.createTextNode('Email is inavalid'));
		errorMesDiv.appendChild(errorMes);
		fine3 = false;
		return false;
	
}