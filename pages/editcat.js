import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { itemsState, itemState } from '../atoms/itemsAtoms';
import 'react-toastify/dist/ReactToastify.css';
import { categoryState } from '../atoms/categoryAtoms';

function edit() {
	const category = useRecoilValue(categoryState);

	const [name, setName] = useState(category?.name ?? 'None');
	const [expiry, setExpiry] = useState(category?.expiry ?? 0);

	const onChange = ({ target: { value } }) => {
		setName(value);
	};

	const onExpiryChange = ({ target: { value } }) => {
		setExpiry(value);
	};

	const deleteCategory = function () {
		if (category.name === 'None') {
			toast.error('Cannot delete the default category', {
				position: 'bottom-center',
				hideProgressBar: true,
			});
			return;
		}

		const x = {
			name: name,
		};

		fetch('/api/delete_cat', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(x),
		})
			.then((response) => response.json())
			.then((data) => {
				window.location.href = '/';
			});
	};

	const submit = () => {
		if (validate()) {
			const data = {
				_id: category._id,
				name: name,
				expiry: expiry,
			};

			fetch('/api/update_cat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})
				.then((response) => response.json())
				.then((body) => {
					if (body.error) {
						toast.error(body.error, {
							position: 'bottom-center',
							hideProgressBar: true,
						});
					} else {
						window.location.href = '/';
					}
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
		} else if (category.name === 'None') {
			toast.error('Cannot overwrite the default category', {
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
							onClick={deleteCategory}
						/>
					</div>
				</form>
			</div>

			<ToastContainer />
		</div>
	);
}

export default edit;
