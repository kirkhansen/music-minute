module("MadMinuteUtilities.findActiveRanges()", {
    setup: function () {
        $("#qunit-fixture").append('<div class="btn-group controls-row" data-toggle="buttons-box">' +
                                    '<button id="treble-button" type="button" class="btn btn-primary">Treble</button>' +
                                    '<button id="bass-button" type="button" class="btn btn-success">Bass</button>' + 
                                    '<button id="alto-button" type="button" class="btn btn-warning">Alto</button>' +
                                    '<button id="tenor-button" type="button" class="btn btn-danger">Tenor</button>' +
                                    '</div>');
    }, 
    teardown: function () {
    	$("#qunit-fixture").empty();
    }
});

function selectors() {
	MadMinute.$treble = $("#treble-button");
	MadMinute.$bass = $("#bass-button");
	MadMinute.$tenor = $("#tenor-button");
	MadMinute.$alto = $("#alto-button");
}

function resetSelectors() {
	MadMinute.$treble.removeClass('active');
	MadMinute.$bass.removeClass('active');
	MadMinute.$tenor.removeClass('active');
	MadMinute.$alto.removeClass('active');
}

function activate(selectorArray) {
	for (var i = 0; i < selectorArray.length; i++) {
		$("#" + selectorArray[i] + "-button").addClass('active');
	}
}

test("Active clefs - No clefs.",function() {
	selectors();
	resetSelectors();
  	propEqual(MadMinuteUtlities.findActiveRanges(), [0,0,0,0], "No cleff button is active, returned array is [0,0,0,0]");
});

test("Active clefs - Treble clefs.",function() {
	selectors();
	resetSelectors();
	activate(['treble'])
  	propEqual(MadMinuteUtlities.findActiveRanges(), [1,0,0,0], "Treble cleff button is active, returned array is [1,0,0,0]");
});

test("Active clefs - Bass clefs.",function() {
	selectors();
	resetSelectors();
	activate(['bass'])
  	propEqual(MadMinuteUtlities.findActiveRanges(), [0,1,0,0], "Bass cleff button is active, returned array is [0,1,0,0]");
});

test("Active clefs - Alto clefs.",function() {
	selectors();
	resetSelectors();
	activate(['alto'])
  	propEqual(MadMinuteUtlities.findActiveRanges(), [0,0,1,0], "Alto cleff button is active, returned array is [0,0,1,0]");
});

test("Active clefs - Tenor clefs.",function() {
	selectors();
	resetSelectors();
	activate(['tenor'])
  	propEqual(MadMinuteUtlities.findActiveRanges(), [0,0,0,1], "Tenor cleff button is active, returned array is [0,0,0,1]");
});

//Break first set of combos

test("Active clefs - Treble/Bass clefs.",function() {
	selectors();
	resetSelectors();
	activate(['treble', 'bass'])
  	propEqual(MadMinuteUtlities.findActiveRanges(), [1,1,0,0], "Treble and Bass cleff buttons are active, returned array is [1,1,0,0]");
});

test("Active clefs - Bass/Alto clefs.",function() {
	selectors();
	resetSelectors();
	activate(['bass', 'alto'])
  	propEqual(MadMinuteUtlities.findActiveRanges(), [0,1,1,0], "Bass and Alto cleff buttons are active, returned array is [0,1,1,0]");
});

test("Active clefs - Alto/Tenor clefs.",function() {
	selectors();
	resetSelectors();
	activate(['alto', 'tenor'])
  	propEqual(MadMinuteUtlities.findActiveRanges(), [0,0,1,1], "Alto and Tenor cleff buttons are active, returned array is [0,0,1,1]");
});

test("Active clefs - Treble/Tenor clefs",function() {
	selectors();
	resetSelectors();
	activate(['treble', 'tenor'])
  	propEqual(MadMinuteUtlities.findActiveRanges(), [1,0,0,1], "Treble and Tenor cleff buttons are active, returned array is [1,0,0,1]");
});

test("Active clefs - Treble/Alto clefs",function() {
	selectors();
	resetSelectors();
	activate(['treble', 'alto'])
  	propEqual(MadMinuteUtlities.findActiveRanges(), [1,0,1,0], "Treble and Alto cleff buttons are active, returned array is [1,0,1,0]");
});

