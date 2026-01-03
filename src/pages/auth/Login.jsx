import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock Auth
        navigate('/');
    };

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#f5f5f5'
        }}>
            <Card sx={{ maxWidth: 400, width: '100%', p: 2 }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
                        AI-HCM System
                    </Typography>
                    <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 3 }}>
                        Sign in to your dashboard
                    </Typography>

                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Email Address"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 3 }}
                        >
                            Login
                        </Button>
                    </form>
                    <Alert severity="info" sx={{ mt: 2 }}>
                        Demo: Click Login (No creds needed)
                    </Alert>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
