import React, { useState } from 'react';
import { Box, Button, Snackbar, Alert, IconButton, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CloudUpload, Visibility, CheckCircle, Cancel } from '@mui/icons-material';
import { mockCandidates } from '../../data/mockCandidates';
import { PageHeader, StatusChip } from '../../components/common/SharedComponents';
import { useNavigate } from 'react-router-dom';

const CVScreening = () => {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState(mockCandidates);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleUpload = () => {
        setSnackbar({ open: true, message: 'CVs Uploaded & Parsed Successfully', severity: 'success' });
        // Simulate adding more candidates
        const newCandidate = {
            id: `C-${candidates.length + 10}`,
            name: 'New Candidate (Uploaded)',
            role: 'Product Manager',
            skills: ['Leadership', 'Strategic Planning'],
            matchScore: 75,
            status: 'New',
            experience: 6
        };
        setCandidates([...candidates, newCandidate]);
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
            width: 130,
            renderCell: (params) => (
                <Box sx={{ fontWeight: 'bold', color: params.value > 80 ? 'green' : params.value > 60 ? 'orange' : 'red' }}>
                    {params.value}%
                </Box>
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
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
        <Box sx={{ height: 600, width: '100%' }}>
            <PageHeader
                title="CV Screening"
                subtitle="AI-Automated Parsing & Scoring"
                action={
                    <Button variant="contained" startIcon={<CloudUpload />} onClick={handleUpload}>
                        Upload CVs (CSV/PDF)
                    </Button>
                }
            />
            <DataGrid
                rows={candidates}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                autoHeight
            />
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
};

export default CVScreening;
