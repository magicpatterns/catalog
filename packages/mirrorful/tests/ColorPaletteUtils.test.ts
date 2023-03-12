/// <reference types="jest" />

import { handleInvalidColor, newShade } from '../editor/src/components/ColorPalette/utils'


//********** Testing for handleInvalidColor function **********//

const hexRegEx = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
// https://www.tutorialrepublic.com/css-reference/css-color-names.php
// This list should be sourced from another, more authoritative sources...
const validCssColors = [
    'aqua',
    'black',
    'blue',
    'fuchsia',
    'gray',
    'green',
    'lime',
    'maroon',
    'navy',
    'olive',
    'purple',
    'red',
    'silver',
    'teal',
    'white',
    'yellow',
    'aliceblue',
    'antiquewhite',
    'aqua',
    'aquamarine',
    'azure',
    'beige',
    'bisque',
    'black',
    'blanchedalmond',
    'blue',
    'blueviolet',
    'brown',
    'burlywood',
    'cadetblue',
    'chartreuse',
    'chocolate',
    'coral',
    'cornflowerblue',
    'cornsilk',
    'crimson',
    'cyan',
    'darkblue',
    'darkcyan',
    'darkgoldenrod',
    'darkgray',
    'darkgreen',
    'darkkhaki',
    'darkmagenta',
    'darkolivegreen',
    'darkorange',
    'darkorchid',
    'darkred',
    'darksalmon',
    'darkseagreen',
    'darkslateblue',
    'darkslategray',
    'darkturquoise',
    'darkviolet',
    'deeppink',
    'deepskyblue',
    'dimgray',
    'dodgerblue',
    'firebrick',
    'floralwhite',
    'forestgreen',
    'fuchsia',
    'gainsboro',
    'ghostwhite',
    'gold',
    'goldenrod',
    'gray',
    'green',
    'greenyellow',
    'honeydew',
    'hotpink',
    'indianred',
    'indigo',
    'ivory',
    'khaki',
    'lavender',
    'lavenderblush',
    'lawngreen',
    'lemonchiffon',
    'lightblue',
    'lightcoral',
    'lightcyan',
    'lightgoldenrodyellow',
    'lightgreen',
    'lightgrey',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'lightslategray',
    'lightsteelblue',
    'lightyellow',
    'lime',
    'limegreen',
    'linen',
    'magenta',
    'maroon',
    'mediumaquamarine',
    'mediumblue',
    'mediumorchid',
    'mediumpurple',
    'mediumseagreen',
    'mediumslateblue',
    'mediumspringgreen',
    'mediumturquoise',
    'mediumvioletred',
    'midnightblue',
    'mintcream',
    'mistyrose',
    'moccasin',
    'navajowhite',
    'navy',
    'navyblue',
    'oldlace',
    'olive',
    'olivedrab',
    'orange',
    'orangered',
    'orchid',
    'palegoldenrod',
    'palegreen',
    'paleturquoise',
    'palevioletred',
    'papayawhip',
    'peachpuff',
    'peru',
    'pink',
    'plum',
    'powderblue',
    'purple',
    'red',
    'rosybrown',
    'royalblue',
    'saddlebrown',
    'salmon',
    'sandybrown',
    'seagreen',
    'seashell',
    'sienna',
    'silver',
    'skyblue',
    'slateblue',
    'slategray',
    'snow',
    'springgreen',
    'steelblue',
    'tan',
    'teal',
    'thistle',
    'tomato',
    'turquoise',
    'violet',
    'wheat',
    'white',
    'whitesmoke',
    'yellow',
    'yellowgreen'
]

test('handleInvalidColor - Blank returns random hex', () => {
    expect(handleInvalidColor('')).toMatch(hexRegEx)
})

test('handleInvalidColor - Invalid symbols returns random hex', () => {
    expect(handleInvalidColor('#$%Fff')).toMatch(hexRegEx)
})

test('handleInvalidColor - Invalid chars returns random hex', () => {
    expect(handleInvalidColor('#hg0Off')).toMatch(hexRegEx)
})

test('handleInvalidColor - Extra hashes returns random hex', () => {
    expect(handleInvalidColor('##eeFff')).toMatch(hexRegEx)
})

test('handleInvalidColor - Wrong number of digits returns random hex', () => {
    expect(handleInvalidColor('#11223')).toMatch(hexRegEx)
})

test('handleInvalidColor - Correct input returns same hex', () => {
    expect(handleInvalidColor('#aaafff')).toBe('#aaafff')
    expect(handleInvalidColor('#AAAFFF')).toBe('#AAAFFF')
    expect(handleInvalidColor('#111aaa')).toBe('#111aaa')
})

test('handleInvalidColor - Correct CSS color names accepted and returned LC', () => {
    validCssColors.forEach(color => {
        expect(handleInvalidColor(color.toUpperCase())).toBe(color.toLowerCase())
    })
    validCssColors.forEach(color => {
        expect(handleInvalidColor(color)).toBe(color.toLowerCase())
    })    
});

//********** Testing for newShade function **********//
test('newShade - Blank returns random hex', () => {
    expect(handleInvalidColor('')).toMatch(hexRegEx)
})