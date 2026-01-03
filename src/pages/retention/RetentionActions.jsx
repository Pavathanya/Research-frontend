import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Send } from '@mui/icons-material';
import { PageHeader } from '../../components/common/SharedComponents';

const actions = [
    { title: 'Training & Upskilling', desc: 'Assign advanced courses to improve engagement.' },
    { title: 'Compensation Review', desc: 'Flag for off-cycle salary adjustment.' },
    { title: 'Role Change', desc: 'Propose lateral move to new department.' },
    { title: 'Wellbeing Check-in', desc: 'Schedule 1:1 with HR BP.' },
];

const RetentionActions = () => {
    const [open, setOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);

    const handleAssign = (action) => {
        setSelectedAction(action);
        setOpen(true);
    };

    return (
        <Box>
            <PageHeader title="Intervention Actions" subtitle="Library of Retention Strategies" />

            <Grid container spacing={3}>
                {actions.map((action, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                        <Card sx={{ height: '100%', borderColor: 'primary.main', borderWidth: 1, borderStyle: 'solid' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>{action.title}</Typography>
                                <Typography variant="body2" color="textSecondary" paragraph>{action.desc}</Typography>
                                <Button fullWidth variant="contained" onClick={() => handleAssign(action)}>Assign</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Assign {selectedAction?.title}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Employee ID" fullWidth variant="outlined" />
                    <TextField margin="dense" label="Justification / Notes" fullWidth multiline rows={3} variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" startIcon={<Send />} onClick={() => setOpen(false)}>Assign Action</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default RetentionActions;
