import { isArrayOfStrings } from './utils'

describe('Testing Field utils functions', () => {
    it('should return true if isArrayOfStrings', () => {
        const areStrings = isArrayOfStrings(['A', 'B', 'C', 'D'])
        expect(areStrings).toBe(true)
    })
    
    it('should return false if NOT isArrayOfStrings', () => {
        let areStrings = isArrayOfStrings(['A', null, 'C', 'D'])
        expect(areStrings).toBe(false)

        areStrings = isArrayOfStrings(['A', {}, 'C', 'D'])
        expect(areStrings).toBe(false)

        areStrings = isArrayOfStrings(['A', { name: 'B' }, 'C', 'D'])
        expect(areStrings).toBe(false)

        areStrings = isArrayOfStrings([])
        expect(areStrings).toBe(false)

        areStrings = isArrayOfStrings(undefined)
        expect(areStrings).toBe(false)
    })
})