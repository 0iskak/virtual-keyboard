export default class Info {
  static instance = new Info();

  element = document.createElement('div');

  constructor() {
    this.element.id = 'info';
    this.element.innerText = 'LEFT CONTROL + SPACE to switch the language';
  }
}
