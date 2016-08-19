/**
 *
 * @param el
 * @param className
 * @returns {*}
 */
export function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }
}

/**
 *
 * @param el
 * @param className
 */
export function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else if (!hasClass(el, className)) {
    el.className += ' ' + className;
  }
}

/**
 *
 * @param el
 * @param className
 */
export function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else if (hasClass(el, className)) {
    let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
  }
}

/**
 *
 * @param { object } keyPressed
 * @param { object } keys
 * @param { function } callback
 * @returns {*}
 */
export function getKeyPressed(keyPressed, keys, callback) {
  let currentKey;
  switch (keyPressed) {
    case 'a':
      currentKey = keys.filter(o => o.name === 'C1' || o.name === 'C4');
      break;
    case 'w':
      currentKey = keys.filter(o => o.name === 'C#1' || o.name === 'C#4');
      break;
    case 's':
      currentKey = keys.filter(o => o.name === 'D1' || o.name === 'D4');
      break;
    case 'e':
      currentKey = keys.filter(o => o.name === 'D#1' || o.name === 'D#4');
      break;
    case 'd':
      currentKey = keys.filter(o => o.name === 'E1' || o.name === 'E4');
      break;
    case 'f':
      currentKey = keys.filter(o => o.name === 'F1' || o.name === 'F4');
      break;
    case 't':
      currentKey = keys.filter(o => o.name === 'F#1' || o.name === 'F#4');
      break;
    case 'g':
      currentKey = keys.filter(o => o.name === 'G1' || o.name === 'G4');
      break;
    default:
      return false;
      break;
  }

  return callback(currentKey[0]);
}

