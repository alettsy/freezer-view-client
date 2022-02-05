export default async function handler(req, res) {
	const response = await fetch('http://192.168.1.193:3001/api/categories/all');
	const json = await response.json();

	res.status(200).send(json);
}
