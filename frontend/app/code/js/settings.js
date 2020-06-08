getUserData();


pass_data = document.getElementById('password-form');
prof_data = document.getElementById('prof-form');

fine1 = false;
fine2 = false;
fine3 = false;
fine4 = false;
fine5 = false;




function checkOnStart(data){
	let username = prof_data.new_uname.value;
	let email = prof_data.new_email.value;

	if(username == data['username']){
		fine3 = true;
	}

	if(email == data['email']){
		fine4 = true;
	}
}
function changeColor(btn){
	if(btn.id !== 'pressed'){
		btn.id = 'pressed';
		setTimeout(setId, 90);
	}
	else{
		btn.id = 'set';
	}
		
	function setId(){
		btn.id = 'set';
	}
}

async function getUserData(){
	url = 'http://supine.local/api/v1/get-set-data'
	let response = await fetch(url);

	
	let result = await response.json();
	preData = JSON.parse(result);
	data = preData[0];

	insertValues(data);
	checkOnStart(data);

}

function insertValues(data){
	unameInput = document.getElementById('new_uname');
	emailInput = document.getElementById('new_email');
	uname = data['username'];
	email = data['email'];

	unameInput.value = uname;
	emailInput.value = email;
}

function profileBtn(btn){
	changeColor(btn);
	document.getElementById('password-form').style.display = 'none';

	document.getElementById('prof-form').style.display = 'block';
}

function passwordBtn(btn){
	changeColor(btn);
	document.getElementById('prof-form').style.display = 'none';
	
	document.getElementById('password-form').style.display = 'block';
}

function privacyBtn(){

}

function checkPassword(){
		let rePassword = pass_data.rePassword.value;
		let password = pass_data.new_password.value;

		if(password !== rePassword){

			invalidPassInput('Passwords do not match');
			disablePassButton();
		}
		else if(password == ""){
			invalidPassInput('You need to enter a password')
			disablePassButton();
		}
		else if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password))){
			invalidPassInput('Password must contain 6 to 20 characters, one numeric digit, uppercase and one lowercase letter');
			disablePassButton();
		}
	
		else{
			vailidPassInput();
			enablePassButton();
		}

function invalidPassInput(errorTxt){
			let passForm = document.getElementById("pass-form");
			let repassForm = document.getElementById("repass-form");
			pass_data.new_password.classList.add("is-invalid");
			pass_data.rePassword.classList.add("is-invalid");
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

		pass_data.rePassword.classList.remove('is-invalid');
		pass_data.new_password.classList.remove('is-invalid');
		pass_data.new_password.classList.add('is-valid');
		pass_data.rePassword.classList.add('is-valid');

		if(error){
			error.parentNode.removeChild(error);
		}
		else{

		}
		fine1 = true;
		return true;
}
}
function enablePassButton(){
	button = document.getElementById('pass-submit-btn');
	if(fine1){
		button.removeAttribute('disabled');
	}
	
}
function disablePassButton(){
	button = document.getElementById('pass-submit-btn');
	button.setAttribute('disabled', 'true');
}
async function checkCurPass(){
	curr_pass = document.getElementById('current-password').value;
	url = 'http://supine.local/api/v1/get-pass-data'
	let response = await fetch(url);

	
	let result = await response.json();
	preData = JSON.parse(result);
	data = preData[0];

	if(data['password'] == curr_pass){
		currentPass();
		editPassword();
	}
	else{
		notCurrentPass('That is not your current password');
	}
}

