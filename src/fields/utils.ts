
export const isArrayOfStrings = (options: Array<any> | undefined): boolean => {
    if (options && options.length > 0 && Array.isArray(options)) {
        return options.reduce((previous, current) => {
            return previous && typeof current === 'string'
        }, true)
    }
    return false
}