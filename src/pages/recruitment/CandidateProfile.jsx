import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Grid, Button, Chip, Divider, LinearProgress } from '@mui/material';
import { CheckCircle, Cancel, ArrowBack } from '@mui/icons-material';
import { mockCandidates } from '../../data/mockCandidates';
import { PageHeader, StatusChip } from '../../components/common/SharedComponents';

const CandidateProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const candidate = mockCandidates.find(c => c.id === id) || mockCandidates[0]; // Fallback for demo
    const [status, setStatus] = useState(candidate.status);

    const handleAction = (newStatus) => {
        setStatus(newStatus);
        // In a real app, update store/backend
    };

    return (
        <Box>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
            <PageHeader
                title={candidate.name}
                subtitle={`For ${candidate.role}`}
                action={<StatusChip status={status} />}
            />

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Profile Details</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography color="textSecondary">Email</Typography>
                                    <Typography>{candidate.email}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography color="textSecondary">Phone</Typography>
                                    <Typography>{candidate.phone}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography color="textSecondary">Education</Typography>
                                    <Typography>{candidate.education}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography color="textSecondary">Experience</Typography>
                                    <Typography>{candidate.experience} Years</Typography>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            <Typography variant="h6" gutterBottom>Skills Analysis</Typography>
                            <Box sx={{ mb: 2 }}>
                                {candidate.skills.map(s => (
                                    <Chip key={s} label={s} sx={{ mr: 1, mb: 1 }} color="primary" variant="outlined" />
                                ))}
                            </Box>

                            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>AI Match Explanation</Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                The candidate shows a strong match ({candidate.matchScore}%) for the {candidate.role} position.
                                Their experience in {candidate.skills[0]} aligns well with job requirements.
                                Education background is relevant.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Match Score</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography variant="h3" color="primary">{candidate.matchScore}</Typography>
                                <Typography variant="h5" color="textSecondary">/100</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={candidate.matchScore} sx={{ height: 10, borderRadius: 5 }} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Actions</Typography>
                            <Button
                                fullWidth
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircle />}
                                onClick={() => handleAction('Interviewing')}
                                sx={{ mb: 2 }}
                            >
                                Move to Interview
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                startIcon={<Cancel />}
                                onClick={() => handleAction('Rejected')}
                            >
                                Reject Candidate
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CandidateProfile;
