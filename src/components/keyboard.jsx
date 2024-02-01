import { useMemo } from "react"
import Key from "./key"
import octaves from "../utils/octaves";


function Keyboard({ octaveRange = [3, 4, 5], instrumentID = 0, noSharp = false }) {
	const octaveArray = useMemo(() => {
		return octaveRange.map((octaveIndex) => {
			let octave = octaves[octaveIndex]

			if (noSharp) {
				octave = octave.filter((note) => {
					return note[0].length === 1
				})
			}

			return <div className="flex" key={octaveIndex}>
				{octave.map((note, noteIndex) => (
					<Key key={octaveIndex + '-' + noteIndex} instrumentID={instrumentID} note={note[0]} octave={octaveIndex} frequency={note[1]} />
				))}
			</div>
		})
	}, [octaves]);

	return (
		<div className="flex select-none">
			{octaveArray}
		</div>
	)
}

export default Keyboard