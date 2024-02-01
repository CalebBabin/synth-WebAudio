import { useEffect, useRef } from "react";

export default function Synth({
	instrumentID = 0,
	oscillatorType = "sine",
}) {
	const gainRef = useRef();
	const frequencyRef = useRef();



	useEffect(() => {
		if (!gainRef.current || !frequencyRef.current) return;

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

			oscillator.frequency.setValueAtTime(oscillatorCurrentFrequency, now + delta / 2);
			frequencyRef.current.style.height = ((oscillatorCurrentFrequency) / 10) + "%";

			const deltaGain = (oscillatorTargetGain - oscillatorCurrentGain) * delta * speedOfChange;
			oscillatorCurrentGain += deltaGain;
			gainNode.gain.setValueAtTime(oscillatorCurrentGain, now + delta / 2);
			gainRef.current.style.height = (oscillatorCurrentGain / maxGain) * 100 + "%";
		}
		const tickFrequency = 1000 / 60;
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
	}, [instrumentID, oscillatorType, gainRef.current, frequencyRef.current])

	return <div className="border rounded p-2 max-w-[10rem] text-center flex flex-col gap-4">
		<div>
			synth id: {instrumentID} <br /> oscillator type: {oscillatorType}
		</div>
		<div className="flex gap-4 justify-center">
			<div>
				<div className="rounded border-2 w-8 h-24 relative overflow-hidden">
					<div className="w-full h-1/2 bg-red-500 bottom-0 absolute" ref={frequencyRef} />
				</div>
				freq
			</div>
			<div>
				<div className="rounded border-2 w-8 h-24 relative overflow-hidden">
					<div className="w-full h-1/2 bg-blue-500 bottom-0 absolute" ref={gainRef} />
				</div>
				gain
			</div>
		</div>
	</div>;
}