/**
 *
 * @param el
 * @param className
 * @returns {*}
 */
export function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className)
    else
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

/**
 *
 * @param el
 * @param className
 */
export function addClass(el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className)) el.className += " " + className
}

/**
 *
 * @param el
 * @param className
 */
export function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        el.className=el.className.replace(reg, ' ')
    }
}

/**
 *
 * @param { object } keyPressed
 * @param { object } keys
 * @param { function } callback
 * @returns {*}
 */
export function handleKey(keyPressed, keys, callback) {
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
    }

    return callback(currentKey[0]);
};

/**
 *
 * @param {object} params
 * @returns {*}
 */
export function createOscillator(params) {
    let analyser = params.audioCtx.createAnalyser();
    let oscillator;
    analyser.fftSize = 2048;
    // let bufferLength = analyser.frequencyBinCount;
    // let dataArray = new Uint8Array(bufferLength);

    oscillator = params.audioCtx.createOscillator();
    oscillator.type = params.activeType;
    oscillator.frequency.value = params.frequency;
    oscillator.connect(params.gainNode);
    oscillator.connect(analyser);
    params.gainNode.gain.value = params.volume / 100;
    params.gainNode.connect(params.audioCtx.destination);

    return oscillator;

    // function renderFrame() {
    //     const WIDTH = 500;
    //     const HEIGHT = 300;
    //     let canvas = document.querySelector('.canvas');
    //     let canvasCtx = canvas.getContext('2d');
    //
    //     requestAnimationFrame(renderFrame);
    //
    //     analyser.getByteTimeDomainData(dataArray);
    //
    //     canvasCtx.fillStyle = 'rgb(255, 255, 255)';
    //     canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    //
    //     canvasCtx.lineWidth = 2;
    //     canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    //
    //     canvasCtx.beginPath();
    //
    //     var sliceWidth = WIDTH * 1.0 / bufferLength;
    //     var x = 0;
    //
    //     for (var i = 0; i < bufferLength; i++) {
    //
    //         var v = dataArray[i] / 128.0;
    //         var y = v * HEIGHT / 2;
    //
    //         if (i === 0) {
    //             canvasCtx.moveTo(x, y);
    //         } else {
    //             canvasCtx.lineTo(x, y);
    //         }
    //
    //         x += sliceWidth;
    //     }
    //
    //     canvasCtx.lineTo(canvas.width, canvas.height / 2);
    //     canvasCtx.stroke();
    // }
    //
    // renderFrame();
}

