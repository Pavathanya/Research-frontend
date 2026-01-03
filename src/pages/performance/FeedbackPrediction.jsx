import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CloudUpload, Psychology, Download } from '@mui/icons-material';
import { PageHeader } from '../../components/common/SharedComponents';

const FeedbackPrediction = () => {
    const [loading, setLoading] = useState(false);
    const [predictions, setPredictions] = useState([]);

    const handleRun = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setPredictions([
                { id: 'E-001', feedback: 4.5, confidence: 92 },
                { id: 'E-002', feedback: 3.2, confidence: 85 },
                { id: 'E-003', feedback: 2.1, confidence: 95 },
                { id: 'E-004', feedback: 4.8, confidence: 88 },
            ]);
        }, 2500);
    };

    return (
        <Box>
            <PageHeader
                title="AI Feedback Prediction"
                subtitle="Predict Future Performance Scores"
                action={<Button variant="contained" startIcon={<Download />}>Export History</Button>}
            />

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                    <Card sx={{ p: 4, textAlign: 'center', borderStyle: 'dashed', borderWidth: 2, borderColor: '#ccc' }}>
                        <CloudUpload sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>Upload Employee Data (CSV)</Typography>
                        <Button variant="contained" component="label">
                            Select File
                            <input hidden type="file" />
                        </Button>
                    </Card>
                </Grid>
            </Grid>

            {predictions.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        startIcon={<Psychology />}
                        onClick={handleRun}
                        disabled={loading}
                    >
                        {loading ? 'Running AI Model...' : 'Run Prediction Model'}
                    </Button>
                    {loading && <LinearProgress sx={{ mt: 2, maxWidth: 400, mx: 'auto' }} />}
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Employee ID</TableCell>
                                <TableCell>Predicted Feedback</TableCell>
                                <TableCell>Model Confidence</TableCell>
                                <TableCell>Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {predictions.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>
                                        <Typography fontWeight="bold" color={row.feedback < 3 ? 'error' : 'success.main'}>
                                            {row.feedback} / 5.0
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{row.confidence}%</TableCell>
                                    <TableCell>{new Date().toLocaleTimeString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};
import { Grid } from '@mui/material'; // Forgot import
export default FeedbackPrediction;
