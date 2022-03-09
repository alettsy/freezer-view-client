export default async function handler(req, res) {
	const response = await fetch('http://localhost:3001/api/items/all');
	const json = await response.json();

	res.status(200).send(json);
}
