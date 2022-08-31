/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

export default function amountPrettier (value: string, maxFractionLength = 6): string {
    const [ integer, fraction ] = value.replace(/[ ,]/g, "").split(".")

    const reverse = (v: string) => v.split("").reverse().join("")

    const parts = {
        natural: integer,
        decimals: fraction || "",
        reverse: reverse(integer)
    }

    const naturalChunks: string[] = []

    for (let i = 0; i <= Math.ceil(parts.natural.length / 3); i += 1) {
        naturalChunks.push(reverse(parts.reverse.slice(i * 3, i * 3 + 3)))
    }

    parts.natural = naturalChunks.reverse().filter(Boolean).join(" ")
    if (parts.decimals) parts.decimals = parts.decimals.slice(0, maxFractionLength)

    return [ parts.natural, parts.decimals ]
        .filter(Boolean)
        .join(".")
}
