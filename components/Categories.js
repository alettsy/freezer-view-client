import { PencilIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { categoryState, filterState } from '../atoms/categoryAtoms';
import { getAllCategories } from '../lib/service';
import { compare } from '../lib/sort';

function Categories() {
	const setCategory = useSetRecoilState(categoryState);
	const setFilterState = useSetRecoilState(filterState);

	const [categories, setCategories] = useState([]);

	const _updateTimer = null;

	useEffect(() => {
		_getCategories();
		_update();
	}, []);

	const _getCategories = function () {
		getAllCategories().then((data) => setCategories(data));
	};

	const _update = function () {
		_updateTimer = setTimeout(() => {
			_getCategories();
			_update();
		}, 1000);
	};

	const editCategory = function (cat) {
		setCategory(cat);
		window.location.href = '/editcat';
	};

	return (
		<div>
			<h2 className="pb-1 font-bold">Categories</h2>
			<hr className="pb-1" />
			{categories.map((category, i) => (
				<div key={i} className="flex items-center space-x-1">
					<div
						className="cursor-pointer hover:text-gray-900"
						onClick={() => editCategory(category)}
					>
						<PencilIcon className="h-3 w-3" />
					</div>
					<div
						onClick={() => setFilterState(category.name)}
						className="cursor-pointer truncate hover:text-gray-900 sm:w-[5rem] md:w-[8rem]"
					>
						{category.name}
					</div>
				</div>
			))}
		</div>
	);
}

export default Categories;
