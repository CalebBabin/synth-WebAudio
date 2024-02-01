import { useEffect, useMemo } from "react";

export default function Synth({
	instrumentID = 0,
	oscillatorType = "sine",
}) {
	useEffect(() => {
		const audioContext = new AudioContext();
		const oscillator = audioContext.createOscillator();
		oscillator.type = oscillatorType;

		const gainNode = audioContext.createGain();
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);

		let oscillatorStarted = false;
		let oscillatorTargetFrequency = 293.66476791740756;
		let oscillatorCurrentFrequency = 293.66476791740756;

		let oscillatorTargetGain = 0;
		let oscillatorCurrentGain = 0;
		const maxGain = 0.5;

		const speedOfChange = 20;

		let lastTick = 0;
		const tick = () => {
			if (!oscillatorStarted) return;

			const now = audioContext.currentTime;
			const delta = now - lastTick;
			lastTick = now;
			const deltaFrequency = (oscillatorTargetFrequency - oscillatorCurrentFrequency) * delta * speedOfChange;
			oscillatorCurrentFrequency += deltaFrequency;
			oscillator.frequency.setValueAtTime(oscillatorCurrentFrequency, now);

			const deltaGain = (oscillatorTargetGain - oscillatorCurrentGain) * delta * speedOfChange;
			oscillatorCurrentGain += deltaGain;
			gainNode.gain.setValueAtTime(oscillatorCurrentGain, now);
		}
		const tickFrequency = 1000 / 240;
		const tickInterval = window.setInterval(tick, tickFrequency);

		const handler = (e) => {
			if (e.detail.instrumentID === instrumentID) {
				oscillatorTargetFrequency = e.detail.frequency;
				oscillatorTargetGain = maxGain;

				if (!oscillatorStarted) {
					oscillator.start();
					oscillatorStarted = true;
				}
			}
		}
		window.addEventListener("instrument-" + instrumentID + "-note", handler);

		const noteStopHandler = () => {
			oscillatorTargetFrequency = oscillatorCurrentFrequency * 0.8;
			oscillatorTargetGain = 0;
		}

		window.addEventListener("mouseup", noteStopHandler);
		window.addEventListener("mouseleave", noteStopHandler);
		return () => {
			window.removeEventListener("instrument-" + instrumentID + "-note", handler);
			window.removeEventListener("mouseup", noteStopHandler);
			window.removeEventListener("mouseleave", noteStopHandler);

			audioContext.close();
			window.clearInterval(tickInterval);
		}
	}, [instrumentID, oscillatorType])

	return null;
}