var singleNoteName = "";
var correct = parseInt(0, 10);
var wrong = parseInt(0, 10);
var time = 60;
var t, countdownInterval, letter, letterInterval;
var paused = false;
var clef;
var chosenInstrument;
var countdownCount = 0;

function startGame() {
	correct= 0;
	wrong = 0;
	paused = false;
	time = 60;
	paused==false;
	if ( $('input[name=selection]:checked').val() =="clef") {
		clef = $("#cleff").val();
	}
	else if ( $('input[name=selection]:checked').val() == "instrument") {
		var clefrange = ($("#instrument").val()).split(":");
		console.log(clefrange);
		clef = clefrange[0];
		chosenInstrument = clefrange[1];
	}

	t = setInterval('tick()', 1000);
	$(".clock").html(time).css("color", "white");
	$("#clock, .clock, .pause, .container, .noteButtons").show();
	$("#feedback").attr("class", "").addClass("neutral");
	resizeCanvas( 100, 150);
	draw();
}

function randomEncouragement() {
	var encouragement = [];
	encouragement[0] = "Good!";
	encouragement[1] = "Good!";
	encouragement[2] = "Great!";
	encouragement[3] = "Stellar!";
	encouragement[4] = "Awesome!";
	var randomnumber=Math.floor(Math.random()*5);
	return encouragement[randomnumber];
}

function getCorrectOctave() {

}

