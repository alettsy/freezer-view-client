import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { itemsState, itemState } from '../atoms/itemsAtoms';
import 'react-toastify/dist/ReactToastify.css';

function edit() {
	const [name, setName] = useState('');
	const [expiry, setExpiry] = useState(0);

	const onChange = ({ target: { value } }) => {
		setName(value);
	};

	const onExpiryChange = ({ target: { value } }) => {
		setExpiry(value);
	};

	const submit = () => {
		if (validate()) {
			const data = {
				name: name,
				expiry: expiry,
			};

			fetch('/api/new_cat', {
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
		} else if (parseInt(expiry) < 0) {
			toast.error('Expiry cannot be smaller than 1 day', {
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
					<br />
					<label>Expiry (in days):</label>
					<input
						className="rounded-md text-black"
						type="number"
						name="item_expiry"
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
