window.addEventListener('resize', checkResolution);
checkResolution()

function checkResolution(){
	rez = window.innerWidth;
	minRez = 1000;
	block = document.getElementById('words-block');
	container = document.getElementById('main-container');
	if(rez <=1000){
		block.style.display = 'none';
		container.style.justifyContent = 'center';
	}
	else if(block.style.display == 'none'){
		block.style.display = 'flex';
		container.style.justifyContent = 'space-between';
	}
}
function changeColor(btn){
	if(btn.className !== 'pressed'){
		if(btn.className == 'key-word-btn'){
			btn.className = 'pressed';
			setTimeout(setId, 90);
		}
	}
	else{
		btn.className = 'key-word-btn';
	}
		
	function setId(){
		btn.className = 'key-word-btn';
	}
}