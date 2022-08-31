# 🧱 Amount formatting functions

_Выберите язык документации:_
[English](https://github.com/re-knownout/amount-formatter/tree/master/package/README.md), **Русский** (выбран)

Данный проект является набором функций для форматирования чисел, отражающих количество чего-либо (в денежном
эквиваленте)

## Функции

|   # | Наименование                          | Описание                                                                     |
|----:|:--------------------------------------|:-----------------------------------------------------------------------------|
|   1 | [amountFormatter](#amountformatter)   | Функция для форматирования сумм в виде строк                                 |
|   2 | [trimTailingZeros](#trimtailingzeros) | Функция для удаления нулей, находящихся в конце суммы                        |
|   3 | [amountPrettier](#amountprettier)     | Функция для разбиения суммы по группам и для добавления других украшательств |

## amountFormatter

-

Сигнатура: `export default function amountFormatter(value: string, options?: Partial<IAmountFormatterOptions>) => string`
.

Функция для форматирования сумм в виде строк при помощи BigNumber (для работы с очень большими числами).

```ts
amountFormatter("123456781.1245667", DEFAULT_FORMATTER_OPTIONS) // => 123 456 781...
```

## trimTailingZeros

- Сигнатура: `(value: string) => string`.

Функция для удаления нулей, находящихся в конце суммы.

```ts
trimTailingZeros("010000") // => 01
```

## amountPrettier

- Сигнатура: `(value: string, maxFractionLength = 6) => string`.

Функция для разбиения суммы по группам и для добавления других украшательств.

```ts
amountPrettier("12345.") // => 12 345
```

re-knownout - https://github.com/re-knownout/
<br>knownout@hotmail.com
