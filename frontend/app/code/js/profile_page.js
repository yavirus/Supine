getUserData();

function openSection(btn){
	subRow = btn.parentNode.parentNode.querySelector('#sub-row');
	allSubRow = document.getElementsByName('sub_row');
	wrapDiv = document.getElementsByName('wrap_div');
	subSecCol = btn.parentNode.parentNode;
	sectionRow = document.getElementById('row');
	memesTable = document.getElementById('memes-table');
	addInput = document.getElementsByClassName('add-input').wrap_div;


	if(!subRow.style.display){
		for (var i = 0, max = allSubRow.length; i < max; i++) {
   			 allSubRow[i].style.display = null;
		}
		for (var i = 0, max = wrapDiv.length; i < max; i++){
   			 	wrapDiv[i].style.order = 'initial';
   		}

   		addInput.style.order = 1;
		subRow.style.display = 'flex';
		sectionRow.style.flexDirection = 'column';
		memesTable.setAttribute('style', 'justify-content: left !important');
		subSecCol.style.order = -1;
}

	else{
		for (var i = 0, max = allSubRow.length; i < max; i++) {
   			 allSubRow[i].style.display = null;
		}
		for (var i = 0, max = wrapDiv.length; i < max; i++){
   			 	wrapDiv[i].style.order = 'initial';
   		}

   		addInput.style.order = 1;
		sectionRow.style.flexDirection = 'row';
		memesTable.style.justifyContent = 'center';
		subSecCol.style.order = 'unset';
	}
}

function addSection(event, input){
	key = event.keyCode || event.wich;
	row = document.getElementById('row');
	addInput = document.getElementsByClassName('add-input').wrap_div;

	if(key == 13){
		wrap = newSection(row, addInput, input);

		newSubAddSection(wrap);

		removeAddInput();
	}

}
function newSection(row, addInput, input){
	newWrap = document.createElement('div');
	newWrap.id = 'wrap-div';
	newWrap.name = 'wrap_div';
	newWrap.setAttribute('name', 'wrap_div');
	row.appendChild(newWrap);

	addInput.style.order = newWrap.style.order +1;

	newDiv = document.createElement('div');
	newDiv.id = 'sec-col';
	newDiv.classList.add('col-md-6');
	newDiv.classList.add('col-lg-4');
	newWrap.appendChild(newDiv);

	newButton = document.createElement('button');
	newButton.id = 'section';
	newButton.classList.add('col');
	newDiv.appendChild(newButton);

	newButton.setAttribute('onclick', 'openSection(this)');
	newButton.setAttribute('onmousedown', 'changeColor(this)');
	btnText = document.createTextNode(input.value);
	newButton.appendChild(btnText);

	return newWrap;
}
function newSubAddSection(wrap){
	newSubRow = document.createElement('div');
	newSubRow.id = 'sub-row';
	newSubRow.classList.add('row');
	newSubRow.setAttribute('name', 'sub_row');
	wrap.appendChild(newSubRow);

	newSubDiv = document.createElement('div');
	newSubDiv.id = 'sub-sec-col';
	newSubDiv.classList.add('col-sm-2');
	newSubDiv.classList.add('sub-sec-col');
	newSubDiv.setAttribute('name', 'sub_sec_col');
	newSubRow.appendChild(newSubDiv);

	newSubBtn = document.createElement('button');
	newSubBtn.id = 'sub-section';
	newSubBtn.classList.add('col');
	newSubBtn.setAttribute('onmousedown', 'changeColor(this)');
	newSubBtn.setAttribute('onclick', 'addSubInput(this.parentNode.parentNode)');
	newSubBtn.appendChild(document.createTextNode('+'));
	newSubDiv.appendChild(newSubBtn);

	newSubInputDiv = document.createElement('div');
	newSubInputDiv.id = 'add-sub-sec-col';
	newSubInputDiv.classList.add('col-sm-2');
	newSubRow.appendChild(newSubInputDiv);

	newSubInput = document.createElement('input');
	newSubInput.id = 'add-sub-input';
	newSubInput.classList.add('col');
	newSubInput.setAttribute('max-length', 50);
	newSubInput.setAttribute('onkeypress', 'addSubSection(event, this)');
	newSubInputDiv.appendChild(newSubInput);

}
function addSubSection(event, input){
	key = event.keyCode || event.wich;
	row = input.parentNode.parentNode;
	addInput = document.getElementsByClassName('sub-sec-col').sub_sec_col;

	if(key == 13){
		newSubSection(row, addInput, input);

		removeSubInput(input);
	}
}
function newSubSection(row, addInput, input){
	newDiv = document.createElement('div');
	newDiv.id = 'sub-sec-col';
	newDiv.classList.add('col-sm-2');
	row.appendChild(newDiv);

	addInput.style.order = newDiv.style.order +1;

	newButton = document.createElement('button');
	newButton.id = 'sub-section';
	newButton.classList.add('col');
	newDiv.appendChild(newButton);

	newButton.setAttribute('onmousedown', 'changeColor(this)');
	btnText = document.createTextNode(input.value);
	newButton.appendChild(btnText);

}

function removeSubInput(input){
	newSec = input.parentNode;

	if(newSec.style.display){
		input.value = null;
		newSec.style.display = null;
	}
}

function removeAddInput(){
	newSec = document.getElementById('add-section-col');
	newSecInput = document.getElementById('add-section');

	if(newSec.style.display){
		newSecInput.value = null;
		newSec.style.display = null;
	}

}

function addAddInput(){
	addInput = document.getElementsByClassName('add-input').wrap_div;
	newSec = document.getElementById('add-section-col');
	newSecInput = document.getElementById('add-section');

	if(!newSec.style.display){
		closeSection();

		newSecInput.value = null;
		newSec.style.display = 'flex';
		newSec.style.order = addInput.style.order +1;
	}
	else{
		newSecInput.value = null;
		newSec.style.display = null;
	}
}

function closeSection(){
	allSubRow = document.getElementsByName('sub_row');
	wrapDiv = document.getElementsByName('wrap_div');
	sectionRow = document.getElementById('row');
	memesTable = document.getElementById('memes-table');
	addInput = document.getElementsByClassName('add-input').wrap_div;

	for (var i = 0, max = allSubRow.length; i < max; i++) {
   			 allSubRow[i].style.display = null;
	}
	for (var i = 0, max = wrapDiv.length; i < max; i++){
   			 wrapDiv[i].style.order = 'initial';
   	}

   	addInput.style.order = 1;
	sectionRow.style.flexDirection = 'row';
	memesTable.style.justifyContent = 'center';

	}



function addSubInput(input){
	addInput = input.querySelector('.sub-sec-col');
	newSec = input.querySelector('#add-sub-sec-col');
	newSecInput = input.querySelector('#add-sub-input');


	if(!newSec.style.display){
		newSecInput.value = null;
		newSec.style.display = 'flex';
		newSec.style.order = addInput.style.order +1;
	}
	else{
		newSecInput.value = null;
		newSec.style.display = null;
	}
}

function changeColor(btn){

	if(btn.id !== 'pressed'){
		if(btn.id == 'section'){
			btn.id = 'pressed';
			setTimeout(setId, 90);
		}
		else if(btn.id == 'sub-section'){
			btn.id = 'sub-pressed';
			setTimeout(setSubId, 90);
		}
	}
	else{
		btn.id = 'section';
	}
		
	function setId(){
		btn.id = 'section';
	}
	function setSubId(){
		btn.id = 'sub-section';
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



