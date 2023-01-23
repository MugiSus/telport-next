const oscillator = class {
    constructor(audioContext, frequency) {
        this.audioContext = audioContext;
        this.frequency = frequency;
        this.started = false;

        this.oscillator = this.audioContext.createOscillator();
        this.oscillator.frequency.value = this.frequency;
        this.oscillator.type = "sine";

        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = 0;
        this.gainNode.connect(this.audioContext.destination);

        this.oscillator.connect(this.gainNode);
    }

    start(length) {
        if (!this.started)
            this.oscillator.start(this.audioContext.currentTime);
        
        this.started = true;
        this.gainNode.gain.value = 0.05;
        this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + length - 0.02);
    }
}

const Telport = class {
    constructor({ fftSize, start, amount, step = 2, interval = 100 }) {
        if (amount % 8 > 0) {
            throw new Error("[TELPort] The amount must be a multiple of 8");
        }

        this.fftSize = fftSize;
        this.start = start;
        this.amount = amount;
        this.step = step;
        this.size = amount / 8;
        this.interval = interval;

        this.callInterval = null;
        this.recieveInterval = null;

        this.hertzPerBin = 44100 / this.fftSize;
        this.frequencies = new Uint16Array(
            [...new Array(this.amount).keys()].map(i => (this.start + i * this.step) * this.hertzPerBin)
        );

        if (typeof window === "undefined") return; // don't do anything if we're not in the browser

        this.audioContext = new (AudioContext ?? webkitAudioContext)();
        this.oscillators = Array.from(this.frequencies).map(frequency => new oscillator(this.audioContext, frequency));
    }

    callSingle(uint8Array, length) {
        return new Promise((resolve, reject) => {
            if (typeof window === "undefined")
                resolve(); // don't do anything if we're not in the browser

            this.oscillators.forEach((oscillator, index) => {
                const bit = (uint8Array[Math.trunc(index / 8)] >> (index % 8)) & 1;
                if (bit === 1) 
                    oscillator.start(length / 1000);
            });

            window.setTimeout(resolve, length);
        })
    }

    callTuner(length = 10000) {
        this.clearCall();
        
        return new Promise((resolve, reject) => {
            if (typeof window === "undefined")
                resolve(); // don't do anything if we're not in the browser
            
            this.callSingle(new Uint8Array(this.size).fill(0b11001100), length).then(resolve);
        })
    }
    
    callStarter(datatype, datasize, length = 500) {
        this.clearCall();
        
        return new Promise((resolve, reject) => {
            if (typeof window === "undefined")
                resolve(); // don't do anything if we're not in the browser
            
            const uint8Array = new Uint8Array([
                0xAA, 0xAA, 0xAA, 0xAA,
                datasize,
                datasize >> 8,
                datasize >> 16,
                datasize >> 24,
                datatype,
            ]);
            console.log(uint8Array);
            this.callSingle(uint8Array, length).then(resolve);
        });
    }

    call(uint8Array) {
        this.clearCall();

        return new Promise((resolve, reject) => {
            if (typeof window === "undefined")
                resolve(); // don't do anything if we're not in the browser
        
            if (this.oscillators === null)
                reject(new Error("[TELPort] The TELPort has not been initialized yet"));
        
            // const dataView = new DataView(arrayBuffer);
            const dataLength = uint8Array.length;
            const data = uint8Array;
        
            let offset = this.size;
            this.callSingle(data.slice(0, this.size), this.interval);

            this.callInterval = window.setInterval(() => {
                this.callSingle(data.slice(offset, offset + this.size), this.interval);

                offset += this.size;
                if (offset > dataLength) {
                    resolve();
                    window.clearInterval(this.callInterval);
                }
            }, this.interval);
        })
    }

    callText(text) {
        return new Promise((resolve, reject) => {
            if (typeof window === "undefined")
                resolve(); // don't do anything if we're not in the browser

            const encoder = new TextEncoder();
            const uint8Array = encoder.encode(text);
    
            this.callStarter(0, uint8Array.length, 500).then(() => this.call(uint8Array));
        });
    }

    clearCall() {
        if (this.callInterval !== null)
            window.clearInterval(this.callInterval);

        this.oscillators.forEach(oscillator => oscillator.gainNode.gain.value = 0);
    }

    recieveTuner() {
        
    }

    enableReceiver() {
        
    }
}

export default Telport;