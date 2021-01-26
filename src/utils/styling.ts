// There is a priority when getting the StylingProps. The style will be created from:
// 1) css 2) style 3) className
export const getStylingProps = (defaultStyle: ObjectType, { style, css, className }: { style?: ObjectType, css?: string, className?: string }) => {
    let stylingProps
    if (css) {
        const className = constructCssStyleAndReturnClassName(css)
        stylingProps = { className }
    } else if (style && Object.keys(style).length > 0) {
        stylingProps = {
            style: {...defaultStyle, ...style}
        }
    } else {
        stylingProps = { className }
    }
    return stylingProps
}


const getSelectorsArray = (rulesString: string): Array<number| undefined> => {
    const selectors = []
    for(let i=0;i<rulesString.length;i++){
        if(rulesString[i] === '&') {
            selectors.push(i)
        }
    }
    return selectors
}

const getSelectorsAndMainStyleBlocks = (rules: string, selectorPositions: Array<number | undefined>, className: string): [string, string, Array<string>] => {
    if (selectorPositions.length > 0) {
        let rulesArray = []
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

            // Need to check whether the first element of the block is : or any other select as .anotherClass, > anotherTag
            // if its : then we need to put it together with the className otherwise we need a space between them for the css rules to work
            const firstBlockChar = block.slice(0, 1)
            const blockWithClassName = firstBlockChar === ':' ? `.${className}${block}` : `.${className} ${block}`


            // Adding to the array for us to have separate rules and call CSSStyleSheet.addRule() without error
            const parsedBlockWithClassName = blockWithClassName.replace(/\r?\n|\r/g, ' ');
            rulesArray.push(parsedBlockWithClassName)
            return `${previous}
                ${blockWithClassName}`
        }, '')
        const mainStyleBlock = `.${className} {${mainBlock.trim()}}`
        rulesArray.unshift(mainStyleBlock)

        return [mainStyleBlock, selectorBlocks, rulesArray]
    }
    // If there are no special & for selectors then we return an array with the main rule for the class name
    return [rules, '', [`.${className} {${rules.trim()}}`]]
}

const attachCssRulesToDocument = (styleSheetRules: Array<string>) => {
    if (styleSheetRules.length > 0) {
        const style = document.createElement('style')
        document.head.appendChild(style)
        try {
            styleSheetRules.forEach(rule => style.sheet?.insertRule(rule))
        } catch (error) {
            console.log('FAILED TO PARSE RULE: ', error.name)
        }
    }
}

export const constructCssStyleAndReturnClassName = (css: string): string => {
    // First try to find a & for a selector then splice on it
    // If there are no & then we should wrap all these rules in a {} and defined a class name for it
    const generateRandomString = (length=6) => Math.random().toString(20).substr(2, length)
    const className = `styled-${generateRandomString(8)}`

    const selectorsPositions = getSelectorsArray(css)
    const [ ,  , styleSheetRules] = getSelectorsAndMainStyleBlocks(css, selectorsPositions, className)
    attachCssRulesToDocument(styleSheetRules)
    return className
}