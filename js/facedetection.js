window.onload = function() {

	var video = document.getElementById('capture');
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	var tracker = new tracking.ObjectTracker('face');

	tracker.setInitialScale(4);
	tracker.setStepSize(2);
	tracker.setEdgesDensity(0.1);
	tracking.track('#capture', tracker, { camera: true });

	tracker.on('track', function(event) 
	{
		State.Face.Detected = !(event.data.length == 0);

		context.clearRect(0, 0, canvas.width, canvas.height);

		event.data.forEach(function(rect) {
			context.strokeStyle = '#a64ceb';
			context.strokeRect(rect.x, rect.y, rect.width, rect.height);
			context.font = '11px Helvetica';
			context.fillStyle = "#fff";
			context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
			context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
		});
	});
};

var clcTimer = 0;

setInterval(function()
{ 
	if (State.Startup && State.BotActive) 
	{
		greet(new Date(), true);

		if (ApexSettings.Audio.Startup_sound != '')
		{
			var wake = new Audio(ApexSettings.Audio.Startup_sound);
			wake.play();
		}

		$("#time").fadeIn(1000);
		$("#status").fadeIn(1000);
		$("section").fadeIn(1000);

		State.Startup = false;
		State.Face.Timer = 0;
	}

	if (State.Face.Detected && clcTimer < ApexSettings.Speaking.Timer.Interim_threshold.Min)
		clcTimer = 0;

	if (!State.Face.Detected)
		clcTimer++;
	
	if (!State.Face.Detected && clcTimer > (ApexSettings.Speaking.Timer.Interim_threshold.Min - 1))
	{
		$("#time").fadeOut(1000);
		$("#status").fadeOut(1000);
		$("section").fadeOut(1000);

		State.BotActive = false;
	}

	if (State.Face.Detected && clcTimer > (ApexSettings.Speaking.Timer.Interim_threshold.Min - 1))
	{
		State.BotActive = true;
		State.Home = false;
		State.Startup = true;
		State.Face.Timer = clcTimer;

		clcTimer = 0;
	}
}, 1000);