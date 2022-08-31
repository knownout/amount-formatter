# 🧱 Amount formatting functions

_Select documentation language:_ **English** (selected),
[Русский](https://github.com/re-knownout/amount-formatter/tree/master/package/README.ru-RU.md)

This project is a set of functions for formatting numbers that reflect the amount of something
(in monetary terms equivalent)

## Functions

|   # | Наименование                          | Описание                                                                          |
|----:|:--------------------------------------|:----------------------------------------------------------------------------------|
|   1 | [amountFormatter](#amountformatter)   | Function to format string-like amounts                                            |
|   2 | [trimTailingZeros](#trimtailingzeros) | Function to remove zeros at the end of the amount                                 |
|   3 | [amountPrettier](#amountprettier)     | Function for splitting the amount into groups and for adding other embellishments |

## amountFormatter

-

Signature: `export default function amountFormatter(value: string, options?: Partial<IAmountFormatterOptions>) => string`
.

A function to format string-like amount using BigNumber (to work with large numbers).

```ts
amountFormatter("123456781.1245667", DEFAULT_FORMATTER_OPTIONS) // => 123 456 781...
```

## trimTailingZeros

- Signature: `(value: string) => string`.

Function to remove zeros at the end of the amount.

```ts
trimTailingZeros("010000") // => 01
```

## amountPrettier

- Signature: `(value: string, maxFractionLength = 6) => string`.

Function for splitting the amount into groups and for adding other embellishments.

```ts
amountPrettier("12345.") // => 12 345
```

re-knownout - https://github.com/re-knownout/
<br>knownout@hotmail.com
