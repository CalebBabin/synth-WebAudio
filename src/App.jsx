import Keyboard from "./components/keyboard"
import Synth from "./components/synth"

function App() {
	return <div className="flex flex-col items-center w-full gap-4">
		<Synth instrumentID={0} />

		<div className="flex flex-wrap justify-center">
			<div className="flex flex-col items-center">
				Octave 2
				<Keyboard instrumentID={0} octaveRange={[2]} noSharp={false} onlySharp={true} />
				<Keyboard instrumentID={0} octaveRange={[2]} noSharp={true} />
			</div>
			<div className="flex flex-col items-center">
				Octave 3
				<Keyboard instrumentID={0} octaveRange={[3]} noSharp={false} onlySharp={true} />
				<Keyboard instrumentID={0} octaveRange={[3]} noSharp={true} />
			</div>
			<div className="flex flex-col items-center">
				Octave 4
				<Keyboard instrumentID={0} octaveRange={[4]} noSharp={false} onlySharp={true} />
				<Keyboard instrumentID={0} octaveRange={[4]} noSharp={true} />
			</div>
			<div className="flex flex-col items-center">
				Octave 5
				<Keyboard instrumentID={0} octaveRange={[5]} noSharp={false} onlySharp={true} />
				<Keyboard instrumentID={0} octaveRange={[5]} noSharp={true} />
			</div>
		</div>
	</div>
}

export default App
