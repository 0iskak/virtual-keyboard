import Symbol from './key/Symbol.js';
import Letter from './key/Letter.js';
import Icon from './key/Icon.js';
import Text from './key/Text.js';
// eslint-disable-next-line import/no-cycle
import Textarea from './Textarea.js';
import Key from './key/Key.js';

export default class Keyboard {
  static getKeys = () => {
    const map = new Map();

    map.set('Backquote', [new Symbol('`', '~'), new Letter('Ё')]);
    map.set('Digit1', [new Symbol('1', '!'), new Symbol('1', '!')]);
    map.set('Digit2', [new Symbol('2', '@'), new Symbol('2', '"')]);
    map.set('Digit3', [new Symbol('3', '#'), new Symbol('3', '№')]);
    map.set('Digit4', [new Symbol('4', '$'), new Symbol('4', ';')]);
    map.set('Digit5', [new Symbol('5', '%'), new Symbol('5', '%')]);
    map.set('Digit6', [new Symbol('6', '^'), new Symbol('6', ':')]);
    map.set('Digit7', [new Symbol('7', '&'), new Symbol('7', '?')]);
    map.set('Digit8', [new Symbol('8', '*'), new Symbol('8', '*')]);
    map.set('Digit9', [new Symbol('9', '('), new Symbol('9', '(')]);
    map.set('Digit0', [new Symbol('0', ')'), new Symbol('0', ')')]);
    map.set('Minus', [new Symbol('-', '_'), new Symbol('-', '_')]);
    map.set('Equal', [new Symbol('=', '+'), new Symbol('=', '+')]);
    map.set('Backslash', [new Symbol('\\', '|'), new Symbol('\\', '/')]);
    map.set('Backspace', [new Icon('backspace'), new Icon('backspace')]);
    map.set('Tab', [new Icon('keyboard_tab'), new Icon('keyboard_tab')]);
    map.set('KeyQ', [new Letter('Q'), new Letter('Й')]);
    map.set('KeyW', [new Letter('W'), new Letter('Ц')]);
    map.set('KeyE', [new Letter('E'), new Letter('У')]);
    map.set('KeyR', [new Letter('R'), new Letter('К')]);
    map.set('KeyT', [new Letter('T'), new Letter('Е')]);
    map.set('KeyY', [new Letter('Y'), new Letter('Н')]);
    map.set('KeyU', [new Letter('U'), new Letter('Г')]);
    map.set('KeyI', [new Letter('I'), new Letter('Ш')]);
    map.set('KeyO', [new Letter('O'), new Letter('Щ')]);
    map.set('KeyP', [new Letter('P'), new Letter('З')]);
    map.set('BracketLeft', [new Symbol('[', '{'), new Letter('Х')]);
    map.set('BracketRight', [new Symbol(']', '}'), new Letter('Ъ')]);
    map.set('Delete', [new Text('Del'), new Text('Del')]);
    map.set('CapsLock', [new Icon('keyboard_capslock'), new Icon('keyboard_capslock')]);
    map.set('KeyA', [new Letter('A'), new Letter('Ф')]);
    map.set('KeyS', [new Letter('S'), new Letter('Ы')]);
    map.set('KeyD', [new Letter('D'), new Letter('В')]);
    map.set('KeyF', [new Letter('F'), new Letter('А')]);
    map.set('KeyG', [new Letter('G'), new Letter('П')]);
    map.set('KeyH', [new Letter('H'), new Letter('Р')]);
    map.set('KeyJ', [new Letter('J'), new Letter('О')]);
    map.set('KeyK', [new Letter('K'), new Letter('Л')]);
    map.set('KeyL', [new Letter('L'), new Letter('Д')]);
    map.set('Semicolon', [new Symbol(';', ':'), new Letter('Ж')]);
    map.set('Quote', [new Symbol('\'', '"'), new Letter('Э')]);
    map.set('Enter', [new Icon('keyboard_return'), new Icon('keyboard_return')]);
    map.set('ShiftLeft', [new Text('Shift'), new Text('Shift')]);
    map.set('KeyZ', [new Letter('Z'), new Letter('Я')]);
    map.set('KeyX', [new Letter('X'), new Letter('Ч')]);
    map.set('KeyC', [new Letter('C'), new Letter('С')]);
    map.set('KeyV', [new Letter('V'), new Letter('М')]);
    map.set('KeyB', [new Letter('B'), new Letter('И')]);
    map.set('KeyN', [new Letter('N'), new Letter('Т')]);
    map.set('KeyM', [new Letter('M'), new Letter('Ь')]);
    map.set('Comma', [new Symbol(',', '<'), new Letter('Б')]);
    map.set('Period', [new Symbol('.', '>'), new Letter('Ю')]);
    map.set('Slash', [new Symbol('/', '?'), new Symbol('.', ',')]);
    map.set('ShiftRight', [new Text('Shift'), new Text('Shift')]);
    map.set('ControlLeft', [new Text('Ctrl'), new Text('Ctrl')]);
    map.set('MetaLeft', [new Icon('keyboard_command_key'), new Icon('keyboard_command_key')]);
    map.set('AltLeft', [new Text('Alt'), new Text('Alt')]);
    map.set('Space', [new Icon('space_bar'), new Icon('space_bar')]);
    map.set('AltRight', [new Text('Alt'), new Text('Alt')]);
    map.set('ControlRight', [new Text('Ctrl'), new Text('Ctrl')]);
    map.set('ArrowUp', [new Icon('keyboard_arrow_up'), new Icon('keyboard_arrow_up')]);
    map.set('ArrowDown', [new Icon('keyboard_arrow_down'), new Icon('keyboard_arrow_down')]);
    map.set('ArrowLeft', [new Icon('keyboard_arrow_left'), new Icon('keyboard_arrow_left')]);
    map.set('ArrowRight', [new Icon('keyboard_arrow_right'), new Icon('keyboard_arrow_right')]);

    return map;
  };