test("Active clefs - Bass/Tenor clefs",function() {
	selectors();
	resetSelectors();
	activate(['bass', 'tenor'])
  	propEqual(MadMinuteUtlities.findActiveRanges(), [0,1,0,1], "Bass and Tenor cleff buttons are active, returned array is [0,1,0,1]");
});

//Break second set of combos

test("Active clefs - Treble/Bass/Alto  clefs.",function() {
	selectors();
	resetSelectors();
	activate(['treble', 'bass', 'alto'])
  	propEqual(MadMinuteUtlities.findActiveRanges(), [1,1,1,0], "Treble and Bass and Alto cleff buttons are active, returned array is [1,1,1,0]");
});

test("Active clefs - Bass/Alto/Tenor.",function() {
	selectors();
	resetSelectors();
	activate(['bass', 'alto','tenor'])
  	propEqual(MadMinuteUtlities.findActiveRanges(), [0,1,1,1], "Bass and Alto and Tenor cleff buttons are active, returned array is [0,1,1,1]");
});

test("Active clefs - Treble/Alto/Tenor clefs.",function() {
	selectors();
	resetSelectors();
	activate(['treble', 'alto', 'tenor'])
  	propEqual(MadMinuteUtlities.findActiveRanges(), [1,0,1,1], "Treble and Alto and Tenor cleff buttons are active, returned array is [1,0,1,1]");
});

test("Active clefs - Treble/Bass/Tenor clefs.",function() {
	selectors();
	resetSelectors();
	activate(['treble', 'bass', 'tenor'])
  	propEqual(MadMinuteUtlities.findActiveRanges(), [1,1,0,1], "Treble and Bass and Tenor cleff buttons are active, returned array is [1,1,0,1]");
});

test("Active clefs - All clefs.",function() {
	selectors();
	resetSelectors();
	activate(['treble','bass','alto', 'tenor'])
  	propEqual(MadMinuteUtlities.findActiveRanges(), [1,1,1,1], "Treble and Bass and Alto and Tenor cleff buttons are active, returned array is [1,1,1,1]");
});


module("MadMinuteUtilities.getKeys()", {
    setup: function () {
        $("#qunit-fixture").append('<div class="row span7">' + 
                                	'<div style="float: left;">Flats</div>' +
                                '<div style="float: right; padding-right: 48px;">Sharps</div>' +
                                '<div class="btn-toolbar">' +
                                    '<div class="btn-group controls-row" data-toggle="buttons-checkbox">'+
                                        '<button id="flat-7" type="button" class="btn btn key-signature" title="Cb Major / Ab minor">7</button>'+
                                        '<button id="flat-6" type="button" class="btn btn key-signature" title="Gb Major / Eb minor">6</button>'+
                                        '<button id="flat-5" type="button" class="btn btn key-signature" title="Db Major / Bb minor">5</button>'+
                                        '<button id="flat-4" type="button" class="btn btn key-signature" title="Ab Major / F minor">4</button>'+
                                        '<button id="flat-3" type="button" class="btn btn key-signature" title="Eb Major / F minor">3</button>'+
                                        '<button id="flat-2" type="button" class="btn btn key-signature" title="Bb Major / G minor">2</button>'+
                                        '<button id="flat-1" type="button" class="btn btn key-signature" title="F Major / D minor">1</button>'+
                                        '<button id="none" type="button" class="active btn btn-primary key-signature" title="C Major / A minor">0</button>'+
                                        '<button id="sharp-1" type="button" class="btn btn-inverse key-signature" title="G Major / E minor">1</button>'+
                                        '<button id="sharp-2" type="button" class="btn btn-inverse key-signature" title="D Major / B minor">2</button>'+
                                        '<button id="sharp-3" type="button" class="btn btn-inverse key-signature" title="A Major / F# minor">3</button>'+
                                        '<button id="sharp-4" type="button" class="btn btn-inverse key-signature" title="E Major / C# minor">4</button>'+
                                        '<button id="sharp-5" type="button" class="btn btn-inverse key-signature" title="B Major / G# minor">5</button>'+
                                        '<button id="sharp-6" type="button" class="btn btn-inverse key-signature" title="F# Major / D# minor">6</button>'+
                                        '<button id="sharp-7" type="button" class="btn btn-inverse key-signature" title="C# Major / A# minor">7</button>'+
                                    '</div>'+
                                '</div>');
    }, 
    teardown: function () {
    	$("#qunit-fixture").empty();
    }
});



