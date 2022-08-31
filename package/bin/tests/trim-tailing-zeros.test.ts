/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import trimTailingZeros from "../trim-tailing-zeros"

it("Test tailing zeros trim function", () => {
    expect(trimTailingZeros("010000")).toEqual("01")
    expect(trimTailingZeros("0000200")).toEqual("00002")
    expect(trimTailingZeros("200")).toEqual("2")
    expect(trimTailingZeros("000000")).toEqual("")
})
