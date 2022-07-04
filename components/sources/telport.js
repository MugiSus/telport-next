/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";

const Telport = class {
    constructor(frequencies) {
        
    }
}

const InitTelport = (frequencies) => useEffect(() => {

    if (typeof window === "undefined") return; // don't do anything if we're not in the browser
    if (frequencies.length % 8 > 0) {
        throw new Error("[Telport] The amount of given frequencies must be a multiple of 8");
    }
    
    console.log("[Telport] Initializing...");
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillatorNodes = Array.from(frequencies).map(frequencies => {
        const oscillatorNode = audioContext.createOscillator();
        oscillatorNode.frequency.value = frequencies;
        oscillatorNode.connect(audioContext.destination);
        return oscillatorNode;
    });
    
    // document.addEventListener("click", () => oscillatorNodes[20].start());

}, [])

export { InitTelport }