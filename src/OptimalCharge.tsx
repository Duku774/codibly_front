import { useState } from "react"
import "./OptimalCharge.css"

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
            <div style={{width: "25vw"}}>
                <div className="header" style={{display: "flex", justifyContent: "center"}}>
                    How long would you like to charge?
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <button onClick={() => {setHours(Math.max(hours - 1, 1))}}>-</button>
                    <div style={{display: "flex", width: "3vw", textAlign: "center", alignItems: "center", justifyContent: "center"}}>{hours}</div>
                    <button onClick={() => {setHours(Math.min(hours + 1, 6))}}>+</button>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <button onClick={fetchData}>Calculate</button>
                </div>
                {data && (
                    <>
                        <div className="results" style={{paddingTop: "2vh", fontWeight: "700", fontSize: "Large"}}>
                            <div>Results:</div>
                        </div>
                        <div className="results">
                            <div style={{fontWeight: "700"}}>Optimal charge start date:</div>
                            <div>{new Date(data.from).toLocaleString()}</div>
                            
                        </div>
                        <div className="results">
                            <div style={{fontWeight: "700"}}>Optimal charge end date:</div>
                            <div>{new Date(data.to).toLocaleString()}</div>
                        </div>
                        <div className="results">
                            <div style={{fontWeight: "700"}}>Average percentage of pure energy during charging:</div>
                            <div>{Math.floor(data.avgPure)}%</div>                        
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default RenderOptimalCharge