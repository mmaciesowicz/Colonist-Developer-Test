var btns = document.querySelectorAll('.btn');
var btnTitleDiv = document.querySelector('.btn-title');
var btnTitleStyle = window.getComputedStyle(btnTitleDiv);
var defaultLetterSpacing = btnTitleStyle.getPropertyValue('letter-spacing');
const hoverLetterSpacing = "6.5px";
const letterSpacingDiffPix = Math.abs(parseFloat(hoverLetterSpacing) - parseFloat(defaultLetterSpacing));
var buttonHoverOn;

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

	// const numLetters =  titleText.innerText.length;
	// extraSpace = (letterSpacingDiffPix * (numLetters));

	// const bodyPaddingTotal = parseFloat(window.getComputedStyle(document.body).getPropertyValue('padding-left')) + parseFloat(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
	
	// if (Math.ceil(titleText.offsetWidth) + extraSpace <= Math.floor(e.offsetWidth) 
	// 	&& Math.ceil(titleText.offsetWidth) + extraSpace < screen.width/2 -bodyPaddingTotal /* Ensure the increased text does not fill up more than half of the screen so other button stays the same size */
	// 	&& buttonHoverOn) {
	// 	titleText.style.letterSpacing = hoverLetterSpacing;
	// }
	// else {
	// 	buttonHoverOn = false;
	// }
	if (buttonHoverOn) {
		titleText.style.letterSpacing = hoverLetterSpacing;
	}
}

function buttonMouseOut(e) {
	const titleText = e.querySelector('span.btn-title');

	// const numLetters =  titleText.innerText.length;
	// extraSpace = (letterSpacingDiffPix * (numLetters));

	// if (Math.ceil(titleText.offsetWidth) - extraSpace <= Math.floor(e.offsetWidth)) {
	// 	titleText.style.letterSpacing = "3.5px";
	// }
	if (titleText.style.letterSpacing === hoverLetterSpacing) {
		titleText.style.letterSpacing = defaultLetterSpacing;
	}
}

// Function that determines whether the letter-spacing effect should take place on hover
function setupHoverEffect() {
	const bodyPaddingTotal = parseFloat(window.getComputedStyle(document.body).getPropertyValue('padding-left')) + parseFloat(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
		
	for (let i=0; i<btns.length; i++) {
		const titleText = btns[i].querySelector('span.btn-title');
		const numLetters = titleText.innerText.length;
		extraSpace = (letterSpacingDiffPix * (numLetters));
	

		if (Math.ceil(titleText.offsetWidth) + extraSpace <= Math.floor(btns[i].offsetWidth) /* Ensure the increased lettering-space stays on the same line(s) (and does not switch from one line to two or vice versa) */
			&& Math.ceil(titleText.offsetWidth) + extraSpace < screen.width/2 -bodyPaddingTotal) { /* Ensure the increased lettering-space does not fill up more than half of the screen so other button stays the same size */
			buttonHoverOn = true;
		}
		else {
			buttonHoverOn = false;
			break;
		}
	}
}

// Update letter-spacing effect capabilities
window.addEventListener("resize", () => {
	setupHoverEffect();
});

window.onload = function() {
	setupHoverEffect();
};