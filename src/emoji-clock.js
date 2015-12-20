// This rounds a time to the nearest 30 minute value.
// For instance,
// 4:55 => 5:00
// 1:15 => 1:30
// 6:02 => 6:00
function roundTime(hour, minute) {
  // When the meetings are past 45, then we're rounding up to the next hour.
  if (minute >= 45) {
    hour++;
  }

  // We either round to the 0 or 30 minute mark
  if (minute >= 15 && minute <= 44) {
    minute = 30;
  } else {
    minute = 0;
  }

  return {
    minute: minute,
    hour: hour
  }
}

// Pass in the `timeValue`, get back an image element for that emoji clock
function generateImageElement(timeValue) {
  // The element only supports times in the format hours:minutes;
  // leading zeros (like 03:20) are okay.
  var timeValues = timeValue.split(':');
  var hour = Number(timeValues[0]);
  var minute = Number(timeValues[1]);

  var roundedTimeValues = roundTime(hour, minute);
  var roundedHour = String(roundedTimeValues.hour);
  var roundedMinute = String(roundedTimeValues.minute);
  var emojiTimeValue = roundedHour;
  if (roundedMinute !== '0') {
    emojiTimeValue += roundedMinute;
  }

  // The wrapper is ultimately because I want to use sprites with the `img` tag.
  // For that to work, the CSS `clip` property must be used on the `img`. That
  // property requires that the image itself be absolutely positioned. This
  // relatively positioned parent ensures that the child isn't positioned
  // in relationship to anything outside of the web component.
  var wrapper = document.createElement('div');
  wrapper.style.position = 'relative';

  var img = document.createElement('img');
  img.alt = hour + ':' + minute;
  img.src = '../dist/emoji-clock.png';
  // This allows developers to adjust the dimensions of this image
  // by applying the changes to the `emoji-clock` element directly.
  img.style.width = 'inherit';
  img.style.height = 'inherit';
  img.style.position = 'absolute';
  img.className = 'icon-clock' + emojiTimeValue;

  wrapper.appendChild(img);
  return wrapper;
}

var emojiClock = Object.create(HTMLElement.prototype);

Object.assign(emojiClock, {
  createdCallback: function () {
    var shadow = this.createShadowRoot();
    var timeValue = this.getAttribute('time');
    var img = generateImageElement(timeValue);
    shadow.innerHTML += '<style>@import url("../dist/emoji-clock.css");</style>';
    shadow.appendChild(img);
  },

  attributeChangedCallback: function (attr, oldVal, newVal) {
    if (attr !== 'time') {
      return;
    }
    var img = generateImageElement(newVal);
    this.shadowRoot.appendChild(img);
  }
});

document.registerElement('emoji-clock', {prototype: emojiClock});
