var MadMinuteUtlities = {
	Range: function(rangeArray) {
		this.range = rangeArray;
	},
	//clef: treble, bass, alto, tenor
	//startingNote: null || note in range null == beginning
	//selector: 1, 2
	populateClef: function(clef, startingNote, input) {
		var selector, range;
		switch(clef) {
			case 'treble':
				//selector = (input === 1) ? MadMinute.$treble1 : MadMinute.$treble2;
				selector = (input === 'low') ? MadMinute.$treble1 : MadMinute.$treble2;
				range = MadMinuteUtlities.findModifiedRange(startingNote, MadMinute.trebleRange.range);
				break;
			case 'bass':
				selector = (input === 'low') ? MadMinute.$bass1 : MadMinute.$bass2;
				range = MadMinuteUtlities.findModifiedRange(startingNote, MadMinute.bassRange.range);
				break;
			case 'tenor':
				selector = (input === 'low') ? MadMinute.$tenor1 : MadMinute.$tenor2;
				range = MadMinuteUtlities.findModifiedRange(startingNote, MadMinute.tenorRange.range);
				break;
			case 'alto':
				selector = (input === 'low') ? MadMinute.$alto1 : MadMinute.$alto2;
				range = MadMinuteUtlities.findModifiedRange(startingNote, MadMinute.altoRange.range);
				break;
		}
		selector.empty();
		$.each(range, function(index, value) {
			selector.append('<option value="'+ value + '">' + value + '</option>')
		});
	},
	findActiveRanges: function() {
		var trActive, baActive, teActive, alActive, activeArrayStatus;
		trActive = MadMinute.$treble.hasClass('active') ? 1 : 0;
		baActive = MadMinute.$bass.hasClass('active') ? 1 : 0;
		teActive = MadMinute.$alto.hasClass('active') ? 1 : 0;
		alActive = MadMinute.$tenor.hasClass('active') ? 1 : 0;
		return activeArrayStatus = [trActive, baActive, teActive, alActive];
	},
	findModifiedRange: function(startingNote, range) {
		var newRange;
		if (startingNote == null) {
			return newRange = range;
		}
		else {
			for (var i = 0; i < range.length; i++ ) {
				if (range[i] === startingNote) {
					newRange =  range.slice(i, range.length);
					return newRange;
					break;
				}
			}
		}
	}, 
	getCount: function() {
		var length = $("#layout .layout-square").size();
		var unchecked = 0;
		for (var i = 0; i < length; i++) {
			if ($("#layout .layout-square").eq(i).hasClass('off')) {
				unchecked++
			}
		}
		return 60 - unchecked;
	},
	getNote: function(clef) {
		var rangeArray = [];
		var lowN, highN, indexOfLowN, indexOfHighN;
		switch(clef) {
			case 'treble': 
				lowN = MadMinute.$treble1.val();
				highN = MadMinute.$treble2.val();
				indexOfLowN = MadMinute.trebleRange.range.indexOf(lowN);
				indexOfHighN = MadMinute.trebleRange.range.indexOf(highN);
				rangeArray = MadMinute.trebleRange.range.slice(indexOfLowN, indexOfHighN);
			break;
			case 'bass':
				lowN = MadMinute.$bass1.val();
				highN = MadMinute.$bass2.val();
				indexOfLowN = MadMinute.bassRange.range.indexOf(lowN);
				indexOfHighN = MadMinute.bassRange.range.indexOf(highN);
				rangeArray = MadMinute.bassRange.range.slice(indexOfLowN, indexOfHighN);
			break;
			case 'alto' :
				lowN = MadMinute.$alto1.val();
				highN = MadMinute.$alto2.val();
				indexOfLowN = MadMinute.altoRange.range.indexOf(lowN);
				indexOfHighN = MadMinute.altoRange.range.indexOf(highN);
				rangeArray = MadMinute.altoRange.range.slice(indexOfLowN, indexOfHighN);
			break;
			case 'tenor' :
				lowN = MadMinute.$tenor1.val();
				highN = MadMinute.$tenor2.val();
				indexOfLowN = MadMinute.tenorRange.range.indexOf(lowN);
				indexOfHighN = MadMinute.tenorRange.range.indexOf(highN);
				rangeArray = MadMinute.tenorRange.range.slice(indexOfLowN, indexOfHighN);
			break;
		}
		return rangeArray[Math.floor(Math.random()*rangeArray.length)];
	},
	getKeys: function() {
		var keys = [];
		for (var i = 0; i < 15; i++) {
			if ($(".key-signature").eq(i).hasClass("active")) {
				keys.push(MadMinute.allKeys[i])
			}
		} 
		return keys;
	}
};
var MadMinute = {
	init: function() {
		this.cacheElements();
		this.bindEvents();
		this.getRepoInformation();
		this.render();
	},
	cacheElements: function() {
		this.$create = $("#create");
		this.$treble = $("#treble-button");
		this.$bass = $("#bass-button");
		this.$tenor = $("#tenor-button");
		this.$alto = $("#alto-button");
		this.$trebleRange = $("#treble");
		this.$treble1 = $("#treble-low");
		this.$treble2 = $("#treble-high");
		this.$bass1 = $("#bass-low");
		this.$bass2 = $("#bass-high");
		this.$alto1 = $("#alto-low");
		this.$alto2 = $("#alto-high");
		this.$tenor1 = $("#tenor-low");
		this.$tenor2 = $("#tenor-high");
		this.$bassRange = $("#bass");
		this.$tenorRange = $("#tenor");
		this.$altoRange = $("#alto");
		this.$notes = $("#notes");
		this.$layout = $("#layout");
		this.$toggle = $("#toggle-all");
		this.$square = $(".layout-square");
		this.$count = $("#quiz-count");
		this.$print = $("#print-worksheet");
		this.$del = $("#delete-worksheet");
		this.$bugs = $("#bugs");
		//all the available keys
		this.allKeys = ['Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#']
		//all key selections in booleans map to this.allKeys
		this.keySignatures = [];
		//keys by name to chose randomly from
		this.pickedKeys = [];
		this.trebleRange = new MadMinuteUtlities.Range(['E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6','D6','E6']);
		this.bassRange = new MadMinuteUtlities.Range(['E1','F1','G1','A1','B1','C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5']);
		this.tenorRange = new MadMinuteUtlities.Range(['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4','F4','G4','A4','B3','C4','D4','E4','F4','G4','A4','B4','C5']);
		this.altoRange = new MadMinuteUtlities.Range(['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6']);
		this.bugCount = 0;
	},
	bindEvents: function() {
		this.$print.click(function() {
			window.print();
		});
		this.$del.click(function() {
			MadMinute.$notes.empty().hide();
			$('#controls').hide();
			$('.nav li').show();
			$("#form, .tab-content").show();
		});
		this.$treble.click(function() {
			MadMinute.$trebleRange.toggle();
			MadMinuteUtlities.populateClef('treble', null, 'low');
			MadMinuteUtlities.populateClef('treble', null, 'high');
			if (MadMinute.$treble.hasClass('active')) {
				$(".layout-square").removeClass('trebleShade').addClass('off');
				MadMinute.updateCount();
			}
		});
		this.$bass.click(function() {
			MadMinute.$bassRange.toggle();
			MadMinuteUtlities.populateClef('bass', null, 'low');
			MadMinuteUtlities.populateClef('bass', null, 'high');
			if (MadMinute.$bass.hasClass('active')) {
				$(".layout-square").removeClass('bassShade').addClass('off');
				MadMinute.updateCount();
			}
		});
		this.$alto.click(function() {
			MadMinute.$altoRange.toggle();
			MadMinuteUtlities.populateClef('alto', null, 'low');
			MadMinuteUtlities.populateClef('alto', null, 'high');
			if (MadMinute.$alto.hasClass('active')) {
				$(".layout-square").removeClass('altoShade').addClass('off');
				MadMinute.updateCount();
			}
		});
		this.$tenor.click(function() {
			MadMinute.$tenorRange.toggle();
			MadMinuteUtlities.populateClef('tenor', null, 'low');
			MadMinuteUtlities.populateClef('tenor', null, 'high');
			if (MadMinute.$tenor.hasClass('active')) {
				$(".layout-square").removeClass('tenorShade').addClass('off');
				MadMinute.updateCount();
			}
		});
		this.$treble1.change(function() {
			MadMinuteUtlities.populateClef('treble', $(this).val(), 'high');
		});
		this.$bass1.change(function() {
			MadMinuteUtlities.populateClef('bass', $(this).val(), 'high');
		});
		this.$tenor1.change(function() {
			MadMinuteUtlities.populateClef('tenor', $(this).val(), 'high');
		});
		this.$alto1.change(function() {
			MadMinuteUtlities.populateClef('alto', $(this).val(), 'high');
		});
		this.$layout.on('click', this.$square, function(e) {
			var thisClasses = $(e.target).attr('class').split(" ");
			var thisClass = thisClasses[1];
			//returns the buttons that are pressed
			var activeButtons = MadMinuteUtlities.findActiveRanges(e);
			//creates an array of possible classes for each square
			var squareClasses = ['off'];
			$.each(activeButtons, function(index, value) {
				if ((index == 0) && (value == 1)) {
					squareClasses.push('trebleShade');
				}
				else if ((index == 1) && (value == 1)) {
					squareClasses.push('bassShade');
				}
				else if ((index == 2) && (value == 1)) {
					squareClasses.push('altoShade');
				}
				else if ((index == 3) && (value == 1)) {
					squareClasses.push('tenorShade');
				}
			});
			var indexOfClass = squareClasses.indexOf(thisClass);
			if (thisClass != 'span7') {		
				if (squareClasses.length > 1) {
					if (indexOfClass + 1 == squareClasses.length) {
						$(e.target).removeClass(thisClass).addClass(squareClasses[0]);
					}

					else {
						$(e.target).removeClass(thisClass).addClass(squareClasses[indexOfClass + 1]);
					}
				}
				else{
					MadMinute.showError('<p>You need to select a clef before you change your layout!</p>')
				}
				MadMinute.updateCount();
			}
		});
		this.$create.on('click', function() {
			var count = MadMinuteUtlities.getCount();
			(count === 0) ? MadMinute.showError('You need at least one note before you create a worksheet') : MadMinute.renderQuiz();
		});

	},
	updateCount: function() {
		var count = MadMinuteUtlities.getCount();
		this.$count.html(count + "/60");
	},
	showError: function(str) {
		$('#error .modal-body').html(str);
		$('#error').modal('show')
	},
	render: function() {
		for (var i = 0; i < 10; i++) {
			this.$layout.append("<div id = 'row" + i + "' class='row span7'></div>");
			for (var x = 0; x < 6; x++) {
				$("#row" + i).append("<div class='layout-square off' data-row='"+ i +"' data-column='" + x + "'></div>");
			}
		}
	},
	getRepoInformation: function() {
		$.ajax({
		  url: "https://api.github.com/repos/smykes/Mad-Minute-Music/issues",
		  dataType: "jsonp",
		  success: function(data) {
		  	for (var i = 0; i < data.data.length; i++ ) {
		  		$("#issue-list").append('<li><a href="' +data.data[i].html_url +'">' + data.data[i].title + '</a></li>');
		  	}
		  	MadMinute.bugCount = data.data.length;
		  		$("#bugs").html(MadMinute.bugCount);
		  }, 
		  error: function(data) {
		  	alert("There was an error contacting the Github server.");
		  }
		});
		$.ajax({
		  url: "https://api.github.com/repos/smykes/Mad-Minute-Music/commits",
		  dataType: "jsonp",
		  success: function(data) {
		  	for (var i = 0; i < data.data.length; i++) {
		  		$("#change-list").append('<li><span class="label label-success">' + moment(data.data[i].commit.author.date).format("MM/DD/YYYY") + '</span> - ' + data.data[i].commit.message + '</li>')
		  	}
		  }, 
		  error: function(data) {
		  	alert("There was an error contacting the Github server.");
		  }
		});
	},
	renderQuiz: function() {
		$('#notes').empty();
		$('#notes').show();
		$('#controls').show();
		$("#form, .tab-content").hide();
		$("ul.nav li").hide();

		var noteArray = [];
		var key;
		this.pickedKeys = MadMinuteUtlities.getKeys();
		//process keysignatures and only bring back ones that are active by name.
		//this.pickedKeys = MadMinuteUtlities.getPickedKeys();
		var NoteObject = function(note,clef,key) {
			this.note = note;
			this.clef = clef;
			this.key = key;
		};
		$("#notes").prepend("<div>Date:_<span style='text-decoration: underline'>" + moment().startOf('day').format("MM/DD/YYYY") + "</span>_</div>")
		$("#notes").prepend("<div>Name:_____________</div>");

		//$("#form").hide();
		//$(".navbar").hide();
		var questionCount = 0;
		for (var i = 0; i < 60; i++) {
			var rawClass = $(".layout-square").eq(i).attr('class').split(" ");
			var clefClass = rawClass[1];
			switch(clefClass) {
				case 'trebleShade':
					clefClass = 'treble';
					break;
				case 'bassShade':
					clefClass =  'bass';
					break;
				case 'altoShade':
					clefClass =  'alto';
					break;
				case 'tenorShade':
					clefClass =  'tenor';
					break;
				case 'off': 
					questionCount++
					break;
			}
			var note = MadMinuteUtlities.getNote(clefClass);
			if (note === undefined) {
				note = null;
			}
			else {
				noted = note.split('');
				note = note[0] + '/' + note[1];
			}
			key = this.pickedKeys[Math.floor((Math.random()*MadMinute.pickedKeys.length))];
			var noteInfo = new NoteObject(note, clefClass, key);
			noteArray.push(noteInfo);
		}
		var total = 60 - questionCount;
		$("#notes").append("<div>___ / " + total + "</div>");
		for (var i = 0; i < 60; i++) {
			if(i === 5 || i === 11 || i === 16 || i === 21 || i === 45 || i === 54 || i ===63 || i === 72 || i === 81 || i === 90 ) {
				$("#notes").append('<div class="clear"></div>');
			}
			$("#notes").append('<div id="note' + i + '" class="qnote"><canvas style="width: 300px;"></canvas>');
			if (noteArray[i].note !== null) {
			  	var canvas = $("#note" + i + " canvas")[0];
				var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
				var ctx = renderer.getContext();
				var stave = new Vex.Flow.Stave(10, 0, 140);
				stave.addClef(noteArray[i].clef).addKeySignature(noteArray[i].key).setContext(ctx).draw();
				var notes = [
		    		new Vex.Flow.StaveNote({ clef: noteArray[i].clef, keys: [noteArray[i].note], duration: "w" }).setStemDirection()
		  		];
				var voice = new Vex.Flow.Voice({
			    	num_beats: 4,
			    	beat_value: 4,
			    	resolution: Vex.Flow.RESOLUTION
			  	});
			  	voice.addTickables(notes);
			  	var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 300);
				voice.draw(ctx, stave);
			}
		}
	}
}
$(document).ready(function() {
	$('.nav a').click(function (e) {
  		e.preventDefault();
  		$(this).tab('show');
	});
	MadMinute.init();
});
