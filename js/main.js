var MidiNotes = {
  A0: 1,
  B0: 3,
  C1: 4,
  D1: 6,
  E1: 8,
  F1: 9,
  G1: 11,
  A1: 13,
  B1: 15,
  C2: 16,
  D2: 18,
  E2: 20,
  F2: 21,
  G2: 23,
  A2: 25,
  B2: 27,
  C3: 28,
  D3: 30,
  E3: 32,
  F3: 33,
  G3: 35,
  A3: 37,
  B3: 39,
  C4: 40,
  D4: 42,
  E4: 44,
  F4: 45,
  G4: 47,
  A4: 49,
  B4: 51,
  C5: 52,
  D5: 54,
  E5: 56,
  F5: 57,
  G5: 59,
  A5: 61,
  B5: 63,
  C6: 64,
  D6: 66,
  E6: 68,
  F6: 69,
  G6: 71,
  A6: 73,
  B6: 75,
  C7: 76,
  D7: 78,
  E7: 80,
  F7: 81,
  G7: 83,
  A7: 85,
  B7: 87,
  C8: 88
};

var MadMinuteUtlities = {
  Range: function(rangeArray) {
    this.range = rangeArray;
  },
  createNewRange: function(start, end) {
	if (!MadMinuteUtlities.validateNote(start) || !MadMinuteUtlities.validateNote(end)) {
		debugger;
		console.log(start);
		console.log(end);
		throw "Invalid Range. Range is in wrong format.";
	  }
	  const range = [];
	  const notes = ["C", "D", "E", "F", "G", "A", "B"];
	  const startNote = start.split("")[0].toUpperCase();
	  const startNoteIndex = notes.indexOf(startNote);
	  const startOctave = +start.split("")[1];
	  const endNote = end.split("")[0].toUpperCase();
	  const endNoteIndex = notes.indexOf(endNote);
	  const endOctave = +end.split("")[1];
	  const octaveCount = endOctave - startOctave;
	  const indexCount = endNoteIndex - startNoteIndex;
	
	  // if the start note is higher than the end note
	  if (octaveCount === -1 || (octaveCount === 0 && indexCount <= 0)) {
		throw "Invalid Range: Start Note is higher or the same as End Note";
	  }
	
	  // if the start note and the end note are in the same octave
	  if (octaveCount === 0 && indexCount > 0) {
		return notes
		  .slice(startNoteIndex, endNoteIndex + 1)
		  .map(function(note) {
			return note + startOctave;
		  })
		  .sort(MadMinuteUtlities.sortRange);
	  }
	
	  if (octaveCount > 0) {
		// the end of the intial octave will be
		const initialOctave = notes
		  .slice(startNoteIndex, notes.length)
		  .map(function(note) {
			return note + startOctave;
		  });
	
		var middleNotes = [];
		for (var i = 1; i <= octaveCount; i += 1) {
		  // count from c[i] to n[i] where n is end note name
		  if (i === octaveCount) {
			const remainderNotes = notes
			  .slice(0, endNoteIndex + 1)
			  .map(function(note) {
				return note + (startOctave + i);
			  });
			return initialOctave
			  .concat(remainderNotes, middleNotes)
			  .sort(MadMinuteUtlities.sortRange);
		  }
		  var newIndex = +startOctave + i;
		  var tmp = notes.map(function(note) {
			return note + newIndex;
		  });
	
		  if (middleNotes.length === 0) {
			middleNotes = tmp;
		  } else {
			middleNotes = middleNotes.concat(tmp);
		  }
		}
	  }
  },
  validateNote: function(value) {
    // note will come in with a letter name and a number
    // We are assuming 'C0 through C8'
    // we don't care about 'C-1' it's an outlier and we aren't going to use it.
    const alphabet = ["C", "D", "E", "F", "G", "A", "B"];
    const note = value.split("")[0];
    const octave = value.split("")[1];

    if (value.length !== 2 || alphabet.indexOf(note) === -1 || !parseInt(octave, 10)) {
      return false;
    }

    return true;
  },
  sortRange: function (a, b) {
	if (MidiNotes[a] < MidiNotes[b]) {
	  return -1;
	}
	if (MidiNotes[a] > MidiNotes[b]) {
	  return 1;
	}
   
	return 0;
  },

  //clef: treble, bass, alto, tenor
  //startingNote: null || note in range null == beginning
  //selector: 1, 2
  populateClef: function(clef, startingNote, input) {
    var selector, range;
    switch (clef) {
      case "treble":
        //selector = (input === 1) ? MadMinute.$treble1 : MadMinute.$treble2;
        selector = input === "low" ? MadMinute.$treble1 : MadMinute.$treble2;
        range = MadMinuteUtlities.findModifiedRange(
          startingNote,
          MadMinute.trebleRange.range
        );
        break;
      case "bass":
        selector = input === "low" ? MadMinute.$bass1 : MadMinute.$bass2;
        range = MadMinuteUtlities.findModifiedRange(
          startingNote,
          MadMinute.bassRange.range
        );
        break;
      case "tenor":
        selector = input === "low" ? MadMinute.$tenor1 : MadMinute.$tenor2;
        range = MadMinuteUtlities.findModifiedRange(
          startingNote,
          MadMinute.tenorRange.range
        );
        break;
      case "alto":
        selector = input === "low" ? MadMinute.$alto1 : MadMinute.$alto2;
        range = MadMinuteUtlities.findModifiedRange(
          startingNote,
          MadMinute.altoRange.range
        );
        break;
    }
    selector.empty();
    $.each(range, function(index, value) {
      selector.append('<option value="' + value + '">' + value + "</option>");
    });
  },
  findActiveRanges: function() {
    var trActive, baActive, teActive, alActive, activeArrayStatus;
    trActive = MadMinute.$treble.hasClass("active") ? 1 : 0;
    baActive = MadMinute.$bass.hasClass("active") ? 1 : 0;
    teActive = MadMinute.$alto.hasClass("active") ? 1 : 0;
    alActive = MadMinute.$tenor.hasClass("active") ? 1 : 0;
    return (activeArrayStatus = [trActive, baActive, teActive, alActive]);
  },
  findPossibleShades: function(activeButtons) {
    var squareClasses = ["off"];
    $.each(activeButtons, function(index, value) {
      if (index == 0 && value == 1) {
        squareClasses.push("trebleShade");
      } else if (index == 1 && value == 1) {
        squareClasses.push("bassShade");
      } else if (index == 2 && value == 1) {
        squareClasses.push("altoShade");
      } else if (index == 3 && value == 1) {
        squareClasses.push("tenorShade");
      }
    });
    return squareClasses;
  },

  findModifiedRange: function(startingNote, range) {
    var newRange;
    if (startingNote == null) {
      return (newRange = range);
    } else {
      for (var i = 0; i < range.length; i++) {
        if (range[i] === startingNote) {
          newRange = range.slice(i, range.length);
          return newRange;
          break;
        }
      }
    }
  },
  getCount: function() {
    var length = $("#layout .layout-square").length;
    var unchecked = 0;
    for (var i = 0; i < length; i++) {
      if (
        $("#layout .layout-square")
          .eq(i)
          .hasClass("off")
      ) {
        unchecked++;
      }
    }
    return 60 - unchecked;
  },
  getNote: function(clef) {
    var rangeArray = [];
    var lowN, highN, indexOfLowN, indexOfHighN;
    switch (clef) {
      case "treble":
        lowN = MadMinute.$treble1.val();
        highN = MadMinute.$treble2.val();
        indexOfLowN = MadMinute.trebleRange.range.indexOf(lowN);
        indexOfHighN = MadMinute.trebleRange.range.indexOf(highN);
        rangeArray = MadMinute.trebleRange.range.slice(
          indexOfLowN,
          indexOfHighN
        );
        break;
      case "bass":
        lowN = MadMinute.$bass1.val();
        highN = MadMinute.$bass2.val();
        indexOfLowN = MadMinute.bassRange.range.indexOf(lowN);
        indexOfHighN = MadMinute.bassRange.range.indexOf(highN);
        rangeArray = MadMinute.bassRange.range.slice(indexOfLowN, indexOfHighN);
        break;
      case "alto":
        lowN = MadMinute.$alto1.val();
        highN = MadMinute.$alto2.val();
        indexOfLowN = MadMinute.altoRange.range.indexOf(lowN);
        indexOfHighN = MadMinute.altoRange.range.indexOf(highN);
        rangeArray = MadMinute.altoRange.range.slice(indexOfLowN, indexOfHighN);
        break;
      case "tenor":
        lowN = MadMinute.$tenor1.val();
        highN = MadMinute.$tenor2.val();
        indexOfLowN = MadMinute.tenorRange.range.indexOf(lowN);
        indexOfHighN = MadMinute.tenorRange.range.indexOf(highN);
        rangeArray = MadMinute.tenorRange.range.slice(
          indexOfLowN,
          indexOfHighN
        );
        break;
    }
    return rangeArray[Math.floor(Math.random() * rangeArray.length)];
  },
  getKeys: function() {
    var keys = [];
    for (var i = 0; i < 15; i++) {
      if (
        $(".key-signature")
          .eq(i)
          .hasClass("active")
      ) {
        keys.push(MadMinute.allKeys[i]);
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
    this.$clefSelect = $(".clefSelect");
    this.$sheetTitle = $(".sheet-title");
    //all the available keys
    this.allKeys = [
      "Cb",
      "Gb",
      "Db",
      "Ab",
      "Eb",
      "Bb",
      "F",
      "C",
      "G",
      "D",
      "A",
      "E",
      "B",
      "F#",
      "C#"
    ];
    //all key selections in booleans map to this.allKeys
    this.keySignatures = [];
    //keys by name to chose randomly from
    this.pickedKeys = [];
    this.trebleRange = new MadMinuteUtlities.Range(MadMinuteUtlities.createNewRange("E3", "B6"));
    this.bassRange = new MadMinuteUtlities.Range(MadMinuteUtlities.createNewRange("E1", "C5"));
    this.tenorRange = new MadMinuteUtlities.Range(MadMinuteUtlities.createNewRange("C3", "C6"));
    this.altoRange = new MadMinuteUtlities.Range(MadMinuteUtlities.createNewRange("C3", "C6"));
    this.bugCount = 0;
  },
  bindEvents: function() {
    this.$print.click(function() {
      window.print();
    });
    this.$del.click(function() {
      MadMinute.$notes.empty().hide();
      $("#controls").hide();
      $(".nav li").show();
      $("#form, .tab-content").show();
    });
    this.$clefSelect.click(function() {
      var correspondingSelector, clef, shade;
      switch (this.id) {
        case "treble-button":
          correspondingSelector = MadMinute.$trebleRange;
          clef = "treble";
          shade = "trebleShade";
          break;
        case "bass-button":
          correspondingSelector = MadMinute.$bassRange;
          clef = "bass";
          shade = "bassShade";
          break;
        case "alto-button":
          correspondingSelector = MadMinute.$altoRange;
          clef = "alto";
          shade = "altoShade";
          break;
        case "tenor-button":
          clef = "tenor";
          shade = "tenorShade";
          correspondingSelector = MadMinute.$tenorRange;
          break;
      }
      correspondingSelector.toggle();
      MadMinuteUtlities.populateClef(clef, null, "low");
      MadMinuteUtlities.populateClef(clef, null, "high");
      if ($(this).hasClass("active")) {
        $(".layout-square")
          .removeClass(shade)
          .addClass("off");
        MadMinute.updateCount();
      }
    });
    this.$treble1.change(function() {
      MadMinuteUtlities.populateClef("treble", $(this).val(), "high");
    });
    this.$bass1.change(function() {
      MadMinuteUtlities.populateClef("bass", $(this).val(), "high");
    });
    this.$tenor1.change(function() {
      MadMinuteUtlities.populateClef("tenor", $(this).val(), "high");
    });
    this.$alto1.change(function() {
      MadMinuteUtlities.populateClef("alto", $(this).val(), "high");
    });
    this.$layout.on("mouseover", this.$square, function(e) {
      //selection-single, selection-row
      if ($("#selection-single").hasClass("active")) {
        $(".layout-square").removeClass("animated pulse");
        var thisClasses = $(e.target)
          .attr("class")
          .split(" ");
        var thisClass = thisClasses[1];
        if (thisClass != "span7") {
          var row = $(e.target).data("row");
          var column = $(e.target).data("column");
          $(
            "[data-row = '" + row + "'][data-column = '" + column + "']"
          ).addClass("animated pulse");
        }
      } else {
        $(".layout-square").removeClass("animated pulse");
        var thisClasses = $(e.target)
          .attr("class")
          .split(" ");
        var thisClass = thisClasses[1];
        if (thisClass != "span7") {
          var row = $(e.target).data("row");
          var column = $(e.target).data("column");
          $("[data-row = '" + row + "']").addClass("animated pulse");
        }
      }
    });
    this.$layout.on("mouseleave", this.$square, function(e) {
      var thisClasses = $(e.target)
        .attr("class")
        .split(" ");
      var thisClass = thisClasses[1];
      $(".layout-square").removeClass("animated pulse");
    });
    this.$layout.on("click", this.$square, function(e) {
      $(".layout-square").removeClass("animated pulse");
      var thisClasses = $(e.target)
        .attr("class")
        .split(" ");
      var thisClass = thisClasses[1];
      var activeButtons = MadMinuteUtlities.findActiveRanges(e);
      var squareClasses = MadMinuteUtlities.findPossibleShades(activeButtons);

      var indexOfClass = squareClasses.indexOf(thisClass);
      if ($("#selection-single").hasClass("active")) {
        //returns the buttons that are pressed
        //creates an array of possible classes for each square
        if (thisClass != "span7") {
          if (squareClasses.length > 1) {
            if (indexOfClass + 1 == squareClasses.length) {
              $(e.target)
                .removeClass(thisClass)
                .addClass(squareClasses[0]);
            } else {
              $(e.target)
                .removeClass(thisClass)
                .addClass(squareClasses[indexOfClass + 1]);
            }
          } else {
            MadMinute.showError(
              "<p>You need to select a clef before you change your layout!</p>"
            );
          }
          MadMinute.updateCount();
        }
      }
      //if the selection is set to row
      else {
        var row = $(e.target).data("row");
        if (thisClass != "span7") {
          if (squareClasses.length > 1) {
            if (indexOfClass + 1 == squareClasses.length) {
              $("[data-row = '" + row + "']")
                .removeClass(thisClass)
                .addClass(squareClasses[0]);
            } else {
              $("[data-row = '" + row + "']")
                .removeClass(thisClass)
                .addClass(squareClasses[indexOfClass + 1]);
            }
          } else {
            MadMinute.showError(
              "<p>You need to select a clef before you change your layout!</p>"
            );
          }
          MadMinute.updateCount();
        }
      }
    });
    this.$create.on("click", function() {
      var count = MadMinuteUtlities.getCount();
      count === 0
        ? MadMinute.showError(
            "You need at least one note before you create a worksheet"
          )
        : MadMinute.renderQuiz();
    });
  },
  updateCount: function() {
    var count = MadMinuteUtlities.getCount();
    this.$count.html(count + "/60");
  },
  showError: function(str) {
    $("#error .modal-body").html(str);
    $("#error").modal("show");
  },
  render: function() {
    for (var i = 0; i < 10; i++) {
      this.$layout.append("<div id = 'row" + i + "' class='row span7'></div>");
      for (var x = 0; x < 6; x++) {
        $("#row" + i).append(
          "<div class='layout-square off' data-row='" +
            i +
            "' data-column='" +
            x +
            "'></div>"
        );
      }
    }
  },
  getRepoInformation: function() {
    $.ajax({
      url: "https://api.github.com/repos/smykes/Mad-Minute-Music/issues",
      dataType: "jsonp",
      success: function(data) {
        for (var i = 0; i < data.data.length; i++) {
          $("#issue-list").append(
            '<li><a href="' +
              data.data[i].html_url +
              '">' +
              data.data[i].title +
              "</a></li>"
          );
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
          $("#change-list").append(
            '<li><span class="label label-success">' +
              moment(data.data[i].commit.author.date).format("MM/DD/YYYY") +
              "</span> - " +
              data.data[i].commit.message +
              "</li>"
          );
        }
      },
      error: function(data) {
        alert("There was an error contacting the Github server.");
      }
    });
  },
  renderQuiz: function() {
    $("#notes").empty();
    $("#notes").show();
    $("#controls").show();
    $("#form, .tab-content").hide();
    $("ul.nav li").hide();

    var noteArray = [];
    var key;
    this.pickedKeys = MadMinuteUtlities.getKeys();
    //process keysignatures and only bring back ones that are active by name.
    //this.pickedKeys = MadMinuteUtlities.getPickedKeys();
    var NoteObject = function(note, clef, key) {
      this.note = note;
      this.clef = clef;
      this.key = key;
    };
    $("#notes").prepend(
      "<div>Date:_<span style='text-decoration: underline'>" +
        moment()
          .startOf("day")
          .format("MM/DD/YYYY") +
        "</span>_</div>"
    );
    $("#notes").prepend("<div>Name:_____________</div>");
    if ($("#sheet-title").val()) {
      $("#notes").prepend("<div>Title: " + $("#sheet-title").val() + "</div>");
    }

    //$("#form").hide();
    //$(".navbar").hide();
    var questionCount = 0;
    for (var i = 0; i < 60; i++) {
      var rawClass = $(".layout-square")
        .eq(i)
        .attr("class")
        .split(" ");
      var clefClass = rawClass[1];
      switch (clefClass) {
        case "trebleShade":
          clefClass = "treble";
          break;
        case "bassShade":
          clefClass = "bass";
          break;
        case "altoShade":
          clefClass = "alto";
          break;
        case "tenorShade":
          clefClass = "tenor";
          break;
        case "off":
          questionCount++;
          break;
      }
      var note = MadMinuteUtlities.getNote(clefClass);
      if (note === undefined) {
        note = null;
      } else {
        noted = note.split("");
        note = note[0] + "/" + note[1];
      }
      key = this.pickedKeys[
        Math.floor(Math.random() * MadMinute.pickedKeys.length)
      ];
      var noteInfo = new NoteObject(note, clefClass, key);
      noteArray.push(noteInfo);
    }
    var total = 60 - questionCount;
    $("#notes").append("<div>___ / " + total + "</div>");
    for (var i = 0; i < 60; i++) {
      if (
        i === 5 ||
        i === 11 ||
        i === 16 ||
        i === 21 ||
        i === 45 ||
        i === 54 ||
        i === 63 ||
        i === 72 ||
        i === 81 ||
        i === 90
      ) {
        $("#notes").append('<div class="clear"></div>');
      }
      $("#notes").append(
        '<div id="note' +
          i +
          '" class="qnote"><canvas style="width: 300px;"></canvas>'
      );
      if (noteArray[i].note !== null) {
        var canvas = $("#note" + i + " canvas")[0];
        var renderer = new Vex.Flow.Renderer(
          canvas,
          Vex.Flow.Renderer.Backends.CANVAS
        );
        var ctx = renderer.getContext();
        var stave = new Vex.Flow.Stave(10, 0, 140);
        stave
          .addClef(noteArray[i].clef)
          .addKeySignature(noteArray[i].key)
          .setContext(ctx)
          .draw();
        var notes = [
          new Vex.Flow.StaveNote({
            clef: noteArray[i].clef,
            keys: [noteArray[i].note],
            duration: "w"
          }).setStemDirection()
        ];
        var voice = new Vex.Flow.Voice({
          num_beats: 4,
          beat_value: 4,
          resolution: Vex.Flow.RESOLUTION
        });
        voice.addTickables(notes);
        var formatter = new Vex.Flow.Formatter()
          .joinVoices([voice])
          .format([voice], 560);
        voice.draw(ctx, stave);
      }
    }
  }
};
$(document).ready(function() {
  $(".nav a").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
  MadMinute.init();
});
