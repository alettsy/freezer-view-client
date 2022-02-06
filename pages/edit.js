import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { itemsState, itemState } from '../atoms/itemsAtoms';
import 'react-toastify/dist/ReactToastify.css';

function edit() {
	const item = useRecoilValue(itemState);

	const [name, setName] = useState(item?.name ?? '');
	const [category, setCategory] = useState(item?.category ?? 'None');
	const [expiry, setExpiry] = useState('');
	const [count, setCount] = useState(item?.count ?? 1);

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetch('/api/all_cats')
			.then((response) => response.json())
			.then((data) => {
				setCategories(data);
			});
	}, []);

	useEffect(() => {
		if (item.expiry || item.expiry === '') {
			setExpiry(item.expiry);
		} else {
			const todayDate = new Date().toISOString().slice(0, 10);
			setExpiry(todayDate);
		}
	}, []);

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
				window.location.href = '/';
			});
	};

	const onChange = ({ target: { value } }) => {
		setName(value);
	};

	const onExpiryChange = ({ target: { value } }) => {
		setExpiry(value);
	};

	const onCategoryChange = ({ target: { value } }) => {
		setCategory(value);
	};

	const onCountChange = ({ target: { value } }) => {
		setCount(value);
	};

	const submit = () => {
		if (validate()) {
			const data = {
				_id: item._id,
				name: name,
				category: category,
				expiry: expiry,
				count: count,
			};

			fetch('/api/update_item', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			}).then(() => {
				window.location.href = '/';
			});
		}
	};

	const validate = function () {
		if (name === '') {
			toast.error('Name cannot be empty', {
				position: 'bottom-center',
				hideProgressBar: true,
			});
			return false;
		} else if (Date.now() > Date.parse(expiry)) {
			toast.error('Date cannot be in the past', {
				position: 'bottom-center',
				hideProgressBar: true,
			});
			return false;
		} else if (count < 1) {
			toast.error('Count cannot be zero or negative', {
				position: 'bottom-center',
				hideProgressBar: true,
			});
			return false;
		}

		return true;
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
					<label>Count:</label>
					<input
						className="rounded-md text-black"
						type="number"
						min="1"
						name="item_count"
						value={count}
						onChange={onCountChange}
					/>
					<label>Expiry:</label>
					<input
						className="rounded-md text-black"
						type="date"
						name="expiry_date"
						value={expiry}
						onChange={onExpiryChange}
					/>
					<br />
					<div className="flex space-x-2">
						<input
							type="button"
							value="Done"
							className="w-fit cursor-pointer rounded-md bg-gray-800 px-3 py-2 font-bold hover:bg-white hover:text-gray-800"
							onClick={submit}
						/>
						<input
							type="button"
							value="Delete"
							className="w-fit cursor-pointer rounded-md bg-red-800 px-3 py-2 font-bold hover:bg-white hover:text-gray-800"
							onClick={deleteItem}
						/>
					</div>
				</form>
			</div>

			<ToastContainer />
		</div>
	);
}

export default edit;
