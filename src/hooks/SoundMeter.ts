export class SoundMeter {
    public context: AudioContext;
    public instant: number = 0.0;
    public slow: number = 0.0;
    public clip: number = 0.0;
    public analyser: AnalyserNode
    public mic?: MediaStreamAudioSourceNode


    public constructor(context: AudioContext) {
        this.context = context;
        this.analyser = this.context.createAnalyser();
        this.analyser.fftSize = 2048;
        this.analyser.smoothingTimeConstant = 0.8;
        

        setInterval(() => {
            const array = new Uint8Array(this.analyser.frequencyBinCount);
            this.analyser.getByteFrequencyData(array);
            let sum = 0;
    
            for (let i = 0; i < array.length; i++) {
                sum += array[i];
            }
    
            const average = sum / array.length;
    
            this.instant = average;
            this.slow = 0.95 * this.slow + 0.05 * this.instant;
        }, 100);

        
    }

    public connectToSource(stream: any, callback: (arg0: unknown) => void) {
        console.log('SoundMeter connecting');
        try {
            this.mic = this.context.createMediaStreamSource(stream);
            this.mic.connect(this.analyser);
            if (typeof callback !== 'undefined') {
                callback(null);
            }
        } catch (e) {
            console.error(e);
            if (typeof callback !== 'undefined') {
                callback(e);
            }
        }
    }

    public stop() {
        console.log('SoundMeter stopping');
        this.mic.disconnect();
        this.analyser.disconnect();
    }
}