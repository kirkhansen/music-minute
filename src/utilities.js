import { TimeSignatures, NoteValues } from './constants';

function getBeatsPerMeasure(timeSignature) {
    return +timeSignature.split('/')[0];
}

function getNoteTypeForBeat(timeSignature) {
    console.log(timeSignature);
    return +timeSignature.split('/')[1];
}

function getNoteValuesFromTimeSignature(timeSignature) {
    const beatValue = getNoteTypeForBeat(timeSignature);
    // find the object with the matching numeric designation
    const allNotes = Object.keys(NoteValues);
    let noteMatchIndex = null
    allNotes.forEach((item, index) => {
        if (NoteValues[item].numericDesignation === beatValue) {
            noteMatchIndex = index;
        }
    })

    // what type of note gets one beat?
    // NoteValues[allNotes[test2]]

    // What is the multiplier for all other notes to determine how many beats
    // they get in the time signature?
    const multiplier = (1 / NoteValues[allNotes[noteMatchIndex]].duration);

    const ret = [];
    allNotes.forEach((item, index) => {
        let tmp = {};
        tmp.properName = NoteValues[item].properName;
        tmp.normalizedDuration = NoteValues[item].duration * multiplier;
        tmp.vfNotation = NoteValues[item].vfNotation;
        ret.push(tmp);
    });
    return ret;
}

function getNoteValuesFromTimeSignatureAndCustomNotes(timeSignature, notes) {
    const beatValue = getNoteTypeForBeat(timeSignature);
    // find the object with the matching numeric designation
    const allNotes = Object.keys(notes);
    let noteMatchIndex = null
    allNotes.forEach((item, index) => {
        if (notes[item].numericDesignation === beatValue) {
            noteMatchIndex = index;
        }
    })
    // what type of note gets one beat?
    // NoteValues[allNotes[test2]]

    // What is the multiplier for all other notes to determine how many beats
    // they get in the time signature?
    const multiplier = (1 / notes[allNotes[noteMatchIndex]].duration);

    const ret = [];
    allNotes.forEach((item, index) => {
        let tmp = {};
        tmp.properName = notes[item].properName;
        tmp.normalizedDuration = notes[item].duration * multiplier;
        tmp.vfNotation = notes[item].vfNotation;
        tmp.active = notes[item].active;
        ret.push(tmp);
    });
    return ret;
}

function getAllowedNotesFromTimeSignature(timeSignature) {
    const noteValues = getNoteValuesFromTimeSignature(timeSignature);
    const bpm = getBeatsPerMeasure(timeSignature);
    return noteValues.filter(item => item.normalizedDuration <= bpm);
}

function getAllowedNotesFromTimeSignatureAndActiveNotes(timeSignature, allowedNotes) {
    const noteValues = getNoteValuesFromTimeSignatureAndCustomNotes(timeSignature, allowedNotes);
    const bpm = getBeatsPerMeasure(timeSignature);
    return noteValues.filter(test, bpm);
}

function test(item, bpm) {
    if (item.normalizedDuration <= bpm && item.active === true) {
        return true;
    }
    return false;
}

function getRandomTimeSignature(allowedMeters) {
    return allowedMeters[Math.floor(Math.random() * Math.floor(allowedMeters.length))];
}

function getXRandomTimeSignaturesFromAllowed(count, allowedMeters){
    console.log(allowedMeters);
    const timeSignatureArray = [];
    for (let i = 0; i < count; i += 1) {
        timeSignatureArray.push(allowedMeters[Math.floor(Math.random() * Math.floor(allowedMeters.length))]);
    }
    return timeSignatureArray;
}

function getXRandomTimeSignatures(count) {
    const timeSignatureArray = [];
    for (let i = 0; i < count; i += 1) {
        timeSignatureArray.push(TimeSignatures[Math.floor(Math.random() * Math.floor(TimeSignatures.length))]);
    }
    return timeSignatureArray;
}

function getRandomNoteFromAllowedNotes(noteChoices) {
    return noteChoices[Math.floor(Math.random() * Math.floor(noteChoices.length))];
}

function getRandomFromAllowedNotes(noteChoices) {
    return getRandomNoteFromAllowedNotes(noteChoices);
}

function finishMeasure(beatsLeft, noteValues) {
    const arrayOfIndexes = [];
    let beatsLeftInMeasure = beatsLeft;
    let i = 0;
    while (beatsLeftInMeasure > 0) {
        if (noteValues[i].normalizedDuration <= beatsLeftInMeasure) {
            beatsLeftInMeasure = beatsLeftInMeasure - noteValues[i].normalizedDuration;
            arrayOfIndexes.push(i);
        }
        else {
            i = i+1;
        }
    }
    return arrayOfIndexes;
}

function getNoteSuffix(type) {
    if (type === 0) return ''
    else if (type===1) return 'r';
    const rand = Math.random() < 0.5
    if (rand) {
        return '';
    }

    return 'r';
}

export {
    getBeatsPerMeasure, 
    getNoteValuesFromTimeSignature, 
    getNoteTypeForBeat, 
    getAllowedNotesFromTimeSignature,
    getRandomTimeSignature,
    getRandomFromAllowedNotes,
    finishMeasure,
    getXRandomTimeSignatures,
    getNoteSuffix,
    getAllowedNotesFromTimeSignatureAndActiveNotes,
    getXRandomTimeSignaturesFromAllowed
};

// whole: {
//     vfNotation: 'w',
//     duration: 1,
//     numericDesignation: 1,
// },