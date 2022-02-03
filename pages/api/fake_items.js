const data = {
	items: [
		{
			id: '1',
			name: 'Pizza',
			category: 'Ready Meal',
			expiry: '2022-11-31',
		},
		{
			id: '2',
			name: 'Pork',
			category: 'Meat',
			expiry: '2022-05-11',
		},
		{
			id: '3',
			name: 'Orange',
			category: 'Fruit',
			expiry: '2021-02-14',
		},
		{
			id: '4',
			name: 'Potato',
			category: 'Vegetable',
			expiry: '2022-02-02',
		},
		{
			id: '5',
			name: 'Chicken',
			category: 'Meat',
			expiry: '2022-06-17',
		},
	],
};

export default function handler(req, res) {
	res.status(200).json(data);
}
