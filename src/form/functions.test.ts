// import { getRefKeys } from '.';
import { getUpdatedLiveValuesFromRefs } from './utils'

describe('Test getUpdatedLiveValues', () => {
    it('should return correct values', () => {
        const values = {firstName: "", team: ""}
        const refValues = {firstName: "JonhA", lastName: "Doe", team: "Arsenal", text: "", agreed: false }

        const updatedLiveValues = getUpdatedLiveValuesFromRefs(values, refValues)
        expect(updatedLiveValues).toEqual({firstName: "JonhA", team: "Arsenal"})
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