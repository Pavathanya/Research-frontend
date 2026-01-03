import React, { useState } from 'react';
import {
    Box,
    Button,
    Snackbar,
    Alert,
    IconButton,
    Tooltip,
    Grid,
    Paper,
    Typography,
    Divider,
    Stack,
    Chip
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CloudUpload, Visibility, CheckCircle, Cancel, Description, GroupAdd } from '@mui/icons-material';
import { mockCandidates } from '../../data/mockCandidates';
import { PageHeader, StatusChip } from '../../components/common/SharedComponents';
import { useNavigate } from 'react-router-dom';

const CVScreening = () => {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [jdFile, setJdFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleJdUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setJdFile(file.name);
            setSnackbar({ open: true, message: 'Job Description Parsed Successfully', severity: 'success' });
        }
    };

    const handleCvUpload = (e) => {
        if (!jdFile) {
            setSnackbar({ open: true, message: 'Please upload a Job Description first', severity: 'warning' });
            return;
        }

        setLoading(true);
        setTimeout(() => {
            // Mock Parsing & Matching Logic
            // Generate scores and assign status automatically
            const processedCandidates = mockCandidates.map(c => {
                // Simulate varying match scores relative to "uploaded JD"
                const score = Math.floor(Math.random() * (98 - 40) + 40);
                let status = 'Rejected';
                if (score > 85) status = 'Shortlisted';
                else if (score >= 60) status = 'Waiting';

                return { ...c, matchScore: score, status };
            });

            // Add some "newly uploaded" mock data if list is short
            if (processedCandidates.length < 5) {
                processedCandidates.push({
                    id: `C-${Date.now()}`,
                    name: 'Alex Rivera',
                    role: 'Product Manager',
                    matchScore: 92,
                    status: 'Shortlisted',
                    experience: 5
                });
            }

            // SORT: Highest match score first
            const sortedCandidates = processedCandidates.sort((a, b) => b.matchScore - a.matchScore);

            setCandidates(sortedCandidates);
            setLoading(false);
            setSnackbar({ open: true, message: 'CVs Processed & Ranked Successfully', severity: 'success' });
        }, 2000);
    };

    const handleStatusChange = (id, newStatus) => {
        setCandidates(candidates.map(c => c.id === id ? { ...c, status: newStatus } : c));
        setSnackbar({ open: true, message: `Candidate marked as ${newStatus}`, severity: 'info' });
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'role', headerName: 'Applied Role', width: 200 },
        {
            field: 'matchScore',
            headerName: 'Match Score',
            width: 140,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 'bold',
                            color: params.value > 85 ? 'success.main' : params.value >= 60 ? 'warning.main' : 'error.main'
                        }}
                    >
                        {params.value}% Match
                    </Typography>
                </Box>
            )
        },
        {
            field: 'status',
            headerName: 'AI Status',
            width: 140,
            renderCell: (params) => <StatusChip status={params.value} />
        },
        { field: 'experience', headerName: 'Exp (Yrs)', width: 100 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Box>
                    <Tooltip title="View Profile">
                        <IconButton onClick={() => navigate(`/recruitment/candidates/${params.row.id}`)} size="small">
                            <Visibility fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Shortlist">
                        <IconButton onClick={() => handleStatusChange(params.row.id, 'Shortlisted')} color="primary" size="small">
                            <CheckCircle fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Reject">
                        <IconButton onClick={() => handleStatusChange(params.row.id, 'Rejected')} color="error" size="small">
                            <Cancel fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        }
    ];

    return (
        <Box sx={{ pb: 5 }}>
            <PageHeader
                title="AI CV Screening"
                subtitle="Contextual Matching with Job Descriptions"
            />

            {/* Dual Upload Section */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* 1. Job Description Upload */}
                <Grid item xs={12} md={4}>
                    <Paper
                        sx={{
                            p: 3,
                            border: '1px dashed #ccc',
                            textAlign: 'center',
                            height: '100%',
                            bgcolor: jdFile ? 'action.selected' : 'background.paper'
                        }}
                    >
                        <Description color="action" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h6" gutterBottom>1. Upload Job Description</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            PDF or DOCX required for contextual matching.
                        </Typography>

                        {jdFile ? (
                            <Chip label={jdFile} color="primary" onDelete={() => setJdFile(null)} sx={{ mb: 2 }} />
                        ) : (
                            <Button variant="outlined" component="label">
                                Select JD
                                <input type="file" hidden onChange={handleJdUpload} />
                            </Button>
                        )}
                    </Paper>
                </Grid>

                {/* 2. CV Bulk Upload */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, border: '1px dashed #ccc', textAlign: 'center', height: '100%' }}>
                        <GroupAdd color="action" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h6" gutterBottom>2. Upload Candidate CVs</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Upload multiple CVs to rank them against the JD.
                        </Typography>
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<CloudUpload />}
                            disabled={!jdFile || loading}
                            onChange={handleCvUpload}
                        >
                            {loading ? 'Analyzing & Ranking...' : 'Upload CVs & Run AI'}
                            <input type="file" hidden multiple />
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            {/* Results Table */}
            <Paper sx={{ height: 600, width: '100%' }}>
                {candidates.length > 0 ? (
                    <DataGrid
                        rows={candidates}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        disableSelectionOnClick
                        autoHeight
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'matchScore', sort: 'desc' }],
                            },
                        }}
                    />
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', opacity: 0.6 }}>
                        <CloudUpload sx={{ fontSize: 60, mb: 2 }} />
                        <Typography>Upload JD and CVs to see ranked results</Typography>
                    </Box>
                )}
            </Paper>

            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
};

export default CVScreening;
