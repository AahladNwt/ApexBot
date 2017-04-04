// Create Apex!
var axbt_ = new ApexBot();

// Feed Apex information.
axbt_.loadSettings(ApexSettings);

// Unleash Apex
axbt_.start();

// Learn Apex some commands & tricks.
axbt_.addCommand(['be quiet', 'quiet please', 'be quiet please'], function() {
	if (State.BotActive) 
	{
		if(State.SpeakingAllowed) {
			State.SpeakingAllowed = false;
			axbt_.talk('I will be quiet from now on.');
		}
		else axbt_.talk('I\'m quiet already!');
	}
});

axbt_.addCommand(['you can talk', 'you can speak', 'you may talk', 'you may speak'], function() {
	if (State.BotActive) 
	{
		if(!State.SpeakingAllowed) {
			State.SpeakingAllowed = true;
			axbt_.talk('Thank you.');
		}
		else axbt_.talk('I\'m speaking already?');
	}
});

axbt_.addCommand('sleep', function() {
	greet(new Date(), false);
	State.BotActive = false;
});

/*
axbt_.addCommand(['weather', 'what is the current weather', 'current weather'], function() {
	if (State.BotActive) 
	{
		var API_LINK_WEATHER_TODAY = '';

		axbt_.getJSON(API_LINK_WEATHER_TODAY, function(err, data) {
		  	if (data != null)
		  		axbt_.talk('It is currently ' + data.current_observation.feelslike_c + ' degrees.', 'With a ' + data.current_observation.weather.toLowerCase() + ' sky.');
		});

		State.Home = false;
	}
});
*/

axbt_.addCommand(['inspire', 'inspire me', 'give me a quote', 'tell me a quote'], function() {
	if (State.BotActive) 
	{
		var API_LINK_QUOTE_OF_THE_DAY = 'https://quotes.rest/qod.json?category=inspire';

		axbt_.getJSON(API_LINK_QUOTE_OF_THE_DAY, function(err, data) {
		  	if (data != null)
				axbt_.talk('"' + data.contents.quotes[0].quote + '"', ' - ' +  data.contents.quotes[0].author);
		});

		State.Home = false;
	}
});

axbt_.addCommand('wake up', function() {
	if (!State.BotActive) {
		clcTimer = 0;

		// Bot active?
		State.BotActive = true;
		State.Home = false;
		State.Startup = true;
	}
	else {
		axbt_.talk(['I\'m awake.', 'I\'m already awake!', 'I\'m awake already did you not know?!']);
	}
});

axbt_.addCommand(['thanks', 'thank you', 'alright', 'I\'ll keep that in mind', 'no I did not', 'no I didn\'t'], function() {
	if (State.BotActive)
	{
		State.BotActive = true;
		State.Startup = false;
		State.Home = true;
	}	
});