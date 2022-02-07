const { addDays } = require('./date');
const { compare } = require('./sort');

const getAllItems = async function () {
	const response = await fetch('/api/all_items');
	const items = await response.json();

	items.forEach((item) => {
		item.isExpired = Date.now() > Date.parse(item.expiry);
		item.isNearlyExpired =
			Date.now() < Date.parse(item.expiry) &&
			Date.now() > addDays(Date.parse(item.expiry), -7);
	});

	return items;
};

const getAllCategories = async function () {
	const response = await fetch('/api/all_cats');
	const cats = await response.json();

	const items = cats.sort((a, b) => compare('name', a, b));

	return items;
};

module.exports = { getAllItems, getAllCategories };
