/// <reference types="jest" />

import { handleInvalidColor } from '../editor/src/components/ColorPalette/utils'

const hexRegEx = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/

test('handleInvalidColor - Blank returns random hex', () => {
    expect(handleInvalidColor('')).toMatch(hexRegEx)
})

test('handleInvalidColor - Invalid chars returns random hex', () => {
    expect(handleInvalidColor('#$%Fff')).toMatch(hexRegEx)
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