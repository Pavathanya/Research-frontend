import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Grid, Button, Chip, Divider, Alert, MenuItem, TextField } from '@mui/material';
import { CheckCircle, Close, Save } from '@mui/icons-material';
import { PageHeader, StatCard } from '../../components/common/SharedComponents';

const EvaluationReport = () => {
    const { candidateId } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('Hire');
    const [notes, setNotes] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleDecision = () => {
        setSubmitted(true);
        // Simulate API call
        setTimeout(() => {
            navigate('/recruitment/shortlist');
        }, 2000);
    };

    return (
        <Box>
            <PageHeader title="Evaluation Report" subtitle={`Comprehensive Analysis for ${candidateId}`} />

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>AI Summary</Typography>
                            <Alert severity="success" sx={{ mb: 2 }}>
                                <strong>High Confidence Match:</strong> The candidate demonstrated strong technical depth and clear communication.
                            </Alert>
                            <Typography paragraph>
                                The candidate answered 3/3 questions with high relevance. Sentiment analysis indicates confidence and positivity.
                                Technical accuracy was rated 88%. Behavioral fit is 92%.
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="h6" gutterBottom>Detailed Scoring</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={4}><StatCard title="Tech Score" value="88%" trend={0} /></Grid>
                                <Grid item xs={4}><StatCard title="Soft Skills" value="92%" trend={2} /></Grid>
                                <Grid item xs={4}><StatCard title="Culture Fit" value="90%" trend={0} /></Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Hiring Decision</Typography>

                            <TextField
                                select
                                fullWidth
                                label="Recommendation"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                sx={{ mb: 2 }}
                            >
                                <MenuItem value="Hire">Strong Hire</MenuItem>
                                <MenuItem value="Hold">Hold / Waitlist</MenuItem>
                                <MenuItem value="Reject">Reject</MenuItem>
                            </TextField>

                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Hiring Manager Notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                sx={{ mb: 3 }}
                            />

                            {!submitted ? (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Save />}
                                    onClick={handleDecision}
                                >
                                    Submit Decision
                                </Button>
                            ) : (
                                <Alert severity="success">Decision Recorded!</Alert>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EvaluationReport;
