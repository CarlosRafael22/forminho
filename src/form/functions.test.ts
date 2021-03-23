// import { getRefKeys } from '.';
import { getUpdatedLiveValuesFromRefs, checkHasFilledValues, fieldValidator } from './utils'
// import { fieldValidator } from './utils'

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

describe('Test fieldValidator', () => {
    it('should not pass on min()', () => {
        const mockedSet = jest.fn()
        const mockedClear = jest.fn()

        new fieldValidator('test', 'firstName', mockedSet, mockedClear).min(6, 'Should have more than 6 letters').max(10, 'Should have less than 6 letters')
        expect(mockedSet).toHaveBeenCalledWith('firstName', 'Should have more than 6 letters')
        expect(mockedClear).not.toHaveBeenCalled()
    })

    it('should pass on min() but not on max()', () => {
        const mockedSet = jest.fn()
        const mockedClear = jest.fn()

        new fieldValidator('testinho name', 'firstName', mockedSet, mockedClear).min(6, 'Should have more than 6 letters').max(10, 'Should have less than 10 letters')
        expect(mockedSet).toHaveBeenCalledWith('firstName', 'Should have less than 10 letters')
        // expect(mockedClear).not.toHaveBeenCalled()
    })

    it('should pass on max() but not on min()', () => {
        const mockedSet = jest.fn()
        const mockedClear = jest.fn()

        new fieldValidator('testi', 'firstName', mockedSet, mockedClear).max(10, 'Should have less than 10 letters').min(6, 'Should have more than 6 letters')
        expect(mockedSet).toHaveBeenCalledWith('firstName', 'Should have more than 6 letters')
        // expect(mockedClear).not.toHaveBeenCalled()
    })

    it('should not pass on required()', () => {
        const mockedSet = jest.fn()
        const mockedClear = jest.fn()

        // const validate: any = () => (fieldName: string) => new fieldValidator('', fieldName, mockedSet, mockedClear)
        const validator: any = (fieldName: string) => new fieldValidator('', fieldName, mockedSet, mockedClear)

        const test = [validator('firstName').required().min(6, 'Should have more than 6 letters').max(10, 'Should have less than 10 letters')]

        // const test = { firstName: validator('firstName').required().min(6, 'Should have more than 6 letters').max(10, 'Should have less than 10 letters') }
        console.log('O TEST: ', test)
        expect(mockedSet).toHaveBeenCalledWith('firstName', 'firstName should be provided')
        expect(mockedClear).not.toHaveBeenCalled()
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