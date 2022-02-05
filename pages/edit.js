import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { itemsState, itemState } from '../atoms/itemsAtoms';
import 'react-toastify/dist/ReactToastify.css';

function edit() {
	const item = useRecoilValue(itemState);

	const [name, setName] = useState(item?.name ?? '');
	const [category, setCategory] = useState(item?.category ?? 'None');
	const [expiry, setExpiry] = useState(item?.expiry ?? Date.now());

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetch('/api/all_cats')
			.then((response) => response.json())
			.then((data) => {
				setCategories(data);
			});
	}, []);

	const onChange = ({ target: { value } }) => {
		setName(value);
	};

	const onExpiryChange = ({ target: { value } }) => {
		setExpiry(value);
	};

	const onCategoryChange = ({ target: { value } }) => {
		setCategory(value);
	};

	const submit = () => {
		const data = {
			_id: item._id,
			name: name,
			category: category,
			expiry: expiry,
		};

		console.log(expiry);

		fetch('/api/update_item', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		// TODO: add validation and user feedback before send request
		// TODO: if success, redirect to /, otherwise display toast error
		toast.success('Updated item successfully', {
			position: 'bottom-center',
			hideProgressBar: true,
		});
	};

	return (
		<div className="h-screen w-screen overflow-y-scroll bg-gray-900 p-10 text-white scrollbar-hide">
			<h2 className="pb-5 text-4xl">Edit Item</h2>
			<div className="max-w-fit">
				<form className="flex flex-col">
					<label>Name:</label>
					<input
						className="rounded-md text-black"
						type="text"
						name="item_name"
						value={name}
						onChange={onChange}
					/>
					<label>Category:</label>
					<select
						className="rounded-md text-black"
						type="select"
						name="catgory_name"
						value={category}
						onChange={onCategoryChange}
					>
						{categories.map((cat, i) => (
							<option key={i} value={cat.name}>
								{cat.name}
							</option>
						))}
					</select>
					<label>Expiry:</label>
					<input
						className="rounded-md text-black"
						type="date"
						name="expiry_date"
						value={expiry}
						onChange={onExpiryChange}
					/>
					<br />
					<input
						type="button"
						value="Done"
						className="w-fit cursor-pointer rounded-md bg-gray-800 px-3 py-2 font-bold hover:bg-white hover:text-gray-800"
						onClick={submit}
					/>
				</form>
			</div>

			<ToastContainer />
		</div>
	);
}

export default edit;
