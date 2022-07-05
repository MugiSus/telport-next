/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";

const oscillator = class {
    constructor(audioContext, frequency) {
        this.audioContext = audioContext;
        this.frequency = frequency;
        this.started = false;

        this.oscillator = this.audioContext.createOscillator();
        this.oscillator.frequency.value = this.frequency;
        this.oscillator.type = "sine";
        this.oscillator.connect(this.audioContext.destination);

        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = 0;
        this.gainNode.connect(this.audioContext.destination);

        this.oscillator.connect(this.gainNode);
    }

    start(length) {
        if (!this.started)
            this.oscillator.start(this.audioContext.currentTime);

        this.gainNode.gain.value = 0.0001;
        this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + length);
    }
}

let oscillators = null;

const useTelport = (frequencies) => useEffect(() => {
    
    console.log("[TELPort] Initializing...");

    if (typeof window === "undefined") return; // don't do anything if we're not in the browser
    if (frequencies.length % 8 > 0) {
        throw new Error("[TELPort] The amount of given frequencies must be a multiple of 8");
    }
    
    const audioContext = new (AudioContext ?? webkitAudioContext)();
    oscillators = Array.from(frequencies).map(frequencies => new oscillator(audioContext, frequencies));

    console.log("[TELPort] Initialization complete.");

    // document.addEventListener("click", () => oscillators[9].start(0.1))

}, []);



export { useTelport }