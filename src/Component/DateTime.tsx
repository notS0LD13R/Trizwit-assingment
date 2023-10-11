import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

import "./DateTime.scss";
import { getDateTime } from "../services/api";

export default function DateTime() {
    const [date, setDate] = useState<Date | null>(null);
    const [flipped, setFlipped] = useState(false);
    useEffect(() => {
        (async () => {
            //Just to showcase the loader :)
            await new Promise((res) => {
                setTimeout(res, 3000);
            });

            const response = new Date(await getDateTime());
            setDate(response);

            setInterval(() => {
                const currDate = response;
                currDate.setSeconds(currDate.getSeconds() + 1);
                setDate(new Date(currDate));
            }, 1000);
        })();
    }, []);

    return (
        <div className={"date-time " + (flipped && "flipped")}>
            {date ? (
                <>
                    <Circle date={date} />
                    <Square date={date} />
                </>
            ) : (
                <BarLoader />
            )}
            <button onClick={() => setFlipped(!flipped)}>FLIP</button>
        </div>
    );
}

const Circle = ({ date }: { date: Date }) => {
    const data = {
        day: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ][date.getDay()],
        date: date.toLocaleString("default", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }),
    };

    return (
        <div className="circle">
            <h1>DATE</h1>
            <span>{data.day}</span>
            <span>{data.date}</span>
        </div>
    );
};

const Square = ({ date }: { date: Date }) => {
    const data = {
        time: date.toLocaleString("default", {
            hour: "2-digit",
            minute: "numeric",
        }),
        sec: date.toLocaleString("default", {
            second: "2-digit",
        }),
    };

    return (
        <div className="square">
            <h1>TIME</h1>
            <p>{data.time}</p>
            <p>{data.sec}s</p>
        </div>
    );
};
