import './head.js';
import Keyboard from './Keyboard.js';
import Textarea from './Textarea.js';
import Info from './Info.js';

document.body.append(
  Textarea.instance.element,
  Keyboard.instance.element,
  Info.instance.element,
);

document.addEventListener(
  'click',
  () => Textarea.instance.element.focus(),
);

document.addEventListener(
  'DOMContentLoaded',
  () => document.dispatchEvent(new MouseEvent('click')),
);
