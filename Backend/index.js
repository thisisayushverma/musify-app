import app from "./app.js";
import connDb from "./db/db.js";
import fs from "fs";

const PORT = process.env.PORT || 3000;

connDb()
.then(()=>{
    app.listen(PORT, () => {
        console.log("server is running on port 3000");
    })
})
.catch(err => {
    console.log(err);
    process.exit(1);
})
