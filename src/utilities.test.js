import {
  getBeatsPerMeasure,
  getNoteTypeForBeat,
  getNoteValuesFromTimeSignature,
  getNormalizedDuration,
  getNoteValuesFromTimeSignatureAndCustomNotes,
  getAllowedNotesFromTimeSignature,
  getAllowedNotesFromTimeSignatureAndActiveNotes,
  getRandomTimeSignature,
  getXRandomTimeSignaturesFromAllowed,
  getXRandomTimeSignatures,
  getRandomNoteFromAllowedNotes,
  getRandomFromAllowedNotes,
  finishMeasure,
  getNoteSuffix,
  getMultiplier,
} from './utilities';
import { TimeSignatures, NoteValues } from './constants';

describe('getBeatsPerMeasure', () => {
  const test = getBeatsPerMeasure(TimeSignatures[0]); // 3/2
  const test1 = getBeatsPerMeasure(TimeSignatures[1]); // 2/2
  const test2 = getBeatsPerMeasure(TimeSignatures[2]); // 2/4
  const test3 = getBeatsPerMeasure(TimeSignatures[3]); // 3/4
  const test4 = getBeatsPerMeasure(TimeSignatures[4]); // 4/4
  const test5 = getBeatsPerMeasure(TimeSignatures[5]); // 5/4
  const test6 = getBeatsPerMeasure(TimeSignatures[6]); // 3/8
  const test7 = getBeatsPerMeasure(TimeSignatures[7]); // 5/8
  const test8 = getBeatsPerMeasure(TimeSignatures[8]); // 6/8
  const test9 = getBeatsPerMeasure(TimeSignatures[9]); // 9/8
  const test10 = getBeatsPerMeasure(TimeSignatures[10]); // 12/8

  it('returns 3 when 3/2 is entered', () => {
    expect(test).toEqual(3);
  });
  it('returns 2 when 2/2 is entered', () => {
    expect(test1).toEqual(2);
  });
  it('returns 2 when 2/4 is entered', () => {
    expect(test2).toEqual(2);
  });
  it('returns 3 when 3/4 is entered', () => {
    expect(test3).toEqual(3);
  });
  it('returns 4 when 4/4 is entered', () => {
    expect(test4).toEqual(4);
  });
  it('returns 5 when 5/4 is entered', () => {
    expect(test5).toEqual(5);
  });
  it('returns 3 when 3/8 is entered', () => {
    expect(test6).toEqual(3);
  });
  it('returns 5 when 5/8 is entered', () => {
    expect(test7).toEqual(5);
  });
  it('returns 6 when 6/8 is entered', () => {
    expect(test8).toEqual(6);
  });
  it('returns 9 when 9/8 is entered', () => {
    expect(test9).toEqual(9);
  });
  it('returns 12 when 12/8 is entered', () => {
    expect(test10).toEqual(12);
  });
});

describe('getNoteTypeForBeat', () => {
  const test = getNoteTypeForBeat(TimeSignatures[0]); // 3/2
  const test1 = getNoteTypeForBeat(TimeSignatures[1]); // 2/2
  const test2 = getNoteTypeForBeat(TimeSignatures[2]); // 2/4
  const test3 = getNoteTypeForBeat(TimeSignatures[3]); // 3/4
  const test4 = getNoteTypeForBeat(TimeSignatures[4]); // 4/4
  const test5 = getNoteTypeForBeat(TimeSignatures[5]); // 5/4
  const test6 = getNoteTypeForBeat(TimeSignatures[6]); // 3/8
  const test7 = getNoteTypeForBeat(TimeSignatures[7]); // 5/8
  const test8 = getNoteTypeForBeat(TimeSignatures[8]); // 6/8
  const test9 = getNoteTypeForBeat(TimeSignatures[9]); // 9/8
  const test10 = getNoteTypeForBeat(TimeSignatures[10]); // 12/8

  it('returns 2 when 3/2 is entered', () => {
    expect(test).toEqual(2);
  });

  it('returns 2 when 2/2 is entered', () => {
    expect(test1).toEqual(2);
  });

  it('returns 4 when 2/4 is entered', () => {
    expect(test2).toEqual(4);
  });

  it('returns 4 when 3/4 is entered', () => {
    expect(test3).toEqual(4);
  });

  it('returns 4 when 4/4 is entered', () => {
    expect(test4).toEqual(4);
  });

  it('returns 4 when 5/4 is entered', () => {
    expect(test5).toEqual(4);
  });

  it('returns 8 when 3/8 is entered', () => {
    expect(test6).toEqual(8);
  });
  it('returns 8 when 5/8 is entered', () => {
    expect(test7).toEqual(8);
  });
  it('returns 8 when 6/8 is entered', () => {
    expect(test8).toEqual(8);
  });

  it('returns 8 when 9/8 is entered', () => {
    expect(test9).toEqual(8);
  });

  it('returns 8 when 12/8 is entered', () => {
    expect(test10).toEqual(8);
  });
});

