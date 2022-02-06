import { TrashIcon } from '@heroicons/react/outline';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sortedItemsState, itemsState, sortState } from '../atoms/itemsAtoms';
import Item from './Item';

function Items() {
	const items = useRecoilValue(itemsState);
	const [sort, setSort] = useRecoilState(sortState);
	const sortedList = useRecoilState(sortedItemsState);

	return (
		<div className="sm:px-4 md:px-8">
			<header className="py-4">
				<div className="ml-auto flex items-center justify-between pr-[2.25rem] pl-4 font-bold md:ml-0 md:pl-10">
					<p onClick={() => setSort('ID')} className="w-10 cursor-pointer">
						ID
					</p>
					<p onClick={() => setSort('name')} className="w-40 cursor-pointer">
						Name
					</p>
					<p
						onClick={() => setSort('category')}
						className="w-40 cursor-pointer pl-1"
					>
						Category
					</p>
					<p
						onClick={() => setSort('count')}
						className="hidden w-10 cursor-pointer pl-1 sm:inline"
					>
						Count
					</p>
					<p
						onClick={() => setSort('expiry')}
						className="w-[6rem] cursor-pointer pl-3"
					>
						Expiry
					</p>
				</div>
			</header>
			<hr className="md:mx-2" />
			<div>
				<div className="flex flex-col space-y-1">
					{sortedList[0].map((item) => (
						<Item key={item._id} item={item} />
					))}
				</div>
			</div>
		</div>
	);
}

export default Items;
