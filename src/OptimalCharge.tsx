import { useState } from "react"

interface ApiResponse {
    from: string;
    to: string;
    avgPure: number;
}

function RenderOptimalCharge() {
    const [hours, setHours] = useState(1)
    const [data, setData] = useState<ApiResponse>()

    const fetchData = async () => {
        const response = await fetch(`http://localhost:3000/endpoint2?hours=${hours}`);

        if (!response.ok) {
            console.log("Error fetching data");
        } else {
            const info = await response.json();
            setData(info);
        }
    };

    return(
        <>
            <div>
                <button onClick={() => {setHours(Math.max(hours - 1, 1))}}>-</button>
                <div>{hours}</div>
                <button onClick={() => {setHours(Math.min(hours + 1, 6))}}>+</button>
                <button onClick={fetchData}>Calculate</button>
                {data && (
                    <>
                    <div>{data.from}</div>
                    <div>{data.to}</div>
                    <div>{Math.floor(data.avgPure)}%</div>
                    </>
                )}
            </div>
        </>
    )
}

export default RenderOptimalCharge