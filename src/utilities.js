import { TimeSignatures, NoteValues } from './constants';

function getBeatsPerMeasure(timeSignature) {
    return +timeSignature.split('/')[0];
}

function getNoteTypeForBeat(timeSignature) {
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

function getAllowedNotesFromTimeSignature(timeSignature) {

}
export {
    getBeatsPerMeasure, 
    getNoteValuesFromTimeSignature, 
    getNoteTypeForBeat, 
    getAllowedNotesFromTimeSignature
};

// whole: {
//     vfNotation: 'w',
//     duration: 1,
//     numericDesignation: 1,
// },