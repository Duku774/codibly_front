import { useState } from "react"
import "./OptimalCharge.css"

interface ApiResponse {
    from: string;
    to: string;
    avgPure: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function RenderOptimalCharge() {
    const [hours, setHours] = useState(1)
    const [data, setData] = useState<ApiResponse>()
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/endpoint2?hours=${hours}`);

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`)
            }  
            
            const info = await response.json();
            setData(info);
            
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false);
        }       
    };

    return(
        <>
            <div style={{width: "25vw"}}>
                <div className="header" style={{display: "flex", justifyContent: "center"}}>
                    How long would you like to charge?
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <button onClick={() => {setHours(Math.max(hours - 1, 1))}} disabled={hours <= 1}>-</button>
                    <div style={{display: "flex", width: "3vw", textAlign: "center", alignItems: "center", justifyContent: "center", fontSize: "Large"}}>{hours}</div>
                    <button onClick={() => {setHours(Math.min(hours + 1, 6))}} disabled={hours >= 6}>+</button>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <button onClick={() => {fetchData(); setLoading(true)}}>Calculate</button>
                </div>
                {loading ? (
                    <div className="results" style={{paddingTop: "2vh", fontWeight: "700", fontSize: "Large"}}>
                        <div>Calculating...</div>
                    </div>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </>
    )
}

export default RenderOptimalCharge