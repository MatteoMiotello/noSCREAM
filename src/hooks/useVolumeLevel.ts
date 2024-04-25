import { useState, useEffect } from 'react';
import { SoundMeter } from './SoundMeter';


declare global {
    interface Window {
        stream: any;
        soundMeter: SoundMeter;
        audioContext: AudioContext;
        constraints: { audio: boolean, video: boolean };
    }
}

function handleSuccess(stream: any) {
    window.stream = stream;
    const soundMeter = window.soundMeter = new SoundMeter(new AudioContext() );
    soundMeter.connectToSource(stream, function (e) {
        if (e) {
            alert(e);
            return;
        }
    });
}

function handleError(error: { message: any; name: any; }) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}


const useVolumeLevel = (): [ () => void, () => void, any ] => {

    const [level, setLevel] = useState(0);
    const [isRecording, setIsRecording] = useState(false)
    const [max, setMax] = useState(0)

    const stopRecording = () => {
        setLevel(0)
        window.soundMeter.stop()
        setIsRecording(false)
    }

    const startRecording = () => {
        const constraints = window.constraints = {
            audio: true,
            video: false
        };
        try {
            window.AudioContext = window.AudioContext;
            window.audioContext = new AudioContext();
        } catch (e) {
            alert('Web Audio API not supported.');
        }

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(handleSuccess)
            .catch(handleError);

        setIsRecording(true)
    }


    const updateVolume = () => {
        if (window.soundMeter && isRecording) {
            let v = window.soundMeter.instant
            setLevel(Math.min(v, 100))
            setMax(Math.max(max, level))
        }
    }


    useEffect(() => {
        let intervalId: any;
        intervalId = setInterval(updateVolume, 50)


        return () => clearInterval(intervalId);
    });

    return [startRecording, stopRecording, level];
}

export default useVolumeLevel;