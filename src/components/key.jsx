
export default function Key({ note = "C", octave = 4, instrumentID = 0, frequency = 440 }) {
	const dispatchEvent = () => {
		window.dispatchEvent(new CustomEvent("instrument-" + instrumentID + "-note", {
			detail: {
				instrumentID,
				note,
				octave,
				frequency
			}
		}))
	}

	return (
		<div
			onMouseDown={dispatchEvent}
			onMouseEnter={(e) => {
				if (e.buttons === 1) {
					dispatchEvent();
				}
			}}
			className="p-1 cursor-crosshair"
		>
			<div className="px-2 pb-2 pt-8 rounded border hover:bg-white/50 active:bg-white/80">
				{note}
				<small className="text-[50%]">{octave}</small>
			</div>
		</div>
	)
}