/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import amountFormatter, {
  DEFAULT_FORMATTER_OPTIONS, DEFAULT_USD_FORMATTER_OPTIONS, IAmountFormatterOptions
} from "../amount-formatter"
import amountPrettier from "../amount-prettier"

describe("Amount formatter test", () => {
    it("Test without options", () => {
        expect(amountFormatter("1234567", {})).toEqual("1234567")
        expect(amountFormatter("1234567 .123", {})).toEqual("1234567.123")
        expect(amountFormatter("1234567.  123", {})).toEqual("1234567.123")
        expect(amountFormatter("12312412512412415124124", {})).toEqual("12312412512412415124124")
    })

    it("Test with total number limitation", () => {
        const options: Partial<IAmountFormatterOptions> = {
            totalNumberLength: 8
        }

        expect(amountFormatter("1234567891", options)).toEqual("1234567891")
        expect(amountFormatter("1234.5678", options)).toEqual("1234.5678")
        expect(amountFormatter("12345.5678", options)).toEqual("12345.567")
        expect(amountFormatter("1234567.5678", options)).toEqual("1234567.5")
    })

    it("Test with integer limitation", () => {
        const options: Partial<IAmountFormatterOptions> = {
            totalNumberLength: 8,
            integerLimit: 6
        }

        expect(amountFormatter("1234567.5678", options)).toEqual("123456...")
        expect(amountFormatter("123456.5678", options)).toEqual("123456.56")
        expect(amountFormatter("1234.5678", options)).toEqual("1234.5678")
    })

    it("Test with limitations and formatter", () => {
        const options: Partial<IAmountFormatterOptions> = {
            totalNumberLength: 8,
            integerLimit: 6,
            prettier: amountPrettier
        }

        expect(amountFormatter("1234567.5678", options)).toEqual("123 456...")
        expect(amountFormatter("123456.5678", options)).toEqual("123 456.56")
        expect(amountFormatter("1234.5678", options)).toEqual("1 234.5678")
        expect(amountFormatter("1241412215122141512512412", options)).toEqual("124 141...")
    })

    it("All limitations test", () => {
        const options: Partial<IAmountFormatterOptions> = {
            totalNumberLength: 8,
            prettier: amountPrettier,
            decimalsLimit: 6,
            integerLimit: 18
        }

        expect(amountFormatter("1234567.1234567", options)).toEqual("1 234 567.1")
        expect(amountFormatter("123456.5678", options)).toEqual("123 456.56")
        expect(amountFormatter("1234.5678", options)).toEqual("1 234.5678")
        expect(amountFormatter("1241412215122141512512412", options)).toEqual("124 141 221 512 214 151...")
        expect(amountFormatter("124141221512214151.12121212", options)).toEqual("124 141 221 512 214 151")
        expect(amountFormatter("12414122151221415", options)).toEqual("12 414 122 151 221 415")
        expect(amountFormatter("1241412215122141", options)).toEqual("1 241 412 215 122 141")
    })

    it("Test with enforced dots", () => {
        const options: Partial<IAmountFormatterOptions> = {
            ...DEFAULT_FORMATTER_OPTIONS,
            enforceDots: true
        }

        expect(amountFormatter("123456781.1245667", options)).toEqual("123 456 781...")
        expect(amountFormatter("1234.1245667", options)).toEqual("1 234.1245...")
    })

    it("Test nan replacement", () => {
        const options: Partial<IAmountFormatterOptions> = {
            ...DEFAULT_FORMATTER_OPTIONS,
            replaceNan: "REPLACER"
        }

        expect(amountFormatter("NaN", options)).toEqual("REPLACER")
    })

    it("Test with usd balance configuration", () => {
        const options = DEFAULT_USD_FORMATTER_OPTIONS

        expect(amountFormatter("0.0001", options)).toEqual("0")
        expect(amountFormatter("12.0001", options)).toEqual("12")
        expect(amountFormatter("1234567.123", options)).toEqual("1 234 567.1")
    })

    it("Test with default options", () => {
        expect(amountFormatter("0.01")).toEqual("0.01")
        expect(amountFormatter("0.01000")).toEqual("0.01")
        expect(amountFormatter("1234567.5678")).toEqual("1 234 567.5")
        expect(amountFormatter("123456.5678")).toEqual("123 456.56")
        expect(amountFormatter("1234.5678")).toEqual("1 234.5678")
        expect(amountFormatter("1241412215122141512512412")).toEqual("124 141 221 512 214 151...")
        expect(amountFormatter("12414122151221415")).toEqual("12 414 122 151 221 415")
        expect(amountFormatter("1241412215122141")).toEqual("1 241 412 215 122 141")
        expect(amountFormatter("0.0000001")).toEqual("0.000000...")
        expect(amountFormatter("0.1234567")).toEqual("0.123456")
        expect(amountFormatter("5.00000001")).toEqual("5")
    })
})