function resetKeys() {
	$("#none, #sharp-1, #sharp-2, #sharp-3, #sharp-4, #sharp-5, #sharp-6, #sharp-7, #flat-1, #flat-2, #flat-3, #flat-4, #flat-5, #flat-6, #flat-7").removeClass("active");
}

function activateKeys(selectorArray) {
	for (var i = 0; i < 15; i++) {
		if (selectorArray[i] === 1) {
			$(".key-signature").eq(i).addClass("active")
		}
	}
}

test("Active keys - No keys.",function() {
	resetKeys();
  	propEqual(MadMinuteUtlities.getKeys(), [], "No keys selected");
});

test("Active keys - Cb.",function() {
	resetKeys();
	activateKeys([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  	propEqual(MadMinuteUtlities.getKeys(), ["Cb"], "Returned array is Cb");
});

test("Active keys - Gb.",function() {
	resetKeys();
	activateKeys([0,1,0,0,0,0,0,0,0,0,0,0,0,0,0])
  	propEqual(MadMinuteUtlities.getKeys(), ["Gb"], "Returned array is Gb");
});

test("Active keys - Db.",function() {
	resetKeys();
	activateKeys([0,0,1,0,0,0,0,0,0,0,0,0,0,0,0])
  	propEqual(MadMinuteUtlities.getKeys(), ["Db"], "Returned array is Db");
});

test("Active keys - Ab.",function() {
	resetKeys();
	activateKeys([0,0,0,1,0,0,0,0,0,0,0,0,0,0,0])
  	propEqual(MadMinuteUtlities.getKeys(), ["Ab"], "Returned array is Ab");
});

test("Active keys - Eb.",function() {
	resetKeys();
	activateKeys([0,0,0,0,1,0,0,0,0,0,0,0,0,0,0])
  	propEqual(MadMinuteUtlities.getKeys(), ["Eb"], "Returned array is Eb");
});

test("Active keys - Bb.",function() {
	resetKeys();
	activateKeys([0,0,0,0,0,1,0,0,0,0,0,0,0,0,0])
  	propEqual(MadMinuteUtlities.getKeys(), ["Bb"], "Returned array is Bb");
});

test("Active keys - F.",function() {
	resetKeys();
	activateKeys([0,0,0,0,0,0,1,0,0,0,0,0,0,0,0])
  	propEqual(MadMinuteUtlities.getKeys(), ["F"], "Returned array is F");
});

test("Active keys - C.",function() {
	resetKeys();
	activateKeys([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0])
  	propEqual(MadMinuteUtlities.getKeys(), ["C"], "Returned array is C");
});

test("Active keys - G.",function() {
	resetKeys();
	activateKeys([0,0,0,0,0,0,0,0,1,0,0,0,0,0,0])
  	propEqual(MadMinuteUtlities.getKeys(), ["G"], "Returned array is G");
});

test("Active keys - D.",function() {
	resetKeys();
	activateKeys([0,0,0,0,0,0,0,0,0,1,0,0,0,0,0])
  	propEqual(MadMinuteUtlities.getKeys(), ["D"], "Returned array is D");
});

test("Active keys - A.",function() {
	resetKeys();
	activateKeys([0,0,0,0,0,0,0,0,0,0,1,0,0,0,0])
  	propEqual(MadMinuteUtlities.getKeys(), ["A"], "Returned array is A");
});

test("Active keys - E.",function() {
	resetKeys();
	activateKeys([0,0,0,0,0,0,0,0,0,0,0,1,0,0,0])
  	propEqual(MadMinuteUtlities.getKeys(), ["E"], "Returned array is E");
});

test("Active keys - B.",function() {
	resetKeys();
	activateKeys([0,0,0,0,0,0,0,0,0,0,0,0,1,0,0])
  	propEqual(MadMinuteUtlities.getKeys(), ["B"], "Returned array is B");
});

test("Active keys - F#.",function() {
	resetKeys();
	activateKeys([0,0,0,0,0,0,0,0,0,0,0,0,0,1,0])
  	propEqual(MadMinuteUtlities.getKeys(), ["F#"], "Returned array is F#");
});

test("Active keys - C#.",function() {
	resetKeys();
	activateKeys([0,0,0,0,0,0,0,0,0,0,0,0,0,0,1])
  	propEqual(MadMinuteUtlities.getKeys(), ["C#"], "Returned array is C#");
});

test("Active keys - All keys.",function() {
	resetKeys();
	activateKeys([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])
  	propEqual(MadMinuteUtlities.getKeys(), ['Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'], "Returned array is ['Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#']");
});


module("Clef selector click:", {
    setup: function () {
        $("#qunit-fixture").append('<div class="span4">' +
                            '<h2 class="span4">Notes</h2>' +
                            '<h4 class="span4">Choose a clef</h4>' +
                            '<div class="row span4">' +
                                '<div class="btn-group controls-row" data-toggle="buttons-checkbox">' +
                                    '<button id="treble-button" type="button" class="btn btn-primary">Treble</button>' +
                                    '<button id="bass-button" type="button" class="btn btn-success">Bass</button>' +
                                    '<button id="alto-button" type="button" class="btn btn-warning">Alto</button>' +
                                    '<button id="tenor-button" type="button" class="btn btn-danger">Tenor</button>' +
                                '</div>' +
                            '</div>' +
                            '<div class="row span4">&nbsp;</div>' +
                            '<div class="row span4 hide" id="treble">' +
                                '<label>Treble Range</label>' +
                                '<select id="treble-low" class="span2">' +
                                    '<option>Lower</option>' +
                                '</select>' +
                                    '-' +
                                '<select id="treble-high" class="span2">' +
                                    '<option>Upper</option>' +
                                '</select>' +
                            '</div>' +
                            '<div id="bass" class="row span4 hide">' +
                                '<label>Bass Range</label>' +
                                '<select id="bass-low" class="span2">' +
                                    '<option>Lower</option>' +
                                '</select>' +
                                    '-' +
                                '<select id="bass-high" class="span2">' +
                                    '<option>Upper</option>' +
                                '</select>' +
                            '</div>' +
                            '<div id="tenor" class="row span4 hide">' +
                                '<label>Tenor Range</label>' +
                                '<select id="tenor-low" class="span2">' +
                                    '<option>Lower</option>' +
                                '</select>' +
                                    '-' +
                                '<select id="tenor-high" class="span2">' +
                                    '<option>Upper</option>' +
                                '</select>' +
                            '</div>' +
                            '<div id="alto" class="row span4 hide">' +
                                '<label>Alto Range</label>' +
                                '<select id="alto-low" class="span2">' +
                                    '<option>Lower</option>' +
                                '</select>' +
                                    '-' +
                                '<select id="alto-high" class="span2">' +
                                    '<option>Upper</option>' +
                                '</select>' +
                            '</div>' +
                        '</div>');
    }, 
    teardown: function () {
    	$("#qunit-fixture").empty();
    }
});

test("All divs containing clef selections are hidden.",function() {
	equal($("#treble").css("display"), "none", "#treble hidden.")
	equal($("#bass").css("display"), "none", "#bass hidden")
	equal($("#alto").css("display"), "none", "#alto hidden")
	equal($("#tenor").css("display"), "none", "#tenor hidden")
});
test("Div containing treble clef selections is visible.",function() {
	$("#treble-button").click(function() {
		$("#treble").toggle();
	});
	$("#treble-button").click();
	equal($("#treble").is(":visible"), true, "#treble visible")
	equal($("#bass").is(":visible"), false, "#bass hidden")
	equal($("#alto").is(":visible"), false, "#alto hidden")
	equal($("#tenor").is(":visible"), false, "#tenor hidden")
});
test("Div containing bass clef selections is visible.",function() {
	$("#bass-button").click(function() {
		$("#bass").toggle();
	});
	$("#bass-button").click();
	equal($("#treble").is(":visible"), false, "#treble hidden")
	equal($("#bass").is(":visible"), true, "#bass visible")
	equal($("#alto").is(":visible"), false, "#alto hidden")
	equal($("#tenor").is(":visible"), false, "#tenor hidden")
});
test("Div containing alto clef selections is visible.",function() {
	$("#alto-button").click(function() {
		$("#alto").toggle();
	});
	$("#alto-button").click();
	equal($("#treble").is(":visible"), false, "#treble hidden")
	equal($("#bass").is(":visible"), false, "#bass hidden")
	equal($("#alto").is(":visible"), true, "#alto visible")
	equal($("#tenor").is(":visible"), false, "#tenor hidden")
});
test("Div containing tenor clef selections is visible.",function() {
	$("#tenor-button").click(function() {
		$("#tenor").toggle();
	});
	$("#tenor-button").click();
	equal($("#treble").is(":visible"), false, "#treble hidden")
	equal($("#bass").is(":visible"), false, "#bass hidden")
	equal($("#alto").is(":visible"), false, "#alto hidden")
	equal($("#tenor").is(":visible"), true, "#tenor visible")
});
test("Divs containing all clef selections are visible.",function() {
	$("#treble-button").click(function() {
		$("#treble").toggle();
	});
	$("#bass-button").click(function() {
		$("#bass").toggle();
	});
	$("#alto-button").click(function() {
		$("#alto").toggle();
	});
	$("#tenor-button").click(function() {
		$("#tenor").toggle();
	});
	$("#treble-button, #bass-button, #alto-button, #tenor-button").click();
	equal($("#treble").is(":visible"), true, "#treble visible")
	equal($("#bass").is(":visible"), true, "#bass visible")
	equal($("#alto").is(":visible"), true, "#alto visible")
	equal($("#tenor").is(":visible"), true, "#tenor visible")
});

module("Check returned ranges: MadMinuteUtlities.findModifiedRange()", {});
test("Treble range returns", function() {
  propEqual(MadMinuteUtlities.findModifiedRange(null, MadMinute.trebleRange.range), ['E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6','D6','E6'], "Null - Correct range returned: E3 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('E3', MadMinute.trebleRange.range), ['E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6','D6','E6'], "E3 - Correct range returned: E3 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('F3', MadMinute.trebleRange.range), ['F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6','D6','E6'], "F3 - Correct range returned: F3 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('G3', MadMinute.trebleRange.range), ['G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6','D6','E6'], "G3 - Correct range returned: G3 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('A3', MadMinute.trebleRange.range), ['A3','B3','C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6','D6','E6'], "A3 - Correct range returned: A3 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('B3', MadMinute.trebleRange.range), ['B3','C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6','D6','E6'], "B3 - Correct range returned: B3 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('C4', MadMinute.trebleRange.range), ['C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6','D6','E6'], "C4 - Correct range returned: C4 - E6" )
  
  propEqual(MadMinuteUtlities.findModifiedRange('D4', MadMinute.trebleRange.range), ['D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6','D6','E6'], "D4 - Correct range returned: D4 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('E4', MadMinute.trebleRange.range), ['E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6','D6','E6'], "E4 - Correct range returned: E4 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('F4', MadMinute.trebleRange.range), ['F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6','D6','E6'], "F4 - Correct range returned: F4 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('G4', MadMinute.trebleRange.range), ['G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6','D6','E6'], "G4 - Correct range returned: G4 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('A4', MadMinute.trebleRange.range), ['A4','B4','C5','D5','E5','F5','G5','A5','B5','C6','D6','E6'], "A4 - Correct range returned: A4 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('B4', MadMinute.trebleRange.range), ['B4','C5','D5','E5','F5','G5','A5','B5','C6','D6','E6'], "B4 - Correct range returned: B4 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('C5', MadMinute.trebleRange.range), ['C5','D5','E5','F5','G5','A5','B5','C6','D6','E6'], "C5 - Correct range returned: C5 - E6" )

  propEqual(MadMinuteUtlities.findModifiedRange('D5', MadMinute.trebleRange.range), ['D5','E5','F5','G5','A5','B5','C6','D6','E6'], "D5 - Correct range returned: D5 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('E5', MadMinute.trebleRange.range), ['E5','F5','G5','A5','B5','C6','D6','E6'], "E5 - Correct range returned: E5 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('F5', MadMinute.trebleRange.range), ['F5','G5','A5','B5','C6','D6','E6'], "F5 - Correct range returned: F5 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('G5', MadMinute.trebleRange.range), ['G5','A5','B5','C6','D6','E6'], "G5 - Correct range returned: G5 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('A5', MadMinute.trebleRange.range), ['A5','B5','C6','D6','E6'], "A5 - Correct range returned: A5 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('B5', MadMinute.trebleRange.range), ['B5','C6','D6','E6'], "B5 - Correct range returned: B5 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('C6', MadMinute.trebleRange.range), ['C6','D6','E6'], "C6 - Correct range returned: C6 - E6" )

  propEqual(MadMinuteUtlities.findModifiedRange('D6', MadMinute.trebleRange.range), ['D6','E6'], "D6 - Correct range returned: D6 - E6" )
  propEqual(MadMinuteUtlities.findModifiedRange('E6', MadMinute.trebleRange.range), ['E6'], "E6 - Correct range returned: E6 - E6" )
});

test("Bass range returns", function() {
  propEqual(MadMinuteUtlities.findModifiedRange(null, MadMinute.bassRange.range), ['E1','F1','G1','A1','B1','C2','D2','E2','F2','G2','A2','B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "Null - Correct range returned: E1 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('E1', MadMinute.bassRange.range), ['E1','F1','G1','A1','B1','C2','D2','E2','F2','G2','A2','B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "E1 - Correct range returned: E1 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('F1', MadMinute.bassRange.range), ['F1','G1','A1','B1','C2','D2','E2','F2','G2','A2','B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "F1 - Correct range returned: F1 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('G1', MadMinute.bassRange.range), ['G1','A1','B1','C2','D2','E2','F2','G2','A2','B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "G1 - Correct range returned: G1 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('A1', MadMinute.bassRange.range), ['A1','B1','C2','D2','E2','F2','G2','A2','B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "A1 - Correct range returned: A1 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('B1', MadMinute.bassRange.range), ['B1','C2','D2','E2','F2','G2','A2','B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "B1 - Correct range returned: B1 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('C2', MadMinute.bassRange.range), ['C2','D2','E2','F2','G2','A2','B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "C2 - Correct range returned: C2 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('D2', MadMinute.bassRange.range), ['D2','E2','F2','G2','A2','B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "D2 - Correct range returned: D2 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('E2', MadMinute.bassRange.range), ['E2','F2','G2','A2','B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "E2 - Correct range returned: E2 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('F2', MadMinute.bassRange.range), ['F2','G2','A2','B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "F2 - Correct range returned: F2 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('G2', MadMinute.bassRange.range), ['G2','A2','B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "G2 - Correct range returned: G2 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('A2', MadMinute.bassRange.range), ['A2','B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "A2 - Correct range returned: A2 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('B2', MadMinute.bassRange.range), ['B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "B2 - Correct range returned: B2 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('C3', MadMinute.bassRange.range), ['C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "C3 - Correct range returned: C3 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('D3', MadMinute.bassRange.range), ['D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "D3 - Correct range returned: D3 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('E3', MadMinute.bassRange.range), ['E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "E3 - Correct range returned: E3 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('F3', MadMinute.bassRange.range), ['F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "F3 - Correct range returned: F3 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('G3', MadMinute.bassRange.range), ['G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "G3 - Correct range returned: G3 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('A3', MadMinute.bassRange.range), ['A3','B3','C4','D4','E4','F4','G4','A4','B4','C5'], "A3 - Correct range returned: A3 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('B3', MadMinute.bassRange.range), ['B3','C4','D4','E4','F4','G4','A4','B4','C5'], "B3 - Correct range returned: B3 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('C4', MadMinute.bassRange.range), ['C4','D4','E4','F4','G4','A4','B4','C5'], "C4 - Correct range returned: C4 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('D4', MadMinute.bassRange.range), ['D4','E4','F4','G4','A4','B4','C5'], "D4 - Correct range returned: D4 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('E4', MadMinute.bassRange.range), ['E4','F4','G4','A4','B4','C5'], "E4 - Correct range returned: E4 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('F4', MadMinute.bassRange.range), ['F4','G4','A4','B4','C5'], "F4 - Correct range returned: F4 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('G4', MadMinute.bassRange.range), ['G4','A4','B4','C5'], "G4 - Correct range returned: G4 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('A4', MadMinute.bassRange.range), ['A4','B4','C5'], "A4 - Correct range returned: A4 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('B4', MadMinute.bassRange.range), ['B4','C5'], "B4 - Correct range returned: B4 - C5" )
  propEqual(MadMinuteUtlities.findModifiedRange('C5', MadMinute.bassRange.range), ['C5'], "C5 - Correct range returned: C5 - C5" )

});
