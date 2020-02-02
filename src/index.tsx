import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";
import "./main.css";
import "./names.css";

type FrmElm = React.FormEvent<HTMLFormElement>;

interface IName {
	text: string;
}

export default function App(): JSX.Element {
	const [value, setValue] = useState<string>("");
	const [names, setNames] = useState<IName[]>([]);
	const [repeatName, setRepeatName] = useState<string>("");

	const handleSubmit = (e: FrmElm): void => {
		e.preventDefault();
		addName(value);
		setValue("");
	};

	const addName = (text: string): void => {
		const newNames: IName[] = [...names, { text }];
		setNames(newNames);
	};

	const removeName = (index: number): void => {
		const newNames: IName[] = [...names];
		newNames.splice(index, 1);
		setNames(newNames);
	};

	function drawName(): void {
		var flag: boolean = true;
		while (flag) {
			var ran: string =
				names[Math.floor(Math.random() * names.length)].text;
			if (repeatName === ran) {
			} else {
				Swal.fire(ran + ", is the winner!");
				setRepeatName(ran);
				flag = false;
			}
		}
	}

	return (
		<Fragment>
			<div>
				<h1>Twister-ball</h1>
				<p>Type a name to add or click to remove it.</p>
				<div className="wi">
					<button className="winButton" onClick={drawName}>
						Draw Now
					</button>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							value={value}
							onChange={e => setValue(e.target.value)}
							required
						/>
						<button type="submit">Add Name</button>
					</form>
				</div>
				<section>
					{names.map((todo: IName, index: number) => (
						<div
							className="namelist"
							key={index}
							onClick={(): void => removeName(index)}
						>
							{" "}
							{todo.text}
						</div>
					))}
				</section>
			</div>
		</Fragment>
	);
}

const root = document.getElementById("app-root");

ReactDOM.render(<App />, root);
