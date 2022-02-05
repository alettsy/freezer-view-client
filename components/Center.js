import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { itemsState } from '../atoms/itemsAtoms';
import Items from './Items';
import { addDays } from '../lib/date';
import { getAllItems } from '../lib/service';
import { filterState } from '../atoms/categoryAtoms';

function Center() {
	const [items, setItems] = useRecoilState(itemsState);
	const setFilterState = useSetRecoilState(filterState);

	useEffect(() => {
		getAllItems().then((result) => {
			setItems(result);
		});
	}, []);

	return (
		<div className="h-screen flex-grow overflow-y-scroll bg-gray-900 text-white scrollbar-hide">
			<header className="flex space-x-2 pt-3 pl-3">
				<div>
					<input
						type="button"
						value="New Item"
						className="w-fit cursor-pointer rounded-md bg-gray-800 px-3 py-2 font-bold hover:bg-white hover:text-gray-800"
						onClick={() => (window.location.href = '/new')}
					/>
				</div>
				<div>
					<input
						type="button"
						value="New Category"
						className="w-fit cursor-pointer rounded-md bg-gray-800 px-3 py-2 font-bold hover:bg-white hover:text-gray-800"
						onClick={() => (window.location.href = '/newcat')}
					/>
				</div>
				<div>
					<input
						type="button"
						value="Clear Filter"
						className="w-fit cursor-pointer rounded-md bg-gray-800 px-3 py-2 font-bold hover:bg-white hover:text-gray-800"
						onClick={() => setFilterState(null)}
					/>
				</div>
			</header>
			<Items />
		</div>
	);
}

export default Center;
