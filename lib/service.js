const { addDays } = require('./date');

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

module.exports = { getAllItems };
