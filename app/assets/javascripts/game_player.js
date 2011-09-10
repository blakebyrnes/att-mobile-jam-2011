var teams = {
  'tl-corner': 'red',
  'tr-corner': 'orange',
  'bl-corner': 'blue',
  'br-corner': 'yellow'
};
var client = new Faye.Client("/faye");
client.subscribe("/gamestart", function(message){
	Game.StartCountdown();
});
$("#board").bind("touchesbegan click", function(){
	if (Game.Started) {
		client.publish("/tap", { teamId : teams[$(this).attr('id')] });
	}
});
$("#team-chooser > div").bind("click", function(){
	$("#team-chooser").hide();
	client.publish("/jointeam", { teamId : teams[$(this).attr('id')] });
});

function App() {
	var _this = this;
	this.Counter = 5;
	this.CtrInterval;
	this.Started = false;
	this.CountDown = function(){
		if (_this.Counter < 0) {
			clearInterval(_this.CtrInterval);
		} else if (_this.Counter == 0) {
			$("#counter").text("GO! -- Tap to Move the Ball");
		} else {
			$("#counter").text(_this.Counter--);
		}
	};
	this.StartCountdown = function(){
		$("#counter").show().text("Get READY!");
		_this.CtrInterval = setInterval(_this.CountDown, 1000);
		_this.Started = true;
	}; 
};
var Game = new App();