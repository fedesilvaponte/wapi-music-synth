export function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className)
    else
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

export function addClass(el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className)) el.className += " " + className
}

export function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        el.className=el.className.replace(reg, ' ')
    }
}

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

