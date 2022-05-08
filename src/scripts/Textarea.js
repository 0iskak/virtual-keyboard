// eslint-disable-next-line import/no-cycle
import Keyboard from './Keyboard.js';
import Letter from './key/Letter.js';
import Symbol from './key/Symbol.js';

export default class Textarea {
  static instance = new Textarea();

  element = document.createElement('textarea');

  constructor() {
    this.element.id = 'textarea';
  }

  typed(code, key) {
    let start = this.element.selectionStart;
    const end = this.element.selectionEnd;

    let toPrint;

    if (key instanceof Letter) {
      toPrint = key.element.innerText;
    } else if (key instanceof Symbol) {
      if (Keyboard.instance.isShift) {
        toPrint = key.element.querySelector('.secondary')
          .innerText;
      } else {
        toPrint = key.element.querySelector('.main')
          .innerText;
      }
    } else {
      let { value } = this.element;

      switch (code) {
        case 'Space':
          toPrint = ' ';
          break;
        case 'Backspace':
          if (start === end) {
            if (start === 0) break;
            value = value.substring(0, start - 1)
              + value.substring(end, value.length);
            start--;
          } else {
            value = value.substring(0, start)
            + value.substring(end, value.length);
          }
          this.element.value = value;
          break;
        case 'Delete':
          if (start === end) {
            if (start === value.length) break;
            value = value.substring(0, start)
              + value.substring(start + 1, value.length);
          } else {
            value = value.substring(0, start)
              + value.substring(end, value.length);
          }
          this.element.value = value;
          break;
        case 'Enter':
          toPrint = '\n';
          break;
        case 'Tab':
          toPrint = '\t';
          break;
        default:
          switch (code.split('Arrow')[1]) {
            case 'Left':
              if (start-- === 0) start = 0;
              break;
            case 'Right':
              if (start++ === this.element.textLength) start--;
              break;
            case 'Up':
              if ((start - 30) >= 0) start -= 30;
              break;
            case 'Down':
              if (start + 30 <= value.length) start += 30;
              break;
            default:
          }
      }
    }

    if (toPrint) {
      let { value } = this.element;
      value = value.substring(0, start) + toPrint
      + value.substring(end, value.length);

      start += toPrint.length;
      this.element.value = value;
    }

    this.element.selectionStart = start;
    this.element.selectionEnd = start;
    this.element.blur();
    this.element.focus();
  }
}
