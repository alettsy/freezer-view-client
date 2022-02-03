import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState } from '../atoms/itemsAtoms';
import Items from './Items';
import { addDays } from '../lib/date';
import { getAllItems } from '../lib/service';

function Center() {
	const [items, setItems] = useRecoilState(itemsState);

	useEffect(() => {
		getAllItems().then((result) => {
			setItems(result);
		});
	}, []);

	return (
		<div className="h-screen flex-grow overflow-y-scroll bg-gray-900 text-white scrollbar-hide">
			<Items />
		</div>
	);
}

export default Center;
