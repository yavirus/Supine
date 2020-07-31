getUserData();
getSectionData();


function openSection(btn){
	let subRow = btn.parentNode.parentNode.querySelector('#sub-row');
	let allSubRow = document.getElementsByName('sub_row');
	let wrapDiv = document.getElementsByName('wrap_div');
	let subSecCol = btn.parentNode.parentNode;
	let sectionRow = document.getElementById('row');
	let memesTable = document.getElementById('memes-table');
	let addInput = document.getElementsByClassName('add-input').wrap_div;

	removeAddInput();


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
async function saveSection(secName, secImage){
		let url = 'http://sup-ine.com/api/v1/add-section';
		let formData = new FormData();

		formData.append('title', secName)
		try{
			formData.append('image', secImage)
		}
		catch{

		}

		let response = await fetch(url , {
				method: 'POST',
				body: formData
			});

}
	
async function saveSubSection(sec_name, subSecName){
	let url = 'http://sup-ine.com/api/v1/add-sub-section';
	let secData = [sec_name, subSecName];

	let response = await fetch(url , {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(secData)
		});

		let result = await response.json();

		console.log(result);
}

function addSection(event){
	let data = document.forms.section_form
	let title = data.elements.sec_title_inp.value
	let image = data.elements.sec_image_inp.files[0]
	let key = event.keyCode || event.wich;
	let row = document.getElementById('row');
	let addInput = document.getElementsByClassName('add-input').wrap_div;

	if(key == 13){
		wrap = newSection(row, addInput, title);

		newSubAddSection(wrap);

		removeAddInput();

		saveSection(title, image);
	}

}

function newSection(row, addInput, title){
	let newWrap = document.createElement('div');
	newWrap.id = 'wrap-div';
	newWrap.name = 'wrap_div';
	newWrap.setAttribute('name', 'wrap_div');
	row.appendChild(newWrap);

	addInput.style.order = newWrap.style.order +1;

	let newDiv = document.createElement('div');
	newDiv.id = 'sec-col';
	newDiv.classList.add('col-md-6');
	newDiv.classList.add('col-lg-4');
	newWrap.appendChild(newDiv);

	let newButton = document.createElement('button');
	newButton.id = 'section';
	newButton.classList.add('col');
	newDiv.appendChild(newButton);

	newButton.setAttribute('onclick', 'openSection(this)');
	newButton.setAttribute('onmousedown', 'changeColor(this)');
	let btnText = document.createTextNode(title);
	newButton.appendChild(btnText);

	return newWrap;
}

function newImageSection(row, addInput, data){
	let newWrap = document.createElement('div');
	newWrap.classList.add('wrap-div-img');
	newWrap.name = 'wrap_div_img';
	newWrap.setAttribute('name', 'wrap_div_img');
	row.appendChild(newWrap);

	addInput.style.order = newWrap.style.order +1;

	let newDiv = document.createElement('div');
	newDiv.classList.add('sec-col-img');
	newDiv.classList.add('col-md-6');
	newDiv.classList.add('col-lg-4');
	newWrap.appendChild(newDiv);

	let newButton = document.createElement('button');
	newButton.classList.add('section-img');
	newButton.classList.add('col');
	newDiv.appendChild(newButton);

	newButton.setAttribute('onclick', 'openSection(this)');
	newButton.setAttribute('onmousedown', 'changeColor(this)');

	let newImg = document.createElement('img');
	newImg.classList.add('sec-image');
	newImg.src = "data:image/png;base64," + data[1];
	newButton.appendChild(newImg);

	let newTextDiv = document.createElement('div');
	newTextDiv.classList.add('sec-title')
	let btnText = document.createTextNode(data[0]);
	newTextDiv.appendChild(btnText);
	newButton.appendChild(newTextDiv);

	return newWrap;
}

function newSubAddSection(wrap){
	let newSubRow = document.createElement('div');
	newSubRow.id = 'sub-row';
	newSubRow.classList.add('row');
	newSubRow.setAttribute('name', 'sub_row');
	wrap.appendChild(newSubRow);

	let newSubDiv = document.createElement('div');
	newSubDiv.id = 'add-sub-sec-col';
	newSubDiv.classList.add('col-sm-2');
	newSubDiv.classList.add('add-sub-sec-col');
	newSubDiv.setAttribute('name', 'add_sub_sec_col');
	newSubRow.appendChild(newSubDiv);

	let newSubBtn = document.createElement('button');
	newSubBtn.id = 'add-sub-section';
	newSubBtn.classList.add('col');
	newSubBtn.setAttribute('onmousedown', 'changeColor(this)');
	newSubBtn.setAttribute('onclick', 'addSubInput(this.parentNode.parentNode)');
	newSubBtn.appendChild(document.createTextNode('+'));
	newSubDiv.appendChild(newSubBtn);

	let newSubInputDiv = document.createElement('div');
	newSubInputDiv.id = 'add-sub-sec-input';
	newSubInputDiv.classList.add('col-sm-2');
	newSubRow.appendChild(newSubInputDiv);

	let newSubInput = document.createElement('input');
	newSubInput.id = 'add-sub-input';
	newSubInput.classList.add('col');
	newSubInput.setAttribute('max-length', 50);
	newSubInput.setAttribute('onkeypress', 'addSubSection(event, this)');
	newSubInputDiv.appendChild(newSubInput);

	return newSubRow;

}
function addSubSection(event, input){
	let key = event.keyCode || event.wich;
	let row = input.parentNode.parentNode;
	let addInput = row.querySelector('.add-sub-sec-col');
	let secName = row.parentNode.querySelector('#sec-col').firstChild.textContent;

	if(key == 13){
		let subTitle = newSubSection(row, addInput, input.value);

		removeSubInput(input);

		saveSubSection(secName, subTitle);
	}
}
function newSubSection(row, addInput, input){
	let newDiv = document.createElement('div');
	newDiv.id = 'sub-sec-col';
	newDiv.classList.add('col-sm-2');
	row.appendChild(newDiv);

	addInput.style.order = newDiv.style.order +1;

	let newButton = document.createElement('button');
	newButton.id = 'sub-section';
	newButton.classList.add('col');
	newDiv.appendChild(newButton);

	newButton.setAttribute('onmousedown', 'changeColor(this)');
	let btnText = document.createTextNode(input);
	newButton.appendChild(btnText);

	return newButton.textContent

}

function removeSubInput(input){
	let newSec = input.parentNode;

	if(newSec.style.display){
		input.value = null;
		newSec.style.display = null;
	}
}

function removeAddInput(){
	let newSec = document.getElementById('add-section-col');
	let newSecInput = document.getElementById('add-section');

	if(newSec.style.display){
		newSecInput.value = null;
		newSec.style.display = null;
	}

}

function addAddInput(){
	let addInput = document.getElementsByClassName('add-input').wrap_div;
	let newSec = document.getElementById('add-section-col');
	let newSecInput = document.getElementById('add-section');

	if(!newSec.style.display){
		closeSection();

		newSecInput.value = null;
		newSec.style.display = 'flex';

	}
	else{
		newSecInput.value = null;
		newSec.style.display = null;
	}
}

function closeSection(){
	let allSubRow = document.getElementsByName('sub_row');
	let wrapDiv = document.getElementsByName('wrap_div');
	let sectionRow = document.getElementById('row');
	let memesTable = document.getElementById('memes-table');
	let addInput = document.getElementsByClassName('add-input').wrap_div;

	for (var i = 0, max = allSubRow.length; i < max; i++) {
   			 allSubRow[i].style.display = null;
	}


	}



function addSubInput(input){
	let addInput = input.querySelector('.add-sub-sec-col');
	let newSec = input.querySelector('#add-sub-sec-input');
	let newSecInput = input.querySelector('#add-sub-input');


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
	let url = 'http://sup-ine.com/api/v1/get-prof-data';

	let response = await fetch(url);

	
	let result = await response.json();
	let preData = JSON.parse(result);
	let data = preData[0];

	insertValues(data);
}

async function getSectionData(){
	let url = 'http://sup-ine.com/api/v1/get-sec-data';

	let response = await fetch(url);
	let result = await response.json();

	let data = JSON.parse(result);

	for(let [key, value] of Object.entries(data)){
		subRow = await insertSecData(key);
		insertSubSecData(subRow, value);
	}
}


function insertSecData(preData){
	let row = document.getElementById('row');
	let addInput = document.getElementsByClassName('add-input').wrap_div;

	try{
		data1 = preData.split(/[\][]+/);
		data2 = data1[1].split(',');
		title = data2[0].split("'");
		image = data2[1].split("'");
		data = [title[1], image[1]];

		let wrap = newImageSection(row, addInput, data);
		let subRow = newSubAddSection(wrap);

		return subRow;
	}
	catch{
		let wrap = newSection(row, addInput, preData);
		let subRow = newSubAddSection(wrap);

		return subRow;
		
	}
	
}

function insertSubSecData(row, data){
	let addInput = row.querySelector('.add-sub-sec-col');
	for(name in data){
		newSubSection(row, addInput, data[name]);
	}

	
}

function insertValues(data){

	let uname = document.createTextNode(data['username']);
	let fname = document.createTextNode(data['fullname']);

	let unameField = document.getElementById('username');
	let fnameField = document.getElementById('full-name');

	let array = [[unameField, uname], [fnameField, fname]];
	
	for(const arr in array){

		if(array[arr][1].wholeText !== "null"){
			array[arr][0].appendChild(array[arr][1]);
			}
	}
}

async function uploadAvatar(){
	let image = document.getElementById("prof-pic-pick").files[0];

	let formData = new FormData();

	formData.append('image', image);
	

	let response = await fetch('http://sup-ine.com/api/v1/upload-avatar', {
		method: 'POST',
		body: formData
	});

	location.reload();
}



