function ApexBot(botName) {
    this.name = botName;
}

ApexBot.prototype.loadSettings = function(settings) {
	this.settings = settings;
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