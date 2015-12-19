# Emoji Clock

This is a web component for an emoji clock.

### Why?

I was interested to see what the current 'native' web component situation is when no polyfills are used.

### Should I use this?

It's just an experiment; so far I've only tested that it works on Chrome 47.

### Installation

Install this through npm.

```sh
npm install emoji-clock
```

### Getting Started

Register your custom element in JavaScript. I recommend using the name `emoji-clock`, but you can
use whatever you'd like.

```js
var emojiClock = require('emoji-clock');

document.registerElement('emoji-clock', {
  prototype: emojiClock
});
```

After that, you can use the element in your HTML!

```html
<emoji-clock time="2:30"></emoji-clock>
```

### Usage

The web component has a single custom attribute: `time`. The format should be `hour:minute`. Leading zeros
on numbers are optional. For instance, two twenty can be written as `2:20` or `02:20`.

Dynamically updating the attribute in JavaScript will update the emoji that is displayed.

