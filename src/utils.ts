export const getSelectorsArray = (rulesString: string): Array<number| undefined> => {
    const selectors = []
    for(let i=0;i<rulesString.length;i++){
        if(rulesString[i] === '&') {
            selectors.push(i)
        }
    }
    return selectors
}

export const getSelectorsAndMainStyleBlocks = (rules: string, selectorPositions: Array<number | undefined>, className: string): [string, string] => {
    if (selectorPositions.length > 0) {
        let mainBlock = rules
        const numberOfMarks = Array.from(selectorPositions.keys())
        const selectorBlocks = numberOfMarks.reduce((previous, index) => {
            const firstMarkPosition = mainBlock.indexOf('&')
            const endOfSelectorBlock = mainBlock.indexOf('}', firstMarkPosition)
            // if we dont put endOf+1 it wont get the }
            // and put position+1 to not come with &
            const block = mainBlock.slice(firstMarkPosition!+1, endOfSelectorBlock+1)

            // If its the last then I only get the first part without the selector block
            if (index === selectorPositions.length-1) {
                mainBlock = `${mainBlock.slice(0, firstMarkPosition)}`
            } else {
                mainBlock = `${mainBlock.slice(0, firstMarkPosition)}${mainBlock.slice(endOfSelectorBlock+1)}`
            }

            const blockWithClassName = `.${className}${block}`
            return `${previous}
                ${blockWithClassName}`
        }, '')
        const mainStyleBlock = `.${className} {${mainBlock.trim()}}`
        console.log('OS STYLEEEEEES ----------- ', mainStyleBlock, selectorBlocks)

        return [mainStyleBlock, selectorBlocks]
    }
    return [rules, '']
}

export const attachCssStyleToDocument = (parsedCssRules: string | undefined) => {
    if (parsedCssRules) {
        const style = document.createElement('style')
        document.head.appendChild(style)
        style.appendChild(document.createTextNode(parsedCssRules))
    }
}

export const constructCssStyleAndReturnClassName = (css: string): string => {
    // First try to find a & for a selector then splice on it
    // If there are no & then we should wrap all these rules in a {} and defined a class name for it
    const generateRandomString = (length=6) => Math.random().toString(20).substr(2, length)
    const className = generateRandomString(8)
    // const className = 'testinho'

    const selectorsPositions = getSelectorsArray(css)
    const [mainStyleBlock, selectorsStyleBlocks] = getSelectorsAndMainStyleBlocks(css, selectorsPositions, className)
    const parsedCssRules = (`${mainStyleBlock}
        ${selectorsStyleBlocks}`)
    attachCssStyleToDocument(parsedCssRules)
    console.log('CLASS NAMEEE ------ ', className)
    return className
}