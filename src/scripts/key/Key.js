export default class Key {
  element = document.createElement('div');

  activeName = 'active';

  static DOWN = 0;

  static UP = 1;

  static HOLD = 2;

  state = Key.UP;

  constructor(html, ...classes) {
    this.element.classList.add('key', ...classes);
    this.element.innerHTML = html;
  }

  down() {
    this.element.classList.add(this.activeName);
    this.state = Key.DOWN;
  }

  up() {
    if (this.state === Key.DOWN) {
      this.element.classList.remove(this.activeName);
      this.state = Key.UP;
    } else {
      this.state = Key.DOWN;
    }
  }

  hold() {
    if (this.state === Key.UP) {
      this.element.classList.add(this.activeName);
      this.state = Key.HOLD;
    }
  }
}
