export const RoutePath = {
    HOME: '/',
    HOME_GITHUB: '/music-minute',
    ABOUT: '/about',
    NAMES: '/create/names',
    VALUES: '/create/values'
}

export const TimeSignatures = ['3/2', '2/2', '2/4', '3/4', '4/4', '5/4', '3/8', '5/8', '6/8', '9/8', '12/8']

export const TimeSignatureOptions = [
    { value: '3/2', label: '3/2', },
    { value: '2/2', label: '2/2', },
    { value: '2/4', label: '2/4', },
    { value: '3/4', label: '3/4', },
    { value: '4/4', label: '4/4', },
    { value: '5/4', label: '5/4', },
    { value: '3/8', label: '3/8', },
    { value: '5/8', label: '5/8', },
    { value: '6/8', label: '6/8', },
    { value: '9/8', label: '9/8', },
    { value: '12/8', label: '12/8', },
  ];

  export const NoteValueOptions = [
    { value: 'w', label: '𝅝', },
    { value: 'h', label: '𝅗𝅥', },
    { value: 'q', label: '♩', },
    { value: '8', label: '𝅘𝅥𝅮', },
    { value: '16', label: '𝅘𝅥𝅯', },
    { value: '32', label: '𝅘𝅥𝅰', },
  ];

export const NoteValues = {
    whole: {
        properName: 'Whole Note',
        vfNotation: 'w',
        duration: 1,
        numericDesignation: 1,
        active: false,
    },
    half: {
        properName: 'Half Note',
        vfNotation: 'h',
        duration: 0.5,
        numericDesignation: 2,
        active: false,
    },
    quarter: {
        properName: 'Quarter Note',
        vfNotation: 'q',
        duration: 0.25,
        numericDesignation: 4,
        active: false,
    },
    eighth: {
        properName: 'Eighth Note',
        vfNotation: '8',
        duration: 0.125,
        numericDesignation: 8,
        active: false,
    },
    sixteenth: {
        properName: 'Sixteenth Note',
        vfNotation: '16',
        duration: 0.0625,
        numericDesignation: 16,
        active: false,
    },
    thirtysecond: {
        properName: 'Thirty-Second Note',
        vfNotation: '32',
        duration: 0.03125,
        numericDesignation: 32,
        active: false,
    }
}
