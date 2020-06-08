getUserData();

function openSection(btn){
	
}
function addSection(btn){

}
function changeColor(btn){
	if(btn.id !== 'pressed'){
		btn.id = 'pressed';
		setTimeout(setId, 90);
	}
	else{
		btn.id = 'section';
	}
		
	function setId(){
		btn.id = 'section';
	}
}
async function getUserData(){
	url = 'http://supine.local/api/v1/get-prof-data'
	let response = await fetch(url);

	
	let result = await response.json();
	preData = JSON.parse(result);
	data = preData[0];

	insertValues(data);
}
function insertValues(data){

	uname = document.createTextNode(data['username']);
	fname = document.createTextNode(data['fullname']);
	avatar = document.createTextNode(data['avatar']);

	unameField = document.getElementById('username');
	fnameField = document.getElementById('full-name');
	avatarField = document.getElementById('prof-pic');

	let array = [[unameField, uname], [fnameField, fname], [avatarField, avatar]];
	
	for(const arr in array){

		if(array[arr][1].wholeText !== "null"){
			array[arr][0].appendChild(array[arr][1]);
			}
	}
}


