import { useSetRecoilState } from 'recoil';
import { itemState } from '../atoms/itemsAtoms';

function Item({ item }) {
	const setSelectedItem = useSetRecoilState(itemState);

	const onTap = function () {
		setSelectedItem(item);
		window.location.href = '/edit';
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
