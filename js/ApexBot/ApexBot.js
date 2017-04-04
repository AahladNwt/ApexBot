function ApexBot() {
    this.speech = new SpeechSynthesisUtterance();
    this.speechRecognition = new webkitSpeechRecognition();
}

ApexBot.prototype.loadSettings = function(settings) {
	this.settings = settings;
};

ApexBot.prototype.start = function(startupMessage) {
	var that = this;

	this.speechRecognition.lang = this.settings.Listening.General.Language;
	this.speechRecognition.continuous = this.settings.Listening.General.Continuous;
	this.speechRecognition.interimResults = this.settings.Listening.General.Interim_results;

	this.speech.lang = this.settings.Speaking.General.Language;
	this.speech.rate = this.settings.Speaking.General.Rate;

	this.speechRecognition.onresult = function(event) {
		if (event.results[event.results.length - 1].isFinal && event.results[event.results.length - 1][0].confidence > 0.40) 
			that.execCommand(event.results[event.results.length - 1][0].transcript.trim());
	}

	this.speechRecognition.start();

	this.speech.onend   = function(event) { that.updateIndicator(false); }
	this.speech.onstart = function(event) { that.updateIndicator(true);  }

	this.speechRecognition.onend = function() { that.speechRecognition.start(); }
};

ApexBot.prototype.talk = function(message, altMessage) {

	if (!State.BotActive) return;

	var elMessage    = document.getElementById('message');
	var elAltMessage = document.getElementById('altMessage');

	elMessage.textContent    = '';
	elAltMessage.textContent = '';

	if (message.constructor === Array) 
		message = message[Math.floor(Math.random() * message.length)];
	
	if (State.SpeakingAllowed) 
	{
		this.speech.text = message;
		window.speechSynthesis.speak(this.speech);
	}

	var lenOut = (message.length > 19) ? 500 : 200;
	var lenIn = (message.length > 19) ? 1000 : 600;

	if (!($("section").is(":visible"))) 
		$("section").fadeIn(100);

	$("section > div > span > h1").fadeOut(lenOut, function() { 
		elMessage.textContent    = message;
		elAltMessage.textContent = altMessage;
	}).fadeIn(lenIn);
};

ApexBot.prototype.updateIndicator = function(state) {
	var that = this;

	$("#statusDisplay").fadeOut(100, function() { 
		$("#statusDisplay").attr("src", state ? that.settings.Speaking.General.Indicator : that.settings.Listening.General.Indicator); 
	}).fadeIn(600);
};

ApexBot.prototype.displaySettings = function() {
	console.log(this.settings);
	return this.settings;
};

ApexBot.prototype.addCommand = function(speechCmd, funcRef) {
	if (speechCmd.constructor === Array) 
		for(var index = 0; index < speechCmd.length; index++)
			this.settings.Listening.Command[speechCmd[index]] = funcRef;
	else
		this.settings.Listening.Command[speechCmd] = funcRef;
};

ApexBot.prototype.execCommand = function(speechCmd) {
	console.log(speechCmd);
	if(typeof this.settings.Listening.Command[speechCmd] === 'undefined') return;
		this.settings.Listening.Command[speechCmd]();
};

ApexBot.prototype.getJSON = function(url, callback)
{
	var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};