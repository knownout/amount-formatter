/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import amountPrettier from "../amount-prettier"

describe("Amount prettier test", () => {
    it("Test without decimals", () => {
        expect(amountPrettier("12345.")).toEqual("12 345")
        expect(amountPrettier("123")).toEqual("123")
        expect(amountPrettier("1234567890")).toEqual("1 234 567 890")
    })

    it("Test with decimals", () => {
        expect(amountPrettier("12345.125")).toEqual("12 345.125")
        expect(amountPrettier("123.412512512515")).toEqual("123.412512")
        expect(amountPrettier("123.412512512515", 12)).toEqual("123.412512512515")
        expect(amountPrettier("1234567890.1231232141252151241", 19))
            .toEqual("1 234 567 890.1231232141252151241")
    })

    it("Test with non-valid numbers", () => {
        expect(amountPrettier("12345. 125")).toEqual("12 345.125")
        expect(amountPrettier("12345 . 125")).toEqual("12 345.125")
        expect(amountPrettier("12345 .125")).toEqual("12 345.125")
        expect(amountPrettier("12345 .125 123")).toEqual("12 345.125123")
    })
})
