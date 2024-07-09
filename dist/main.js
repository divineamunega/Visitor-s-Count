import {Buffer as $kVpQf$Buffer} from "buffer";
import $kVpQf$fs from "fs";
import $kVpQf$express from "express";




var $5ef8cbb8c4725867$require$Buffer = $kVpQf$Buffer;
const $5ef8cbb8c4725867$var$app = (0, $kVpQf$express)();
const $5ef8cbb8c4725867$var$jsonStr = $5ef8cbb8c4725867$require$Buffer.from("W3siaWQiOiJpIn0seyJpZCI6IjEiLCJjb3VudCI6NH0seyJpZCI6IjQ0IiwiY291bnQiOjF9XQ==", "base64");
const $5ef8cbb8c4725867$var$idArr = JSON.parse($5ef8cbb8c4725867$var$jsonStr);
$5ef8cbb8c4725867$var$app.get("/api/:url", (req, res, next)=>{
    const url = req.params.url;
    const obj = $5ef8cbb8c4725867$var$idArr.find((obj)=>obj.id === url);
    if (!obj) {
        $5ef8cbb8c4725867$var$idArr.push({
            id: url,
            count: 1
        });
        (0, $kVpQf$fs).writeFileSync("./data.json", JSON.stringify($5ef8cbb8c4725867$var$idArr));
        res.status(200).json({
            id: url,
            count: 1
        });
    }
    obj.count += 1;
    (0, $kVpQf$fs).writeFileSync("./data.json", JSON.stringify($5ef8cbb8c4725867$var$idArr));
    res.status(200).json({
        ...obj
    });
});
$5ef8cbb8c4725867$var$app.use("*", (req, res, next)=>{
    res.status(404).json({
        message: "Invalid Operator"
    });
});
var $5ef8cbb8c4725867$export$2e2bcd8739ae039 = $5ef8cbb8c4725867$var$app;


const $6a767cd48bfac32e$var$PORT = 3000;
(0, $5ef8cbb8c4725867$export$2e2bcd8739ae039).listen($6a767cd48bfac32e$var$PORT, ()=>{
    console.log(`Server running on port ${$6a767cd48bfac32e$var$PORT}`);
});


//# sourceMappingURL=main.js.map