function getRandomNote() {
console.log(chosenInstrument);
	if ( $('input[name=selection]:checked').val() =="clef") {
		//numberOfQuestions++
		var notes = ["c","d","e","f","g","a","b"];
		var randomNoteNumber = Math.floor(Math.random()*7);
		var noteName = notes[randomNoteNumber];
		var randomOctaveNumber;
		var octaveNumber;
		singleNoteName = noteName;
		if (clef == "treble") {
			randomOctaveNumber = Math.floor(Math.random()*3);
			octaveNumber = randomOctaveNumber + 3;
		}
		
		if (clef == "bass") {
			randomOctaveNumber = Math.floor(Math.random()*2);
			octaveNumber = randomOctaveNumber + 2;
		}
		
		if (clef == "alto") {
			randomOctaveNumber = Math.floor(Math.random()*2);
			octaveNumber = randomOctaveNumber + 3;
		}
		
		if (clef == "tenor") {
			randomOctaveNumber = Math.floor(Math.random()*2);
			octaveNumber = randomOctaveNumber + 3;
		}
	
		var note = noteName + "/" + octaveNumber;
		return note;
	}
	else if ( $('input[name=selection]:checked').val() == "instrument") {
		var oboe = ["b/3","c/4","d/4","e/4","f/4","g/4","a/4","b/4","c/5","d/5","e/5","f/5","g/5","a/5","b/5","c/6","d/6","e/6","f/6","g/6","a/6"];
		var clarinet = ["d/3","e/3","f/3","g/3","a/3","b/3","c/4","d/4","e/4","f/4","g/4","a/4","b/4","c/5","d/5","e/5","f/5","g/5","a/5","b/5","c/6","d/6","e/6","f/6","g/6","a/6"];
		var flute = ["c/4","d/4","e/4","f/4","g/4","a/4","b/4","c/5","d/5","e/5","f/5","g/5","a/5","b/5","c/6","d/6","e/6","f/6","g/6","a/6","b/6","c/7"];
		var altoSax = ["d/3","e/3","f/3","g/3","a/3","b/3","c/4","d/4","e/4","f/4","g/4","a/4","b/4","c/5","d/5","e/5"];
		var bassoon = ["b/1","c/2","d/2","e/2","f/2","g/2","a/2","b/2","c/3","d/3","e/3","f/3","g/3","a/3","b/3","c/4","d/4","e/4","f/4","g/4","a/4","b/4","c/5","d/5","e/5"];
		//brass definitions
		var trumpet = ["e/4","f/4","g/4","a/4","b/4","c/5","d/5","e/5","f/5","g/5","a/5","b/5"];
		var trombone = ["e/2","f/2","g/2","a/2","b/2","c/3","d/3","e/3","f/3","g/3","a/3","b/3","c/4","d/4","e/4","f/4","g/4","a/4","b/4","c/5"]
		var tuba = ["a/1","b/1","c/2","d/2","e/2","f/2","g/2","a/2","b/2","c/3","d/3","e/3","f/3","g/3","a/3","b/3","c/4","d/4","e/4","f/4","g/4","a/4","b/4","c/5","d/5","e/5"];
		//string definitions
		var bass = ["c/1","d/1","e/1","f/1","g/1","a/1","b/1","c/2","d/2","e/2","f/2","g/2","a/2","b/2","c/3","d/3","e/3","f/3","g/3","a/3","b/3","c/4"];
		var cello = ["c/2","d/2","e/2","f/2","g/2","a/2","b/2","c/3","d/3","e/3","f/3","g/3","a/3","b/3","c/4","d/4","e/4","f/4","g/4","a/4","b/4","c/5","d/5","e/5","f/5","g/5","a/5","b/5","c/6"];
		var viola = ["c/3","d/3","e/3","f/3","g/3","a/3","b/3","c/4","d/4","e/4","f/4","g/4","a/4","b/4","c/5","d/5","e/5","f/5","g/5","a/5","b/5","c/6","d/6","e/6"];
		var violin = ["g/3","a/3","b/3","c/4","d/4","e/4","f/4","g/4","a/4","b/4","c/5","d/5","e/5","f/5","g/5","a/5","b/5","c/6","d/6","e/6","f/6","g/6","a/6","b/6","c/7","d/7","e/7","f/7","g/7","a/7"];

		if (chosenInstrument == "oboe") {
			
			var randomNoteNumber = Math.floor(Math.random()*oboe.length);
			var note = oboe[randomNoteNumber];
			singleNoteNameArray = note.split("/");
			singleNoteName = singleNoteNameArray[0];
			return note;
		}
		
		else if (chosenInstrument == "clarinet") {
			var randomNoteNumber = Math.floor(Math.random()*clarinet.length);
			var note = clarinet[randomNoteNumber];
			singleNoteNameArray = note.split("/");
			singleNoteName = singleNoteNameArray[0];
			singleNoteName = singleNoteNameArray[0];
			return note;
		}
		
		else if (chosenInstrument == "flute") {
			var randomNoteNumber = Math.floor(Math.random()*flute.length);
			var note = flute[randomNoteNumber];
			singleNoteNameArray = note.split("/");
			singleNoteName = singleNoteNameArray[0];
			return note;
		}
		
		else if (chosenInstrument == "altoSax") {
			var randomNoteNumber = Math.floor(Math.random()*flute.length);
			var note = flute[randomNoteNumber];
			singleNoteNameArray = note.split("/");
			singleNoteName = singleNoteNameArray[0];
			return note;
		}
		
		else if (chosenInstrument == "bassoon") {
			var randomNoteNumber = Math.floor(Math.random()*bassoon.length);
			var note = bassoon[randomNoteNumber];
			singleNoteNameArray = note.split("/");
			singleNoteName = singleNoteNameArray[0];
			return note;
		}
		
		else if (chosenInstrument == "trumpet") {
			var randomNoteNumber = Math.floor(Math.random()*trumpet.length);
			var note = trumpet[randomNoteNumber];
			singleNoteNameArray = note.split("/");
			singleNoteName = singleNoteNameArray[0];
			return note;
		}
		
		else if (chosenInstrument == "trombone") {
			var randomNoteNumber = Math.floor(Math.random()*trombone.length);
			var note = trombone[randomNoteNumber];
			singleNoteNameArray = note.split("/");
			singleNoteName = singleNoteNameArray[0];
			return note;
		}
		
		else if (chosenInstrument == "tuba") {
			var randomNoteNumber = Math.floor(Math.random()*tuba.length);
			var note = tuba[randomNoteNumber];
			singleNoteNameArray = note.split("/");
			singleNoteName = singleNoteNameArray[0];
			return note;
		}
		
		else if (chosenInstrument == "bass") {
			var randomNoteNumber = Math.floor(Math.random()*bass.length);
			var note = bass[randomNoteNumber];
			singleNoteNameArray = note.split("/");
			singleNoteName = singleNoteNameArray[0];
			return note;
		}
		
		else if (chosenInstrument == "cello") {
			var randomNoteNumber = Math.floor(Math.random()*cello.length);
			var note = cello[randomNoteNumber];
			singleNoteNameArray = note.split("/");
			singleNoteName = singleNoteNameArray[0];
			return note;
		}
		
		else if (chosenInstrument == "viola") {
			var randomNoteNumber = Math.floor(Math.random()*viola.length);
			var note = viola[randomNoteNumber];
			singleNoteNameArray = note.split("/");
			singleNoteName = singleNoteNameArray[0];
			return note;
		}
		
		else if (chosenInstrument == "violin") {
			var randomNoteNumber = Math.floor(Math.random()*violin.length);
			var note = violin[randomNoteNumber];
			singleNoteNameArray = note.split("/");
			singleNoteName = singleNoteNameArray[0];
			return note;
		}
		//console.log(instrument[randomNoteNumber]);
	}
	
	
}

