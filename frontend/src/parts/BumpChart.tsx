import { ResponsiveBump } from "@nivo/bump";

const BumpChart = ({data}) => {
    return (
        <ResponsiveBump
            data={data}
            colors={{ scheme: 'category10' }}
            lineWidth={3}
            activeLineWidth={6}
            inactiveLineWidth={3}
            inactiveOpacity={0.15}
            pointSize={5}
            activePointSize={16}
            inactivePointSize={0}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor={{ from: 'serie.color' }}
            axisTop={{
                tickSize: 1,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -36
            }}
            axisBottom={null}
            axisLeft={{
                tickSize: 1,
                tickPadding: 5,
                tickRotation: 0,
                legend: null,
                legendPosition: 'middle',
                legendOffset: -40
            }}
            margin={{ top: 40, right: 140, bottom: 40, left: 30 }}
            axisRight={null}
            startLabel={true}
            endLabel={true}
            enableGridX={true}
            enableGridY={false}
            animate={false}
        />
    )
}

export default BumpChart;