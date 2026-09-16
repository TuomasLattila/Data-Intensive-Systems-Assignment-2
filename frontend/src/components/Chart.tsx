import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';


export default function Chart({ xData, yData }: { xData: string[], yData: number[] }) {

  return (
    <Box sx={{ width: '100%', maxWidth: 700, backgroundColor: '#ffffff', borderRadius: 2}}>
      <LineChart 
        xAxis={[{ 
          id: 'dates',
          data: xData, 
          scaleType: 'point' 
        }]}

        yAxis={[{ id: 'weights', scaleType: 'linear' as const, position: 'left' as const }]}

        series={[{ 
          id: 'weight-series', 
          yAxisId: 'weights', 
          data: yData, 
          label: 'Weight (kg)',
            showMark: true 
          }]}

        height={400}
      />
    </Box>
  );
}