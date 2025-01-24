---
sidebar_position: 1
---

# Intro to Jates

How to use Jates quick startup guide

All Jates format strings are derived from https://date-fns.org/v2.28.0/docs/format

## Getting Started

You can install jates as a npm module:

```bash
npm install jates
or
yarn add jates
```

But you can also directly import the package from unpkg

```js
import Jate from "https://unpkg.com/jates@latest/dist/index.es.js";
```

## Using Jates

To create a new Jate do

```js
const jate = new Jate();
```

Since Jate extends from the Date object, you can easily replace dates with jates in your code!

```js
const date = new Date();
const millis = date.getMilliseconds();
if (millis % 2 == 0) console.log("cool");
```

to

```js
const date = new Jate();
const millis = date.getMilliseconds();
if (millis % 2 == 0) console.log("cool");
```

## Features of Jates

Jates is a simple date library which allows you to manipulate a date object. The most notable of which is formating.

### Formating a Jate

Each Jate has a .format function which allows you to easily format the time to your needs.
For example:

```js
const jate = new Jate();
jate.format("dd/MM/yyyy");
```

The output here will be 4/08/2022 at the time of writing.

In the code below I use curly brackets {} to tell the formatter that the text should not be counted as input to the format.
Fortunately you only need to do this with letters, all other symbols are seperated by the formatter.

```js
jate.format("{Day}: d {Month}: MM {Year}: yyyy");
```

This means that it will return `Day: 4 Month: 08 Year: 2022`

With the curly brackets you can also put the strings to format next to each other. Here, for example, the formatter will seperate `DD` and `MM` and format them correctly.

```js
jate.format("d{}MM");
```

this will result in `408` (its the 4th of August today)

### Global formats

This feature of Jates allows you to easily manage formats of Jates along your entire project without having to change the format string everywhere.

In Jates we call this feature named formats, in practice we call

```js
jate.setFormat("hello world", "{hello world! Its} H:mm {at the moment}}");
```

To set the string of the `hello world` format name. And then anywhere else after in the project we run nformat (named format):

```js
jate.nformat("hello world");
```

It will result in `Hello world! Its 13:17 at the moment`
