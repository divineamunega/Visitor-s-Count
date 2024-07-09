import express from "express";

const app = express();

app.get("/api/:url", async (req, res, next) => {
	const request = await fetch(
		"https://api.jsonbin.io/v3/b/668d2d8ae41b4d34e40f5c71"
	);
	const respose = await request.json();
	const idArr = respose.record;
	console.log(idArr);
	const url = req.params.url;
	const obj = idArr.filter((obj) => obj.id === url);

	if (!obj.length) {
		const put = await fetch(
			"https://api.jsonbin.io/v3/b/668d2d8ae41b4d34e40f5c71",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: url, count: 1 }),
			}
		);

		const putJSon = await put.json();
		console.log(putJSon);
		res.status(200).json({
			id: putJSon.record.id,
			count: putJSon.record.count,
		});

		return;
	}

	// TODO
	const highestObj = obj.reduce(
		(acc, curr, _, arr) => {
			if (acc.count > curr.count) {
				return acc;
			} else {
				return curr;
			}
		},
		{ count: 0 }
	);

	highestObj.count += 1;

	const put = await fetch(
		"https://api.jsonbin.io/v3/b/668d2d8ae41b4d34e40f5c71",
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(highestObj),
		}
	);

	const putJSon = await put.json();
	res.status(200).json({
		id: putJSon.record.id,
		count: putJSon.record.count,
	});

	return 0;
});

app.use("*", (req, res, next) => {
	res.status(404).json({
		message: "Invalid Operator",
	});
});

export default app;
