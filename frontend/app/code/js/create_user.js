async function sendUserData() {
	let data = getElementById("sign-up-form");

	let username = data.uname.value;
	let password = data.password.value;
	let rePassword = data.rePassword.value;

	if (username !== "" || username !== " " & password == rePassword){
		let userData = JSON.stringify($("#sign-up-form").serializeArray());

		let response = await fetch(' http://supine.local/api/v1/create-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: userData
		});

		let result = await response.json();
		console.log(result.message);
	}
}