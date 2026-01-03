import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Add as AddIcon, LocationOn, Work } from '@mui/icons-material';
import { mockJobs } from '../../data/mockJobs';
import { PageHeader } from '../../components/common/SharedComponents';

const Jobs = () => {
    const [jobs, setJobs] = useState(mockJobs);
    const [open, setOpen] = useState(false);
    const [newJob, setNewJob] = useState({ title: '', department: '' });

    const handleCreate = () => {
        const job = {
            id: `JOB-${jobs.length + 101}`,
            title: newJob.title,
            department: newJob.department,
            location: 'Remote',
            type: 'Full-time',
            skills: ['Pending'],
            postedDate: new Date().toISOString().split('T')[0],
            applicants: 0,
            status: 'Open'
        };
        setJobs([...jobs, job]);
        setOpen(false);
    };

    return (
        <Box>
            <PageHeader
                title="Jobs Management"
                subtitle="Manage open positions and requirements"
                action={<Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>Create Job</Button>}
            />

            <Grid container spacing={3}>
                {jobs.map((job) => (
                    <Grid item xs={12} md={6} lg={4} key={job.id}>
                        <Card sx={{ height: '100%', position: 'relative' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6" fontWeight="bold">{job.title}</Typography>
                                    <Chip label={job.status} color={job.status === 'Open' ? 'success' : 'default'} size="small" />
                                </Box>
                                <Typography color="textSecondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Work fontSize="small" sx={{ mr: 1 }} /> {job.department} • {job.type}
                                </Typography>
                                <Typography color="textSecondary" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <LocationOn fontSize="small" sx={{ mr: 1 }} /> {job.location}
                                </Typography>

                                <Box sx={{ mb: 2 }}>
                                    {job.skills.map((skill) => (
                                        <Chip key={skill} label={skill} size="small" sx={{ mr: 0.5, mb: 0.5 }} variant="outlined" />
                                    ))}
                                </Box>
                                <Typography variant="body2" color="textSecondary">
                                    Applicants: {job.applicants} • Posted: {job.postedDate}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create New Job</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus margin="dense" label="Job Title" fullWidth variant="outlined"
                        value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    />
                    <TextField
                        margin="dense" label="Department" fullWidth variant="outlined"
                        value={newJob.department} onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreate} variant="contained">Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Jobs;
