import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, TextField, Button, Grid, Chip, LinearProgress, CircularProgress } from '@mui/material';
import { Timer, AutoAwesome, NavigateNext, Stop } from '@mui/icons-material';
import { PageHeader } from '../../components/common/SharedComponents';

const questions = [
    "Tell me about a challenging project you worked on.",
    "how would you handle a disagreement with a team member?",
    "Explain a complex technical concept to a non-technical person."
];

const LiveInterviewSim = () => {
    const { candidateId } = useParams();
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState('');
    const [scoring, setScoring] = useState(false);
    const [scores, setScores] = useState([]);
    const [timeLeft, setTimeLeft] = useState(1800); // 30 mins

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleAutoScore = () => {
        if (!answer) return;
        setScoring(true);
        setTimeout(() => {
            setScoring(false);
            setScores([...scores, {
                question: questions[currentQuestion],
                score: Math.floor(Math.random() * 20) + 80, // Random score 80-100
                feedback: "Good structured response, relevant examples."
            }]);
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setAnswer('');
            } else {
                handleFinish();
            }
        }, 2000);
    };

    const handleFinish = () => {
        navigate(`/interview/evaluation/${candidateId}`);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <PageHeader title="Live Interview Simulation" subtitle={`Candidate ID: ${candidateId}`} />
                <Chip icon={<Timer />} label={formatTime(timeLeft)} color="primary" variant="outlined" />
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" color="primary" gutterBottom>
                                Question {currentQuestion + 1} of {questions.length}
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4 }}>
                                {questions[currentQuestion]}
                            </Typography>

                            <TextField
                                fullWidth
                                multiline
                                rows={6}
                                label="Candidate Answer (Transcript)"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Start speaking or typing..."
                                variant="outlined"
                                sx={{ mb: 3 }}
                            />

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={scoring ? <CircularProgress size={20} color="inherit" /> : <AutoAwesome />}
                                    onClick={handleAutoScore}
                                    disabled={scoring || !answer}
                                >
                                    {scoring ? 'Analyzing...' : 'Auto-Score Answer'}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', bgcolor: '#f5f5f5' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Real-time Analysis</Typography>
                            {scores.map((s, i) => (
                                <Box key={i} sx={{ mb: 2, p: 2, bgcolor: 'white', borderRadius: 1 }}>
                                    <Typography variant="caption" color="textSecondary">Q{i + 1}</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="subtitle2">Score</Typography>
                                        <Typography variant="subtitle2" color="primary">{s.score}%</Typography>
                                    </Box>
                                    <LinearProgress variant="determinate" value={s.score} sx={{ mb: 1 }} />
                                    <Typography variant="caption">{s.feedback}</Typography>
                                </Box>
                            ))}
                            {scores.length === 0 && <Typography color="textSecondary">Wait for first answer...</Typography>}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LiveInterviewSim;
