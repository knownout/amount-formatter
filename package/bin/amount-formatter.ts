/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import BigNumber from "bignumber.js"
import amountPrettier from "./amount-prettier"

import trimTailingZeros from "./trim-tailing-zeros"

export interface IAmountFormatterOptions
{
    // Max decimals for provided number
    decimalsLimit: number;

    // Max length for whole number
    totalNumberLength: number;

    // Limit integer length, if no preserveInteger, will be rounded with ...
    integerLimit: number;

    // Custom prettier for values
    prettier: (value: string) => string;

    // Always add dots at value end if sliced
    enforceDots: boolean;

    // Remove dots from output
    removeDots: boolean;

    // If set, nan values will be replaced with specified string
    replaceNan: string;
}

export const DEFAULT_FORMATTER_OPTIONS: Partial<IAmountFormatterOptions> = {
    integerLimit: 18,
    decimalsLimit: 6,
    prettier: amountPrettier,
    totalNumberLength: 8,
    replaceNan: "—"
}

export const DEFAULT_USD_FORMATTER_OPTIONS: Partial<IAmountFormatterOptions> = {
    ...DEFAULT_FORMATTER_OPTIONS,
    decimalsLimit: 2,
    removeDots: true
}

export default function amountFormatter (
    value: string,
    options: Partial<IAmountFormatterOptions> = DEFAULT_FORMATTER_OPTIONS
): string {
    // eslint-disable-next-line prefer-const
    let [ integer, ...fractions ] = value.replace(/[\s,]/g, "").split("."),
        fraction = fractions.join(""),
        integerLimited = false,
        decimalsLimited = false

    if (options?.totalNumberLength && options.totalNumberLength > 0) {
        const trace = options.totalNumberLength - integer.length

        if (trace <= 0) {
            if (fraction && options.enforceDots) decimalsLimited = true
            fraction = ""
        } else {
            if (options.enforceDots && fraction.length > trace) decimalsLimited = true
            fraction = fraction.slice(0, trace)
        }
    }

    if (options?.decimalsLimit && options.decimalsLimit > 0) {
        if (fraction.length <= options.decimalsLimit) {
            const fractionNumber = new BigNumber(fraction)
            if (fractionNumber.isNaN()) fraction = ""
        } else {
            fraction = fraction.slice(0, options.decimalsLimit)
            if (new BigNumber(fraction).toFixed() === "0" || options.enforceDots) decimalsLimited = true
        }
    }

    if (options?.integerLimit && integer.length > options.integerLimit) {
        integerLimited = true
        fraction = ""
    }

    if ((fraction && !decimalsLimited) || options.removeDots) fraction = trimTailingZeros(fraction)
    if (decimalsLimited && new BigNumber(integer).gt(0) && new BigNumber(fraction).eq(0)) {
        fraction = ""
        decimalsLimited = false
    }

    let result = fraction ? `${ integer }.${ fraction }` : integer
    if (integerLimited) result = result.slice(0, options?.integerLimit)

    const dotsCondition = ((integerLimited || decimalsLimited) && !options.removeDots)
    if (options?.prettier) {
        const formatted = options.prettier(result)

        if (dotsCondition) return `${ formatted }...`

        if (formatted.toLowerCase() === "nan" && options.replaceNan) return options.replaceNan
        return formatted
    }

    if (dotsCondition) return `${ result }...`

    if (result.toLowerCase() === "nan" && options.replaceNan) return options.replaceNan
    return result
}
