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
	buttonOnClick() {
        throw new Error("This method should be overridden by subclasses");
    }

	buttonMouseEnter() {
		throw new Error("This method should be overridden by subclasses");
	}
	
	buttonMouseLeave() {
		throw new Error("This method should be overridden by subclasses");
	}
}

class ButtonLetterHoverEffect extends ColonistButton {
	#hoverLetterSpacing;
	#letterSpacingDifference;
	#extraSpace;
	#hasHoverEffect;
	constructor(buttonObject, hoverLetterSpacing = "6.5px") {
		super(buttonObject);
		this.#hoverLetterSpacing = hoverLetterSpacing;
		this.#letterSpacingDifference = Math.abs(parseFloat(this.#hoverLetterSpacing) - parseFloat(this.defaultLetterSpacing));
		this.#extraSpace = this.#letterSpacingDifference * this.numLetters;
		this.#hasHoverEffect = this.shouldEnableHoverEffect();
	}

	get hasHoverEffect() {
		return this.#hasHoverEffect;
	}

	set hasHoverEffect(value) {
		this.#hasHoverEffect = Boolean(value);
	}

	buttonOnClick() {
        throw new Error("This method should be overridden by subclasses");
    }

	buttonMouseEnter() {
		if (this.#hasHoverEffect) {
			this.titleText.style.letterSpacing = this.#hoverLetterSpacing;
		}
	}
	
	buttonMouseLeave() {
		this.titleText.style.letterSpacing = this.defaultLetterSpacing;
	}

	isLetterSpacingOnSameLine(textObject, textContainer) {
		return Math.ceil(textObject.offsetWidth) + this.#extraSpace <= Math.floor(textContainer.offsetWidth);
	}
	
	// used to ensure both buttons remain taking up equal amount of width on screen
	isLetterSpacingHalfScreenSize(textObject) {
		return Math.ceil(textObject.offsetWidth) + this.#extraSpace < screen.width / 2 - bodyPaddingTotal;
	}

	shouldEnableHoverEffect() {
		return this.isLetterSpacingOnSameLine(this.titleText, this.buttonObject) && this.isLetterSpacingHalfScreenSize(this.titleText);
	}
}

class QuickPlayButton extends ButtonLetterHoverEffect {
	constructor(buttonObject) {
		super(buttonObject);
	}
	buttonOnClick() {
		window.location.href = "https://colonist.io/#" + this.generateAlphanumericRoomID();
	}
	
	generateAlphanumericRoomID(roomIDLength = 4) {
		return Math.random().toString(36).substring(2, roomIDLength + 2);
	}
}

class PlayOnlineButton extends ButtonLetterHoverEffect {
	constructor(buttonObject) {
		super(buttonObject);
	}
	async buttonOnClick() {
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

const quickPlayButtonElement  = document.getElementById("quickPlayButton");
const playOnlineButtonElement = document.getElementById("playOnlineButton");

const buttonInstances = [new QuickPlayButton(quickPlayButtonElement), new PlayOnlineButton(playOnlineButtonElement)];

buttonInstances.forEach(buttonInstance => {
	buttonInstance.buttonObject.addEventListener("click", function() {
		buttonInstance.buttonOnClick();
	});
	buttonInstance.buttonObject.addEventListener("mouseenter", function() {
		buttonInstance.buttonMouseEnter();
	});
	buttonInstance.buttonObject.addEventListener("mouseleave", function() {
		buttonInstance.buttonMouseLeave();
	});

	var globalShouldEnableHoverEffect = function() {
		buttonInstance.hasHoverEffect = buttonInstances.every((buttonInstance) => {
			return buttonInstance.shouldEnableHoverEffect();
		})};
	globalShouldEnableHoverEffect();
	window.addEventListener("resize", () => {
		globalShouldEnableHoverEffect();
	});
});