async function editPassword(){
	password = $('#password-form').serializeArray();
	passData = JSON.stringify(password[1]);
	let url = 'http://supine.local/api/v1/edit-password'

	let response = await fetch(url, {
		method: 'POST',
		headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
		body: passData
		});

	let result = await response.json();

	console.log(result);

	if(result.ok){
		window.location.replace('http://supine.local/settings.html');
	}
	else{
		alert('Something went wrong');
	}
}
function notCurrentPass(errorTxt){
			let passForm = document.getElementById("curr-pass-form");
			pass_data.current_password.classList.add("is-invalid");
			let error = document.getElementById('error');
			let cet = document.createTextNode(errorTxt);

			if(error){

				repassForm.removeChild(document.getElementById('error'));
		}

			errorMesDiv = document.createElement("div");
			errorMesDiv.classList.add("col-sm-4");
			errorMesDiv.id = 'error';

			passForm.appendChild(errorMesDiv);

			errorMes = document.createElement("small");
			errorMes.classList.add("text-danger");
			errorMes.appendChild(cet);
			errorMesDiv.appendChild(errorMes);

			fine1 = false;
			return false;
	
}
function currentPass(){
	let error = document.getElementById('error');

		pass_data.current_password.classList.remove('is-invalid');
		pass_data.current_password.classList.add('is-valid');

		if(error){
			error.parentNode.removeChild(error);
		}
		else{

		}
		fine1 = true;
		return true;
}
function checkUsername(){
		let username = prof_data.new_uname.value;
		if (username == "" || /\W/.test(username)) {
			let unameForm = document.getElementById("uname-form");
			let error = document.getElementById('uname-error');


			if(error){
				unameForm.removeChild(error);
			}

			prof_data.new_uname.classList.add('is-invalid');
			errorMesDiv = document.createElement("div");
			errorMesDiv.classList.add("col-sm-4");
			errorMesDiv.id = 'uname-error';

			unameForm.appendChild(errorMesDiv);

			errorMes = document.createElement("small");
			errorMes.classList.add("text-danger");
			errorMes.appendChild(document.createTextNode('Username is invalid'));
			errorMesDiv.appendChild(errorMes);
			fine3 = false;
			disableProfButton();
			return false;
		}
		validUsername();
		fine3 = true;
		enableProfButton();
		
}

function validUsername(){
		let error = document.getElementById('uname-error');

		prof_data.new_uname.classList.remove('is-invalid');
		
		prof_data.new_uname.classList.add('is-valid');

		if(error){
			error.parentNode.removeChild(error);
		}
		else{

		}
		
		return true;

}

function enableProfButton(){
	button = document.getElementById('prof-submit-btn');
	if(fine3 & fine4 & fine5){
		button.removeAttribute('disabled');
	}
	
}
function disableProfButton(){
	button = document.getElementById('prof-submit-btn');
	button.setAttribute('disabled', 'true');
}
function validateEmail(){
	let email = prof_data.new_email.value;


	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
		let error = document.getElementById('email-error');

		prof_data.new_email.classList.remove('is-invalid');
		
		prof_data.new_email.classList.add('is-valid');


		if(error){
			error.parentNode.removeChild(error);
		}
		else{

		}
		fine4 = true;
		enableProfButton();
		return true;
	}
		invalidEmailInput();
		disableProfButton();


}

function invalidEmailInput(){
		let emailForm = document.getElementById("email-form");
		let error = document.getElementById('email-error');


		if(error){
			emailForm.removeChild(error);
		}


		prof_data.new_email.classList.add('is-invalid');
		errorMesDiv = document.createElement("div");
		errorMesDiv.classList.add("col-sm-4");
		errorMesDiv.id = 'email-error';

		emailForm.appendChild(errorMesDiv);

		errorMes = document.createElement("small");
		errorMes.classList.add("text-danger");
		errorMes.appendChild(document.createTextNode('Email is inavalid'));
		errorMesDiv.appendChild(errorMes);
		fine4 = false;
		return false;
	
}
function checkFname(){
		let fullname = prof_data.new_fname.value;
		if (!/^[a-zA-Z-'. ]+$/.test(fullname)) {
			let fnameForm = document.getElementById("fname-form");
			let error = document.getElementById('fname-error');


			if(error){
				fnameForm.removeChild(error);
			}

			prof_data.new_fname.classList.add('is-invalid');
			errorMesDiv = document.createElement("div");
			errorMesDiv.classList.add("col-sm-4");
			errorMesDiv.id = 'fname-error';

			fnameForm.appendChild(errorMesDiv);

			errorMes = document.createElement("small");
			errorMes.classList.add("text-danger");
			errorMes.appendChild(document.createTextNode('Name is invalid'));
			errorMesDiv.appendChild(errorMes);
			fine5 = false;
			disableProfButton();
			return false;
		}

		validFname();
		fine5 = true;
		enableProfButton();
		
}

function validFname(){
		let error = document.getElementById('fname-error');

		prof_data.new_fname.classList.remove('is-invalid');
		
		prof_data.new_fname.classList.add('is-valid');

		if(error){
			error.parentNode.removeChild(error);
		}
		else{

		}
		
		return true;

}

async function editProf(){
	profForm = $('#prof-form').serializeArray();
	let url = 'http://supine.local/api/v1/edit-prof';

	for(let i = 0; i < profForm.length; i++){
		profData = JSON.stringify(profForm[i]);
		let response = await fetch(url, {
			method: 'POST',
			headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
			body: profData
			});

		let result = await response.json();

		console.log(result);

		if(result.ok){
			console.log('ok');
		}
		else{
			console.log('Something went wrong');
		}
	}
}