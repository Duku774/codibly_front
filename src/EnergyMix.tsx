import { useEffect, useState } from "react"
import { Cell, Pie, PieChart } from 'recharts';
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

const COLORS = [
    "#E09F3E",
    "#4A4A4A",
    "#7FB069",
    "#4FBDBA",
    "#3A86A8",
    "#8D6CAB",
    "#9AA0A6",
    "#6EC5E9",
    "#F4D35E",
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function RenderEnergyMix() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<ApiResponse>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/endpoint1`);

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`)
                }

                const info = await response.json();
                setData(info);
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {loading && (
                <div>
                    Fetching data...
                </div>
            )}
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
                            >
                                {data.averages.today.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
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
                            >
                                {data.averages.today.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
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
                            >
                                {data.averages.today.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
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