// import { getRefKeys } from '.';
import { getUpdatedLiveValuesFromRefs, checkHasFilledValues } from './utils'

describe('Test getUpdatedLiveValues', () => {
    it('should return correct values', () => {
        const values = {firstName: "", team: ""}
        const refValues = {firstName: "JonhA", lastName: "Doe", team: "Arsenal", text: "", agreed: false }

        const updatedLiveValues = getUpdatedLiveValuesFromRefs(values, refValues)
        expect(updatedLiveValues).toEqual({firstName: "JonhA", team: "Arsenal"})
    })
})

describe('Test checkHasFilledValues', () => {
    const tests = [
        [{firstName: "", team: ""}, {firstName: "JonhA", team: "Arsenal" }, true],
        [{firstName: "", team: ""}, {firstName: "", team: "Arsenal" }, true],
        [{firstName: "", team: ""}, {firstName: "", team: "" }, false],
        [{firstName: "", checked: false}, {firstName: "", checked: false }, true],
        [{firstName: "", teams: []}, {firstName: "", teams: [] }, false],
        [{firstName: "Jonh", teams: []}, {firstName: "", teams: [] }, false],
        [{firstName: "", teams: []}, {firstName: "", teams: ["Chelsea"] }, true],
    ]

    tests.forEach(([initial, final, expectedResult], index) => {
        it(`should return correct values for case ${index}`, () => {
            const hasFilled = checkHasFilledValues(final, initial)
            expect(hasFilled).toBe(expectedResult)
        })
    })
        
})

// describe('Test functions from Forms', () => {
//     const CASES = [
//         {args: {
//             firstName: '',
//             lastName: '',
//             checked: false
//         }, expected: ['firstName', 'lastName', 'checked']},
//         {args: {
//             firstName: '',
//             lastName: '',
//             checked: false,
//             undefined: undefined
//         }, expected: ['firstName', 'lastName', 'checked']},
//         {args: {}, expected: []}
//     ];

//     CASES.forEach((case) => {
//         test('Should getRefKeys', () => { 
//             const keys = getRefKeys(case.args);
//             expect(keys).toEqual(case.expected);
//         });
//     });

// });