import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { borderRight } from '@mui/system';

function StatCard({ average }) {
  return (
    <div>
      <Box className="rounded shadow-sm" sx={{ width: 275, mr: 6 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h10" color="text.secondary" gutterBottom>
              <strong className="text-blue-500">{average.name} score </strong>
            </Typography>
            <Typography variant="h5" component="div">
              {average.avg}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              30 day average
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default StatCard;
