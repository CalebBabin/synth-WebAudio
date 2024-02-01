import Keyboard from "./components/keyboard"
import Synth from "./components/synth"

function SynthWithControls({ id, type, gain }) {
	return <div className="flex flex-col justify-center items-center gap-4">
		<Synth instrumentID={id} gain={gain} oscillatorType={type} />

		<div className="flex flex-wrap justify-center">
			<div className="flex flex-col items-center">
				Octave 2
				<Keyboard instrumentID={id} octaveRange={[2]} noSharp={false} onlySharp={true} />
				<Keyboard instrumentID={id} octaveRange={[2]} noSharp={true} />
			</div>
			<div className="flex flex-col items-center">
				Octave 3
				<Keyboard instrumentID={id} octaveRange={[3]} noSharp={false} onlySharp={true} />
				<Keyboard instrumentID={id} octaveRange={[3]} noSharp={true} />
			</div>
			<div className="flex flex-col items-center">
				Octave 4
				<Keyboard instrumentID={id} octaveRange={[4]} noSharp={false} onlySharp={true} />
				<Keyboard instrumentID={id} octaveRange={[4]} noSharp={true} />
			</div>
			<div className="flex flex-col items-center">
				Octave 5
				<Keyboard instrumentID={id} octaveRange={[5]} noSharp={false} onlySharp={true} />
				<Keyboard instrumentID={id} octaveRange={[5]} noSharp={true} />
			</div>
		</div>
	</div>
}

function App() {
	return <div className="flex flex-col items-center w-full gap-32 py-48">
		<SynthWithControls id={0} type="sine" gain={0.3} />
		<SynthWithControls id={1} type="square" gain={0.1} />
		<SynthWithControls id={2} type="sawtooth" gain={0.1} />
		<SynthWithControls id={3} type="triangle" gain={0.2} />
	</div>
}

export default App
