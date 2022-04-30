

/**
 * Converts a non-well defined function, which may return undefined, to a well defined function, which may only return defined values.
 * @param f - The function
 * @param _else - The fallback value
 * @returns - The new well defined function
 */
export function orElse<X,Y>(f: (_: X | void) => Y | undefined, _else: Y): (_: X) => Y {
    return (x: X) => {
        const y = f(x);
        if(y === undefined)
            return _else;
        else 
            return y;
    }
}