describe('getNoteValuesFromTimeSignature', () => {
  const test = getNoteValuesFromTimeSignature(TimeSignatures[0]);
  const testObject = test[0];
  const testObject1 = test[1];
  const testObject2 = test[2];
  const testObject3 = test[3];
  const testObject4 = test[4];
  const testObject5 = test[5];
  it('The return is an array', () => {
    expect.arrayContaining(test);
  });
  it('The array length is 6', () => {
    expect(test.length).toEqual(6);
  });
  it('Contains three keys', () => {
    expect(testObject).toHaveProperty('properName');
    expect(testObject).toHaveProperty('normalizedDuration');
    expect(testObject).toHaveProperty('vfNotation');
  });
  it('Whole note in 3/2 time', () => {
    expect(testObject).toHaveProperty('properName', 'Whole Note');
    expect(testObject).toHaveProperty('normalizedDuration', 2);
    expect(testObject).toHaveProperty('vfNotation', 'w');
  });
  it('Half note in 3/2 time', () => {
    expect(testObject1).toHaveProperty('properName', 'Half Note');
    expect(testObject1).toHaveProperty('normalizedDuration', 1);
    expect(testObject1).toHaveProperty('vfNotation', 'h');
  });
  it('Quarter note in 3/2 time', () => {
    expect(testObject2).toHaveProperty('properName', 'Quarter Note');
    expect(testObject2).toHaveProperty('normalizedDuration', 0.5);
    expect(testObject2).toHaveProperty('vfNotation', 'q');
  });
  it('Eighth note in 3/2 time', () => {
    expect(testObject3).toHaveProperty('properName', 'Eighth Note');
    expect(testObject3).toHaveProperty('normalizedDuration', 0.25);
    expect(testObject3).toHaveProperty('vfNotation', '8');
  });

  it('Sixteenth note in 3/2 time', () => {
    expect(testObject4).toHaveProperty('properName', 'Sixteenth Note');
    expect(testObject4).toHaveProperty('normalizedDuration', 0.125);
    expect(testObject4).toHaveProperty('vfNotation', '16');
  });
  it('Thirty-second note in 3/2 time', () => {
    expect(testObject5).toHaveProperty('properName', 'Thirty-Second Note');
    expect(testObject5).toHaveProperty('normalizedDuration', 0.0625);
    expect(testObject5).toHaveProperty('vfNotation', '32');
  });
});

describe('getNormalizedDuration', () => {
  // duration = note duration
  // multiplier = 1/d where d is duration
  // durations = 1, 0.5, 0.25, 0.125, 0.0625, 0.03125
  const test = getNormalizedDuration(4, 1);
  const test1 = getNormalizedDuration(4, 0.5);
  const test2 = getNormalizedDuration(4, 0.25);
  const test3 = getNormalizedDuration(4, 0.125);
  const test4 = getNormalizedDuration(4, 0.0625);
  const test5 = getNormalizedDuration(4, 0.03125);

  const test6 = getNormalizedDuration(2, 1);
  const test7 = getNormalizedDuration(2, 0.5);
  const test8 = getNormalizedDuration(2, 0.25);
  const test9 = getNormalizedDuration(2, 0.125);
  const test10 = getNormalizedDuration(2, 0.0625);
  const test11 = getNormalizedDuration(2, 0.03125);

  const test12 = getNormalizedDuration(8, 1);
  const test13 = getNormalizedDuration(8, 0.5);
  const test14 = getNormalizedDuration(8, 0.25);
  const test15 = getNormalizedDuration(8, 0.125);
  const test16 = getNormalizedDuration(8, 0.0625);
  const test17 = getNormalizedDuration(8, 0.03125);

  expect(test).toEqual(4);
  expect(test1).toEqual(2);
  expect(test2).toEqual(1);
  expect(test3).toEqual(0.5);
  expect(test4).toEqual(0.25);
  expect(test5).toEqual(0.125);

  expect(test6).toEqual(2);
  expect(test7).toEqual(1);
  expect(test8).toEqual(0.5);
  expect(test9).toEqual(0.25);
  expect(test10).toEqual(0.125);
  expect(test11).toEqual(0.0625);

  expect(test12).toEqual(8);
  expect(test13).toEqual(4);
  expect(test14).toEqual(2);
  expect(test15).toEqual(1);
  expect(test16).toEqual(0.5);
  expect(test17).toEqual(0.25);
});

describe('getMultiplier', () => {
  it('Multiplier 1', () => {
    expect(getMultiplier(1)).toEqual(1);
  })
  it('Multiplier 2', () => {
    expect(getMultiplier(2)).toEqual(.50);
  })
  it('Multiplier 4', () => {
    expect(getMultiplier(4)).toEqual(.25);
  })
  it('Multiplier 8', () => {
    expect(getMultiplier(8)).toEqual(.125);
  })
  it('Multiplier 16', () => {
    expect(getMultiplier(16)).toEqual(.0625);
  })
  it('Multiplier 32', () => {
    expect(getMultiplier(32)).toEqual(.03125);
  })
});

