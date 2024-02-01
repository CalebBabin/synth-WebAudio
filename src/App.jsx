import Keyboard from "./components/keyboard"
import Synth from "./components/synth"


function App() {
	return <>
		<Keyboard instrumentID={0} octaveRange={[2, 4, 5]} noSharp={true} />
		<Synth instrumentID={0} />
	</>
}

export default App
