import Key from './Key.js';

export default class Symbol extends Key {
  constructor(main, secondary) {
    super(`
    <span class="main">${main}</span>
    <span class="secondary">${secondary}</span>
    `, 'symbol');
  }
}
