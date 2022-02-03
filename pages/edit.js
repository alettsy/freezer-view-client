import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { itemsState, itemState } from '../atoms/itemsAtoms';

function edit() {
	const item = useRecoilValue(itemState);

	const [name, setName] = useState(item?.name ?? 'aa');

	const onChange = ({ target: { value } }) => {
		setName(value);
	};

	return (
		<div className="h-screen w-screen overflow-y-scroll bg-gray-900 p-10 text-white scrollbar-hide">
			<h2 className="pb-5 text-4xl">Edit Item</h2>
			<div className="max-w-fit">
				<form className="flex flex-col">
					<label>Name:</label>
					<input
						className="text-black"
						type="text"
						name="item_name"
						value={name}
						onChange={onChange}
					/>
					<label>Last name:</label>
					<input type="text" name="lname" />
				</form>
			</div>
		</div>
	);
}

export default edit;
