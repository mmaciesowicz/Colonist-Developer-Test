const bodyPaddingTotal = parseFloat(getBodyPropertyValue('padding-left')) + parseFloat(getBodyPropertyValue('padding-right'));

function getBodyPropertyValue(propertyValue) {
	return window.getComputedStyle(document.body).getPropertyValue(propertyValue);
}

class ColonistButton {
	constructor(buttonObject, defaultLetterSpacing = "3.5px") {
		this.buttonObject = buttonObject;
		this.titleText = this.buttonObject.querySelector('span.btn-title');
		this.numLetters = this.titleText.innerText.length;
		this.defaultLetterSpacing = defaultLetterSpacing;
	}
	buttonAction() {
        throw new Error("This method should be overridden by subclasses");
    }

	buttonMouseEnter() {
		throw new Error("This method should be overridden by subclasses");
	}
	
	buttonMouseLeave() {
		throw new Error("This method should be overridden by subclasses");
	}
}

class ButtonHoverEffect extends ColonistButton {
	#extraSpace;
	constructor(buttonObject, hoverLetterSpacing = "6.5px") {
		super(buttonObject);
		this.hoverLetterSpacing = hoverLetterSpacing;
		this.hasHoverEffect = this.shouldEnableHoverEffect();
		this.letterSpacingDifference = Math.abs(parseFloat(this.hoverLetterSpacing) - parseFloat(super.defaultLetterSpacing));
		this.#extraSpace = this.letterSpacingDifference * super.numLetters;
	}

	buttonAction() {
        throw new Error("This method should be overridden by subclasses");
    }

	buttonMouseEnter() {
		if (this.hasHoverEffect) {
			this.titleText.style.letterSpacing = this.hoverLetterSpacing;
		}
	}
	
	buttonMouseLeave() {
		this.titleText.style.letterSpacing = this.defaultLetterSpacing;
	}

	shouldEnableHoverEffect() {
		return this.isLetterSpacingOnSameLine(this.titleText, this.buttonObject) && this.isLetterSpacingHalfContainerSize(titleText);
	}

	isLetterSpacingOnSameLine(textObject, textContainer) {
		return Math.ceil(textObject.offsetWidth) + this.#extraSpace <= Math.floor(textContainer.offsetWidth);
	}
	
	isLetterSpacingHalfScreenSize(textObject) {
		return Math.ceil(textObject.offsetWidth) + this.#extraSpace < screen.width / 2 - bodyPaddingTotal;
	}
}

class QuickPlayButton extends ButtonHoverEffect {
	constructor(buttonObject) {
		super(buttonObject);
	}
	buttonAction() {
		window.location.href = "https://colonist.io/#" + this.generateAlphanumericRoomID();
	}
	
	generateAlphanumericRoomID(roomIDLength = 4) {
		return Math.random().toString(36).substring(2, roomIDLength + 2);
	}
}

class PlayOnlineButton extends ButtonHoverEffect {
	constructor(buttonObject) {
		super(buttonObject);
	}
	async buttonAction() {
		let apiResult = await this.getAPIResult();
		console.log(apiResult);
		let ids = apiResult.slice(0, 5).map(item => item.id);
		console.log("First 5 room ids: " + ids);
	}
	
	async getAPIResult() {
		let apiResult = await this.sendAPIRequest().then(data => {
			return data;
		});
		return apiResult.games;
	}
	
	async sendAPIRequest() {
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
}

// Function that determines whether the letter-spacing effect should take place on hover
// function setupHoverEffect() {
// 	for (let i = 0; i < btns.length; i++) {
// 		const titleText = btns[i].querySelector('span.btn-title');
// 		const numLetters = titleText.innerText.length;
// 		extraSpace = (letterSpacingDiffPix * (numLetters));

// 		if (isLetterSpacingOnSameLine(titleText, btns[i])
// 			&& isLetterSpacingHalfContainerSize(titleText, screen)) { /* Ensure the increased lettering-space does not fill up more than half of the screen so other button stays the same size */
// 			isButtonHoverEnabled = true;
// 		}
// 		else {
// 			buttonHoverOn = false;
// 			break;
// 		}
// 	}
// }

// Update letter-spacing effect capabilities
// window.addEventListener("resize", () => {
// 	setupHoverEffect();
// });

// window.onload = function () {
// 	setupHoverEffect();
// };

const quickPlayButtonElement  = document.getElementById("quickPlayButton");
const playOnlineButtonElement = document.getElementById("playOnlineButton");

const buttonInstances = [new QuickPlayButton(quickPlayButtonElement), new PlayOnlineButton(playOnlineButtonElement)];

Object.keys(buttonInstances).forEach(key => {
	const buttonInstance = buttonInstances[key];
	buttonInstance.buttonObject.addEventListener("click", function(event) {
		buttonInstance.buttonAction();
	});
	buttonInstance.buttonObject.addEventListener("mouseenter", function(event) {
		// console.log("mouseover");
		buttonInstance.buttonMouseEnter();
	});
	buttonInstance.buttonObject.addEventListener("mouseleave", function(event) {
		// console.log("mouseleave");
		buttonInstance.buttonMouseLeave();
	});
  });