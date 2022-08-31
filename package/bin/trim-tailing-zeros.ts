/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

export default function trimTailingZeros (value: string): string {
    let trimmedValue = value
    while (trimmedValue.slice(-1) === "0") trimmedValue = trimmedValue.slice(0, trimmedValue.length - 1)

    return trimmedValue
}
