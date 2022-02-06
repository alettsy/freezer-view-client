import { useRecoilState, useSetRecoilState } from 'recoil';
import { itemsState, itemState } from '../atoms/itemsAtoms';
import { addDays } from '../lib/date';
import { TrashIcon } from '@heroicons/react/outline';
import { getAllItems } from '../lib/service';

function Item({ item }) {
	const setSelectedItem = useSetRecoilState(itemState);
	const setItems = useSetRecoilState(itemsState);

	const onTap = function () {
		setSelectedItem(item);
		window.location.href = '/edit';
	};

	const deleteItem = function () {
		const x = {
			_id: item._id,
		};
		fetch('/api/delete_item', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(x),
		})
			.then((response) => response.json())
			.then((data) => {
				getAllItems().then((result) => {
					setItems(result);
				});
			});
	};

	return (
		<div
			className={`cursor-pointer rounded-lg px-5 py-4 hover:bg-gray-800 md:pl-10 ${
				item.isExpired ? 'bg-red-500' : ''
			} ${item.isNearlyExpired ? 'bg-yellow-400' : ''}`}
		>
			<div className="ml-auto flex items-center justify-between md:ml-0">
				<div
					className="ml-auto flex w-screen items-center justify-between md:ml-0"
					onClick={() => onTap()}
				>
					<p className="w-10">{item._id}</p>
					<p className="w-40">{item.name}</p>
					<p className="w-40">{item.category}</p>
					<p className="hidden w-10 sm:inline">{item?.count ?? 1}</p>
					<p className="w-[6rem]">
						{item.expiry === '' ? 'No Expiry' : item.expiry}
					</p>
				</div>
			</div>
		</div>
	);
}

export default Item;
