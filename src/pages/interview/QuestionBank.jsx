import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, Chip, Dialog, DialogTitle, DialogContent, CircularProgress } from '@mui/material';
import { ExpandMore, AutoAwesome } from '@mui/icons-material';
import { mockQuestions } from '../../data/mockInterviews';
import { PageHeader } from '../../components/common/SharedComponents';

const QuestionBank = () => {
    const [questions, setQuestions] = useState(mockQuestions);
    const [generating, setGenerating] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleGenerate = () => {
        setOpenDialog(true);
        setGenerating(true);

        // Simulate LLM Generation
        setTimeout(() => {
            setGenerating(false);
            const newSet = {
                role: 'AI Engineer (Generated)',
                questions: [
                    'Describe the Transformer architecture.',
                    'How do you handle overfitting in deep learning?',
                    'Explain Attention Mechanism.'
                ]
            };
            setQuestions([...questions, newSet]);
            setTimeout(() => setOpenDialog(false), 1000);
        }, 2500);
    };

    return (
        <Box>
            <PageHeader
                title="Dynamic Question Bank"
                subtitle="Role-based & AI Generated Questions"
                action={
                    <Button variant="contained" startIcon={<AutoAwesome />} onClick={handleGenerate}>
                        Generate Questions (AI)
                    </Button>
                }
            />

            {questions.map((q, index) => (
                <Accordion key={index} defaultExpanded={index === 0}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h6">{q.role}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {q.questions.map((item, i) => (
                            <Card key={i} sx={{ mb: 1, backgroundColor: '#f9f9f9' }}>
                                <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                                    <Typography variant="body1">{item}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}

            <Dialog open={openDialog}>
                <DialogTitle>Generating Interview Questions...</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
                    {generating ? (
                        <>
                            <CircularProgress size={60} sx={{ mb: 2 }} />
                            <Typography>Analyzing Role Requirements & Context...</Typography>
                        </>
                    ) : (
                        <Typography color="success.main" variant="h6">Questions Generated Successfully!</Typography>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default QuestionBank;
