import { useEffect, useState } from "react"
import { Pie, PieChart } from 'recharts';
import './EnergyMix.css'

interface DayAverage {
  name: string;
  avg: number;
}

interface ApiResponse {
    averages: {
        today: DayAverage[]
        tomorrow: DayAverage[]
        dayAfter: DayAverage[]
    }
    pure: {
        todayPure: number
        tomorrowPure: number
        dayAfterPure: number
    }
}

function RenderEnergyMix() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<ApiResponse>()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/endpoint1");

            if (!response.ok) {
                console.log("Error fetching data");
            } else {
                const info = await response.json();
                setData(info);

                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {loading === false && data && (
                <>
                    <div>
                        <div className="day">Today</div>
                        <PieChart
                            style={{ width: '25vw', height: '100%', maxWidth: '800px', maxHeight: '800px', aspectRatio: 1 }}
                            responsive
                        >
                            <Pie
                                data={data.averages.today.map((d) => ({
                                    name: d.name,
                                    value: d.avg,
                                }))}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius="50%"
                                fill="#8884d8"
                                label={({ name, percent }) => `${name} ${(percent! * 100).toFixed(0)}%`}
                            />
                        </PieChart>
                        <div className="pureEnergy">Pure energy percentage:</div>
                        <div className="percentage">{Math.floor(data.pure.todayPure)}%</div>
                    </div>
                    <div>
                        <div className="day">Tomorrow</div>
                        <PieChart
                            style={{ width: '25vw', height: '100%', maxWidth: '800px', maxHeight: '800px', aspectRatio: 1 }}
                            responsive
                        >
                            <Pie
                                data={data.averages.tomorrow.map((d) => ({
                                    name: d.name,
                                    value: d.avg,
                                }))}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius="50%"
                                fill="#8884d8"
                                label={({ name, percent }) => `${name} ${(percent! * 100).toFixed(0)}%`}
                            />
                        </PieChart>
                        <div className="pureEnergy">Pure energy percentage:</div>
                        <div className="percentage">{Math.floor(data.pure.tomorrowPure)}%</div>
                    </div>
                    <div>
                        <div className="day">Day After</div>
                        <PieChart
                            style={{ width: '25vw', height: '100%', maxWidth: '800px', maxHeight: '800px', aspectRatio: 1 }}
                            responsive
                        >
                            <Pie
                                data={data.averages.dayAfter.map((d) => ({
                                    name: d.name,
                                    value: d.avg,
                                }))}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius="50%"
                                fill="#8884d8"
                                label={({ name, percent }) => `${name} ${(percent! * 100).toFixed(0)}%`}
                            />
                        </PieChart>
                        <div className="pureEnergy">Pure energy percentage:</div>
                        <div className="percentage">{Math.floor(data.pure.dayAfterPure)}%</div>
                    </div>
                </>
            )}
        </>
    )
}

export default RenderEnergyMix