function resizeCanvas (width, height) {
	$("#range").width(width);
	$("#range").attr("width", width);
	$("#range").attr("height", height);
}
function printHighScores() {
	$("#endGame").hide();
	var html = "<h3>High Scores!</h3><ul><li>" + localStorage.HighScore + "</li><li>" + localStorage.HighScore1 + "</li><li>" + localStorage.HighScore2 + "</li><li>" + localStorage.HighScore3 + "</li><li>" + localStorage.HighScore4 + "</li>";
	$("#highScores").html(html);
}
function erase() {
	var canvas = $("#range")[0];
	var renderer = new Vex.Flow.Renderer(canvas,
	Vex.Flow.Renderer.Backends.CANVAS);
	var ctx = renderer.getContext();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function tick() {
	if (time == 0) {
	erase();
	paused = true;
	$("#endGame").show();
	$(".noteButtons, .clock, .play, .pause").hide();
		$("#feedback").attr("class", "").addClass("neutral").html("Times Up!");
		$("#endGame").append( ((correct * 100) - (wrong * 100)) + "<div><input id='initials' type='text' maxlength='3' /></div><div><input type='button' id='Submit' value='Submit' />");
		clearTimeout(t);
	}
	else {
		if (time <= 10) {
			$('.clock').css("color", "red");
		}
		time--;
		$(".clock").html(time);
	}
}

function draw() {
	var canvas = $("#range")[0];
	var renderer = new Vex.Flow.Renderer(canvas,
	Vex.Flow.Renderer.Backends.CANVAS);
	var ctx = renderer.getContext();
	var stave = new Vex.Flow.Stave(20, 18, 70);
	stave.addClef(clef).setContext(ctx).draw();

	// Create the notes
	var note = getRandomNote();
	console.log(note);
	var notes = [ new Vex.Flow.StaveNote({ clef: clef, keys: [note], duration: "w" })];

	//Create a voice in 4/4
	var voice = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4, resolution: Vex.Flow.RESOLUTION });
	//Add notes to voice
	voice.addTickables(notes);
	//Format and justify the notes to 500 pixels
	var formatter = new Vex.Flow.Formatter().
	joinVoices([voice]).format([voice], 500);
	//Render voice
	voice.draw(ctx, stave);
}

function titleSequence() {
	var title=["M", "a", "d", " ", "M", "i", "n" ,"u", "t", "e", " ", "M", "u", "s", "i", "c"];
	for (var i = 0; i < 16; i++) {
		$("h1#title").append("<span style='display: none;'>" + title[i] + "</span>");
	}
	showTitle();
}
	
function showTitle() {
	letterInterval = setInterval(function() {
			if (letter == 16) {
				$("#startButton").fadeIn("slow");
				$("#cleff").fadeIn("slow");
				clearInterval(letterInterval);
				}
			else {
				$("h1#title span").eq(letter).slideDown();
				letter++;
			}

		}, 50);
}

function countDown() {
	$("#endGame, .startScreen").hide();
	var countdownArray = ["On your mark!", "Get set!", "Name!"];
	countdownInterval = setInterval(function() {
		if (countdownCount < 3) {
			$(".countdown").html("<h1>" + countdownArray[countdownCount] + "</h1>");
			countdownCount++;
		}
	
		else if (countdownCount == 3) {
			$(".countdown").empty();
			clearInterval(countdownInterval);
			countdownCount = 0;
			startGame();
		}
	
	},1000);
}