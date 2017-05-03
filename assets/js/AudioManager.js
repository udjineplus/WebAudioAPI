




class AudioManager {

    constructor(context) {
        this.context = new AudioContext();
        this.init();
    }

    init() {
        this.URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3';
        this.URL_PAD_1 = 'assets/wav/1.wav';
        this.URL_PAD_2 = 'assets/wav/2.wav';
        this.URL_PAD_3 = 'assets/wav/3.wav';
        this.URL_PAD_4 = 'assets/wav/4.wav';



        this.pad0Buffer = null;
        this.pad1Buffer = null;
        this.pad2Buffer = null;
        this.pad3Buffer = null;
        this.pad4Buffer = null;

        window.fetch(this.URL)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                this.pad0Buffer = audioBuffer;
            });

        window.fetch(this.URL_PAD_1)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                this.pad1Buffer = audioBuffer;
            });

        window.fetch(this.URL_PAD_2)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                this.pad2Buffer = audioBuffer;
            });

        window.fetch(this.URL_PAD_3)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                this.pad3Buffer = audioBuffer;
            });

        window.fetch(this.URL_PAD_4)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                this.pad4Buffer = audioBuffer;
            });
    }

    play(audioBuffer) {
        const source = this.context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.context.destination);
        source.start();
    }

    playPad0() {
        this.play(audioManager.pad0Buffer);
    }

    playPad1() {
        this.play(audioManager.pad1Buffer);
    }

    playPad2() {
        this.play(audioManager.pad2Buffer);
    }

    playPad3() {
        this.play(audioManager.pad3Buffer);
    }

    playPad4() {
        this.play(audioManager.pad4Buffer);
    }

}

var audioManager = new AudioManager();

audioManager.init();
// audioManager.play(audioManager.yodelBuffer);