import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function StatCard({ average }) {
  return (
    <div>
      <Box className="rounded shadow-sm" sx={{ maxWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h10" color="text.secondary" gutterBottom>
              {average.name} score
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