describe('getAllowedNotesFromTimeSignature', () => {
  const test1 = [{"normalizedDuration": 2, "properName": "Whole Note", "vfNotation": "w"}, {"normalizedDuration": 1,
  "properName": "Half Note", "vfNotation": "h"}, {"normalizedDuration": 0.5, "properName": "Quarter Note", "vfNotation": "q"}, {"normalizedDuration": 0.25, "properName": "Eighth Note", "vfNotation": "8"}, {"normalizedDuration": 0.125, "properName": "Sixteenth Note", "vfNotation": "16"}, {"normalizedDuration": 0.0625, "properName": "Thirty-Second Note", "vfNotation": "32"}];
  
  it('Allowed Note Values in 3/2', () => {
    expect(getAllowedNotesFromTimeSignature(TimeSignatures[0])).toEqual(test1);
  });
  it('Allowed Note Values in 2/2', () => {
    expect(getAllowedNotesFromTimeSignature(TimeSignatures[1])).toEqual(test1);
  });
  const test2 = [{"normalizedDuration": 2, "properName": "Half Note", "vfNotation": "h"}, {"normalizedDuration": 1, "properName": "Quarter Note", "vfNotation": "q"}, {"normalizedDuration": 0.5, "properName": "Eighth Note", "vfNotation": "8"}, {"normalizedDuration": 0.25, "properName": "Sixteenth Note", "vfNotation": "16"}, {"normalizedDuration": 0.125, "properName": "Thirty-Second Note", "vfNotation": "32"}];

  it('Allowed Note Values in 2/4', () => {
    expect(getAllowedNotesFromTimeSignature(TimeSignatures[2])).toEqual(test2);
  });

  it('Allowed Note Values in 3/4', () => {
    expect(getAllowedNotesFromTimeSignature(TimeSignatures[3])).toEqual(test2);
  });

  const test3 = [{"normalizedDuration": 4, "properName": "Whole Note", "vfNotation": "w"}, {"normalizedDuration": 2, "properName": "Half Note", "vfNotation": "h"}, {"normalizedDuration": 1, "properName": "Quarter Note", "vfNotation": "q"}, {"normalizedDuration": 0.5, "properName": "Eighth Note", "vfNotation": "8"}, {"normalizedDuration": 0.25, "properName": "Sixteenth Note", "vfNotation": "16"}, {"normalizedDuration": 0.125, "properName": "Thirty-Second Note", "vfNotation": "32"}];
  it('Allowed Note Values in 4/4', () => {
    expect(getAllowedNotesFromTimeSignature(TimeSignatures[4])).toEqual(test3);
  });
  it('Allowed Note Values in 5/4', () => {
    expect(getAllowedNotesFromTimeSignature(TimeSignatures[5])).toEqual(test3);
  });

  it('Allowed Note Values in 3/8', () => {
    const test4 = [{"normalizedDuration": 2, "properName": "Quarter Note", "vfNotation": "q"}, {"normalizedDuration": 1, "properName": "Eighth Note", "vfNotation": "8"}, {"normalizedDuration": 0.5, "properName": "Sixteenth Note", "vfNotation": "16"}, {"normalizedDuration": 0.25, "properName": "Thirty-Second Note", "vfNotation": "32"}];
    expect(getAllowedNotesFromTimeSignature(TimeSignatures[6])).toEqual(test4);
  });

  const test5 = [{"normalizedDuration": 4, "properName": "Half Note", "vfNotation": "h"}, {"normalizedDuration": 2, "properName": "Quarter Note", "vfNotation": "q"}, {"normalizedDuration": 1, "properName": "Eighth Note", "vfNotation": "8"}, {"normalizedDuration": 0.5, "properName": "Sixteenth Note", "vfNotation": "16"}, {"normalizedDuration": 0.25, "properName": "Thirty-Second Note", "vfNotation": "32"}];

  it('Allowed Note Values in 5/8', () => {
    expect(getAllowedNotesFromTimeSignature(TimeSignatures[7])).toEqual(test5);
  });
  it('Allowed Note Values in 6/8', () => {
    expect(getAllowedNotesFromTimeSignature(TimeSignatures[8])).toEqual(test5);
  });
  const test6 = [{"normalizedDuration": 8, "properName": "Whole Note", "vfNotation": "w"}, {"normalizedDuration": 4, "properName": "Half Note", "vfNotation": "h"}, {"normalizedDuration": 2, "properName": "Quarter Note", "vfNotation": "q"}, {"normalizedDuration": 1, "properName": "Eighth Note", "vfNotation": "8"}, {"normalizedDuration": 0.5, "properName": "Sixteenth Note", "vfNotation": "16"}, {"normalizedDuration": 0.25, "properName": "Thirty-Second Note", "vfNotation": "32"}];

  it('Allowed Note Values in 9/8', () => {
    expect(getAllowedNotesFromTimeSignature(TimeSignatures[9])).toEqual(test6); 
  });

  it('Allowed Note Values in 12/8', () => {
    expect(getAllowedNotesFromTimeSignature(TimeSignatures[10])).toEqual(test6);
  });

});