/*
Apex states
-- BotActive --
This state keeps track of Apex if he is active or inactive e.g. sleep mode.

-- Home --
This state keeps track of Apex if he shows the home screen or not.

-- Startup --
This state tells Apex if he should greet you.

-- Face --
	- Detected -
	This state tells you if Apex detectes a face.
	- Timer -
	This state tells you for how long Apex has not detected a face.
	After a certain amount of time Apex will go to sleep, see:
	ApexSettings.Speaking.Timer.Interim_threshold.Min in ApexSettings.
*/

var State = 
{
	BotActive : true,
	SpeakingAllowed : true,
	Home : false,
	Startup : true,
	Face: {
		Detected : false,
		Timer : 0
	}
}

/*
Apex Settings
-- Audio --
	- Startup_sound -
	This setting allows Apex to play a sound when waking up.

-- Speaking --
	- General -
		* Language *
		Tell Apex in which language he should approach you e.g. nl-NL, en-GB or us-US.
		* Rate *
		Tell Apex how fast he should talk to you.
		* Indicator *
		Set an image so that Apex can show you if he is speaking.
	- Message -
		* Opening *
		Opening messages that Apex can greet you with based on the daypart e.g. morning, afternoon or evening.
		* Closing *
		Closing messages that Apex can greet you with based on the daypart e.g. morning, afternoon or evening.
		* Interim *
		This is the message Apex will greet you with if you've been away for e.g. between half a minute and 5 minutes, see:
		ApexSettings.Speaking.Timer.Interim_threshold.Min & ApexSettings.Speaking.Timer.Interim_threshold.Max for modifying this.
		* Startup*
		This is the initial/startup message Apex will tell/ask you if he woke up.
	- Timer -
		* Interim_threshold *
		Contains two values which between Apex will greet you with the interim message.
		Values are in seconds e.g. 300 seconds =  5 minutes.

-- Listening --
	- General -
		* Language *
	 	Tell Apex in which language he should listen to you e.g. nl-NL, en-GB or us-US.
	 	* Continuous *
	 	Tell Apex if he should listen to you continously, it is advices to keep this true.
	 	* Interim_results *
	 	Words that Apex detected before his final decision, it is advices to keep this false.
	 	* Indicator *
		Set an image so that Apex can show you if he is listening.
		* Command *
		Set commands which Apex will execute with a specific task, see addCommand examples in script.js.
*/
var ApexSettings = 
{
	Audio : {
		Startup_sound : ''
	},
	Speaking: { 
		General : {
			Language : 'en-GB',
			Rate : 0.8,
			Indicator : './js/talk.svg'
		},
		Message : {
			Opening : {
				Morning: ['Good morning.', 'Good morning, today will be a great day!', 'Good morning Timothy.'],
				Afternoon: ['Good afternoon.', 'Good afternoon Timothy.'],
				Evening: ['Good evening.', 'Good evening Timothy.'],
			},
			Closing : {
				Morning: ['Goodbye.', 'Goodbye, have a great day!'],
				Afternoon: ['Goodbye.'],
				Evening: ['Goodbye.', 'Goodbye, have a wonderful night.'],
			},
			Interim : 'Welcome back.',
			Startup : ['How can I help you?']
		},
		Timer : {
			Interim_threshold : {
				Min : 30,
				Max : 300
			}
		}
	},
	Listening : {
		General : {
			Language : 'en-GB',
			Continuous : true,
			Interim_results : false,
			Indicator : './js/listen.svg'
		},
		Command : { }
	}
};