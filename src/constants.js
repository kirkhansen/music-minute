export const RoutePath = {
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
    CHANGES: '/changes',
}

export const TimeSignatures = ['3/2', '2/2', '2/4', '3/4', '4/4', '5/4', '3/8', '5/8', '6/8', '9/8', '12/8']

export const NoteValues = {
    whole: {
        properName: 'Whole Note',
        vfNotation: 'w',
        duration: 1,
        numericDesignation: 1,
    },
    half: {
        properName: 'Half Note',
        vfNotation: 'h',
        duration: 0.5,
        numericDesignation: 2,
    },
    quarter: {
        properName: 'Quarter Note',
        vfNotation: 'q',
        duration: 0.25,
        numericDesignation: 4,
    },
    eighth: {
        properName: 'Eighth Note',
        vfNotation: '8',
        duration: 0.125,
        numericDesignation: 8,
    },
    sixteenth: {
        properName: 'Sixteenth Note',
        vfNotation: '16',
        duration: 0.0625,
        numericDesignation: 16,
    },
    thirtysecond: {
        properName: 'Thiry-Second Note',
        vfNotation: '32',
        duration: 0.03125,
        numericDesignation: 32,
    }
}