import { useEffect, useState } from "react"
import { Pie, PieChart } from 'recharts';

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
                        Today
                        <PieChart
                            style={{ width: '400px', height: '100%', maxWidth: '800px', maxHeight: '800px', aspectRatio: 1 }}
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
                        Pure energy percentage: {Math.floor(data.pure.todayPure)}%
                    </div>
                    <div>
                        Tomorrow
                        <PieChart
                            style={{ width: '400px', height: '100%', maxWidth: '800px', maxHeight: '800px', aspectRatio: 1 }}
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
                        Pure energy percentage: {Math.floor(data.pure.tomorrowPure)}%
                    </div>
                    <div>
                        Day After
                        <PieChart
                            style={{ width: '400px', height: '100%', maxWidth: '800px', maxHeight: '800px', aspectRatio: 1 }}
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
                        Pure energy percentage: {Math.floor(data.pure.dayAfterPure)}%
                    </div>
                </>
            )}
        </>
    )
}

export default RenderEnergyMix