  static instance = new Keyboard(
    Keyboard.getKeys(),
    15,
    29,
    42,
    54,
  );

  element = document.createElement('div');

  languages = ['EN', 'RU'];

  current = Number(document.cookie);

  isShift = false;

  isCaps = false;

  isLower = true;

  constructor(keys, ...breaks) {
    this.keys = keys;
    this.breaks = [0, ...breaks, this.keys.size];

    this.element.id = 'keyboard';

    this.generate(this.current);
    this.initEventListener();
  }

  generate(index) {
    this.element.innerHTML = '';
    this.breaks.reduce((a, b) => {
      const row = document.createElement('div');
      row.classList.add('row');
      Array.from(this.keys.values())
        .splice(a, b)
        .map((keys) => keys[index].element)
        .forEach((key) => {
          row.append(key);
        });
      this.element.append(row);
      return b;
    });
    this.switchCase(true);
  }

  initEventListener() {
    // Touch
    this.keys.forEach((keys, code) => {
      keys.forEach((key) => {
        const mouseleave = () => {
          key.up();
          key.element.removeEventListener('mouseleave', mouseleave);

          if (code.startsWith('Shift')) {
            if (key.state === Key.UP) {
              this.switchCase();
              this.isShift = false;
              this.switchShift(false);
            }
          } else if (code === 'CapsLock') {
            if (key.state === Key.UP) {
              this.switchCase();
              this.isCaps = false;
            }
          }
        };

        key.element.addEventListener('mousedown', () => {
          if (
            /^(CapsLock$|Shift|Alt|Control)/.test(code)
          ) key.hold();
          else if (code === 'Space' && this.isCtrl()) {
            this.switchLanguage();
          } else {
            key.down();
            Textarea.instance.typed(code, key);
          }

          if (code.startsWith('Shift')) {
            if (!this.isShift) {
              this.switchCase();
              this.isShift = true;
              this.switchShift(true);
            }
          } else if (code === 'CapsLock') {
            if (!this.isCaps) {
              this.switchCase();
              this.isCaps = true;
            }
          }

          key.element.addEventListener('mouseleave', mouseleave);
        });
        key.element.addEventListener('mouseup', mouseleave);
      });
    });

    // Keys
    document.addEventListener('keydown', (e) => {
      try {
        const key = this.keys.get(e.code)[this.current];
        if (e.code === 'CapsLock') key.hold();
        else if (e.code === 'Space' && this.isCtrl()) {
          this.switchLanguage();
        } else {
          key.down();
          Textarea.instance.typed(e.code, key);
        }

        if (e.code.startsWith('Shift')) {
          if (!this.isShift) {
            this.switchCase();
            this.isShift = true;
            this.switchShift(true);
          }
        } else if (e.code === 'CapsLock') {
          if (!this.isCaps) {
            this.switchCase();
            this.isCaps = true;
          }
        }

        e.preventDefault();
      } catch {
        Textarea.instance.element.blur();
      } finally {
        setTimeout(() => {
          Textarea.instance.element.focus();
        });
      }
    });

    document.addEventListener('keyup', (e) => {
      try {
        const key = this.keys.get(e.code)[this.current];

        key.up();

        if (e.code.startsWith('Shift')) {
          this.switchCase();
          this.isShift = false;
          this.switchShift(false);
        } else if (e.code === 'CapsLock') {
          if (key.state === Key.UP) {
            this.switchCase();
            this.isCaps = false;
          }
        }
        e.preventDefault();
      } catch {
        Textarea.instance.element.blur();
      } finally {
        setTimeout(() => {
          Textarea.instance.element.focus();
        });
      }
    });
  }

  isCtrl() {
    const { state } = this.keys.get('ControlLeft')[this.current];
    return state !== Key.UP;
  }

  switchLanguage() {
    this.keys.forEach((keys) => {
      keys[this.current].up();
    });

    if (++this.current === this.languages.length) {
      this.current = 0;
    }

    document.cookie = this.current.toString();
    this.generate(this.current);
  }

  switchCase(toLower = null) {
    const letters = this.element.querySelectorAll('.letter');

    const upper = () => {
      letters.forEach((letter) => {
        // eslint-disable-next-line no-param-reassign
        letter.innerText = letter.innerText.toUpperCase();
      });
    };

    const lower = () => {
      letters.forEach((letter) => {
        // eslint-disable-next-line no-param-reassign
        letter.innerText = letter.innerText.toLowerCase();
      });
    };

    if (toLower === null) {
      if (this.isLower) upper();
      else lower();

      this.isLower = !this.isLower;
    } else {
      if (toLower) lower();
      else upper();

      this.isLower = toLower;
    }
  }

  switchShift(toShift) {
    const shift = 'shift';
    const symbols = this.element.querySelectorAll('.symbol');
    if (toShift) {
      symbols.forEach((symbol) => {
        symbol.classList.add(shift);
      });
    } else {
      symbols.forEach((symbol) => {
        symbol.classList.remove(shift);
      });
    }
  }
}
