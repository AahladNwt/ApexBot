function isBotTalking(state)
{
	$("#statusDisplay").fadeOut(100, function() { 
		$("#statusDisplay").attr("src", state ? ApexSettings.Speaking.General.Indicator : ApexSettings.Listening.General.Indicator); 
	}).fadeIn(600);
}

var recognition = new webkitSpeechRecognition();

recognition.lang = ApexSettings.Listening.General.Language;
recognition.continuous = ApexSettings.Listening.General.Continuous;
recognition.interimResults = ApexSettings.Listening.General.Interim_results;

var msg = new SpeechSynthesisUtterance();

msg.lang = ApexSettings.Speaking.General.Language;
msg.rate = ApexSettings.Speaking.General.Rate;

recognition.onresult = function(event) {
	if (event.results[event.results.length - 1].isFinal && event.results[event.results.length - 1][0].confidence > 0.40) 
		axbt_.execCommand(event.results[event.results.length - 1][0].transcript.trim());
}

recognition.start();

recognition.onend = function(){ recognition.start(); }
msg.onend = function(event) { isBotTalking(false); }
msg.onstart = function(event) { isBotTalking(true); }