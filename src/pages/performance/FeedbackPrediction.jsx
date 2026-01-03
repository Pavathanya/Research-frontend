import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Chip,
    Avatar,
    Stack,
    Divider,
    useTheme
} from '@mui/material';
import {
    CloudUpload,
    Psychology,
    Download,
    TrendingUp,
    WarningAmber,
    CheckCircleOutline,
    AutoGraph
} from '@mui/icons-material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { PageHeader } from '../../components/common/SharedComponents';

const FeedbackPrediction = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [predictions, setPredictions] = useState([]);
    const [stats, setStats] = useState({ avgScore: 0, highRisk: 0, totalProcessed: 0 });
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleRun = () => {
        setLoading(true);
        // Simulate advanced AI processing
        setTimeout(() => {
            const mockData = [
                { id: 'E-001', name: 'Alice Johnson', dep: 'Sales', feedback: 4.5, confidence: 92, risk: 'Low' },
                { id: 'E-002', name: 'Bob Smith', dep: 'Marketing', feedback: 3.2, confidence: 85, risk: 'Medium' },
                { id: 'E-003', name: 'Charlie Davis', dep: 'Eng', feedback: 2.1, confidence: 95, risk: 'High' },
                { id: 'E-004', name: 'Diana Evans', dep: 'HR', feedback: 4.8, confidence: 88, risk: 'Low' },
                { id: 'E-005', name: 'Evan Wright', dep: 'Sales', feedback: 3.9, confidence: 78, risk: 'Medium' },
            ];

            setPredictions(mockData);
            setStats({
                avgScore: (mockData.reduce((acc, curr) => acc + curr.feedback, 0) / mockData.length).toFixed(1),
                highRisk: mockData.filter(d => d.feedback < 3).length,
                totalProcessed: mockData.length
            });
            setLoading(false);
        }, 2500);
    };

    const getScoreColor = (score) => {
        if (score >= 4) return theme.palette.success.main;
        if (score >= 3) return theme.palette.warning.main;
        return theme.palette.error.main;
    };

    return (
        <Box sx={{ pb: 5 }}>
            <PageHeader
                title="AI Feedback Prediction"
                subtitle="Predict Future Performance Scores & Retention Risks"
                action={
                    <Button
                        variant="outlined"
                        startIcon={<Download />}
                        disabled={predictions.length === 0}
                    >
                        Export Report
                    </Button>
                }
            />

            {/* Main Layout */}
            <Grid container spacing={3}>

                {/* 1. Upload Section */}
                <Grid item xs={12}>
                    <Card
                        elevation={0}
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            border: `2px dashed ${theme.palette.divider}`,
                            bgcolor: theme.palette.background.default,
                            borderRadius: 4,
                            transition: 'all 0.3s',
                            '&:hover': {
                                borderColor: theme.palette.primary.main,
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        <Stack alignItems="center" spacing={2}>
                            <Avatar sx={{ bgcolor: theme.palette.primary.light, width: 64, height: 64 }}>
                                <CloudUpload sx={{ fontSize: 32, color: theme.palette.primary.contrastText }} />
                            </Avatar>
                            <Box>
                                <Typography variant="h5" fontWeight="bold">Upload Employee Data</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Drag and drop your CSV file here, or click to browse.
                                </Typography>
                            </Box>

                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined" component="label" startIcon={<CloudUpload />}>
                                    Select CSV File
                                    <input type="file" hidden accept=".csv" onChange={handleFileChange} />
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleRun}
                                    disabled={loading || !fileName}
                                    startIcon={<Psychology />}
                                >
                                    {loading ? 'Analyzing...' : 'Run Prediction'}
                                </Button>
                            </Stack>

                            {fileName && (
                                <Typography variant="caption" color="primary" fontWeight="bold">
                                    Selected: {fileName}
                                </Typography>
                            )}
                        </Stack>
                        {loading && (
                            <Box sx={{ mt: 4, width: '50%', mx: 'auto' }}>
                                <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>Processing advanced heuristics...</Typography>
                                <LinearProgress variant="indeterminate" sx={{ borderRadius: 1, height: 8 }} />
                            </Box>
                        )}
                    </Card>
                </Grid>

                {/* 2. Results Dashboard */}
                {predictions.length > 0 && !loading && (
                    <>
                        {/* Summary Metrics */}
                        <Grid item xs={12} md={4}>
                            <Card sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">Avg Predicted Score</Typography>
                                    <Typography variant="h3" fontWeight="bold" color="primary">{stats.avgScore}</Typography>
                                </Box>
                                <AutoGraph sx={{ fontSize: 48, color: theme.palette.primary.light, opacity: 0.5 }} />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">High Risk Candidates</Typography>
                                    <Typography variant="h3" fontWeight="bold" color="error">{stats.highRisk}</Typography>
                                </Box>
                                <WarningAmber sx={{ fontSize: 48, color: theme.palette.error.light, opacity: 0.5 }} />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">Analysis Confidence</Typography>
                                    <Typography variant="h3" fontWeight="bold" color="success.main">92%</Typography>
                                </Box>
                                <CheckCircleOutline sx={{ fontSize: 48, color: theme.palette.success.light, opacity: 0.5 }} />
                            </Card>
                        </Grid>

                        {/* Chart Section */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3, height: 400, width: 400, borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">Score Distribution</Typography>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={predictions} layout="vertical" margin={{ left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                        <XAxis type="number" domain={[0, 5]} hide />
                                        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                                        <Tooltip cursor={{ fill: 'transparent' }} />
                                        <Bar dataKey="feedback" radius={[0, 10, 10, 0]} barSize={20}>
                                            {predictions.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={getScoreColor(entry.feedback)} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>

                        {/* Detailed List */}
                        <Grid item xs={12} md={6}>
                            <TableContainer component={Paper} sx={{ height: 400, borderRadius: 2 }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Employee</TableCell>
                                            <TableCell align="center">Predicted</TableCell>
                                            <TableCell align="center">Risk Level</TableCell>
                                            <TableCell align="right">Confidence</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {predictions.map((row) => (
                                            <TableRow key={row.id} hover>
                                                <TableCell component="th" scope="row">
                                                    <Box>
                                                        <Typography variant="body2" fontWeight="bold">{row.name}</Typography>
                                                        <Typography variant="caption" color="text.secondary">{row.dep}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Chip
                                                        label={row.feedback}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: getScoreColor(row.feedback),
                                                            color: '#fff',
                                                            fontWeight: 'bold',
                                                            minWidth: 50
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography
                                                        variant="caption"
                                                        fontWeight="bold"
                                                        color={row.risk === 'High' ? 'error' : row.risk === 'Medium' ? 'warning.main' : 'success.main'}
                                                    >
                                                        {row.risk.toUpperCase()}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2" color="text.secondary">
                                                        {row.confidence}%
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    );
};

export default FeedbackPrediction;
