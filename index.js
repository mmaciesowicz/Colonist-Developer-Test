var spans = document.querySelectorAll('span.btn-title');
var titles = document.querySelectorAll('.btn-text-top');
var btns = document.querySelectorAll('.btn');
const letterSpacingDiff = 0.15;
const letterSpacingDiffPix = 3;

async function buttonTwoAction() {
	let apiResult = await getAPIResult();
	console.log(apiResult);
	let ids = apiResult.slice(0, 5).map(item => item.id);
	console.log("First 5 room ids: " + ids);
}

async function getAPIResult() {
	let apiResult =  await sendAPIRequest().then(data => {
		return data;
	  });
	return apiResult.games;
}

async function sendAPIRequest() {
	const url = 'https://colonist.io/api/game-list';

	return await fetch(url)
    .then(response => {
		if (!response.ok) {
        	throw new Error('Error retrieving response from server.');
      	}
      	return response.json(); // This returns a promise
	})
    .catch(error => console.error('Error:', error));
}

function buttonOneAction() {
	window.location.href = generateRoomURL();
}

function generateRoomURL() {
	roomID = generateRoomID();
	return "https://colonist.io/#" + roomID;
}

function generateRoomID(numChars = 4) {
 return Math.random().toString(36).substring(2,numChars+2);
}

function buttonMouseOver(e) {
	const titleText = e.querySelector('span.btn-title');
	const textContainer = e.querySelector('.btn-text-top');

	const numLetters =  titleText.innerText.length;
	extraSpace = (letterSpacingDiffPix * (numLetters));
	// console.log(numLetters);
	// console.log(extraSpace);

	// console.log(titleText.offsetWidth);
	// console.log(e.offsetWidth);
	const bodyPaddingTotal = parseFloat(window.getComputedStyle(document.body).getPropertyValue('padding-left')) + parseFloat(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
	
	// console.log(titleText.offsetWidth + extraSpace + bodyPaddingTotal/2);
	if (Math.ceil(titleText.offsetWidth) + extraSpace <= Math.floor(e.offsetWidth) && 
	Math.ceil(titleText.offsetWidth) + extraSpace < screen.width/2 -bodyPaddingTotal) { /* Ensure the increased text does not fill up more than half of the screen so other button stays the same size */
		titleText.style.letterSpacing = "6.5px";
	}
}

function buttonMouseOut(e) {
	const titleText = e.querySelector('span.btn-title');
	const textContainer = e.querySelector('.btn-text-top');

	const numLetters =  titleText.innerText.length;
	extraSpace = (letterSpacingDiffPix * (numLetters));
	// console.log(numLetters);
	// console.log(extraSpace);

	// console.log(titleText.offsetWidth);
	// console.log(e.offsetWidth);
	if (Math.ceil(titleText.offsetWidth) - extraSpace <= Math.floor(e.offsetWidth)) {
		titleText.style.letterSpacing = "3.5px";
	}
}