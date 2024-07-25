import { serverHttp } from "./http";
import "./websocket";

const port = process.env.PORT || 3333;

serverHttp.listen(port, () => console.log("🚀 Server is Running in port: ", port));
