import fs from "fs";
import express from "express";

const app = express();

const jsonStr = fs.readFileSync("./data.json", { encoding: "utf-8" });
const idArr = JSON.parse(jsonStr);

app.get("/api/:url", (req, res, next) => {
	const url = req.params.url;
	const obj = idArr.find((obj) => obj.id === url);
	if (!obj) {
		idArr.push({
			id: url,
			count: 1,
		});

		fs.writeFileSync("./data.json", JSON.stringify(idArr));

		res.status(200).json({
			id: url,
			count: 1,
		});
	}

	obj.count += 1;
	fs.writeFileSync("./data.json", JSON.stringify(idArr));
	res.status(200).json({
		...obj,
	});
});

app.use("*", (req, res, next) => {
	res.status(404).json({
		message: "Invalid Operator",
	});
});

export default app;
