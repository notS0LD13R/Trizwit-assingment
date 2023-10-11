import axios from "axios";
import routes from "./routes";

export const getDateTime = async () => {
    return (await axios.get(routes.date_time)).data.datetime;
};
