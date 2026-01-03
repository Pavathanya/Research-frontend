import React, { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    Toolbar,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Work as WorkIcon,
    Assignment as AssignmentIcon, // Screening
    CheckCircle as ShortlistIcon, // Shortlist
    Mic as MicIcon, // Interview
    LibraryBooks as QuestionIcon,
    Videocam as LiveIcon,
    Assessment as AssessmentIcon,
    Badge as BadgeIcon, // Employees
    TrendingUp as PerformanceIcon,
    Psychology as PredictionIcon,
    Warning as WarningIcon, // Retention
    HealthAndSafety as ActionIcon,
    Gavel as ComplianceIcon,
    Settings as SettingsIcon,
    ExpandLess,
    ExpandMore,
    Description as CVIcon,
    Summarize as ReportIcon,
    FactCheck as AuditIcon,
    Tune as ThresholdIcon,
    Rule as BiasIcon,
    Lightbulb as ExplainIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // State for collapsible menus
    const [openRecruitment, setOpenRecruitment] = useState(false);
    const [openInterview, setOpenInterview] = useState(false);
    const [openPerformance, setOpenPerformance] = useState(false);
    const [openRetention, setOpenRetention] = useState(false);
    const [openCompliance, setOpenCompliance] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);

    const handleClick = (setter, state) => {
        setter(!state);
    };

    const isSelected = (path) => location.pathname === path;

    const navItem = (text, path, icon) => (
        <ListItemButton
            selected={isSelected(path)}
            onClick={() => {
                navigate(path);
                if (mobileOpen) handleDrawerToggle();
            }}
            sx={{ pl: 4 }}
        >
            <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
    );

    const drawerContent = (
        <Box sx={{ overflow: 'auto', height: '100%', color: '#fff' }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ color: '#fff', fontWeight: 'bold' }}>
                    AI-HCM System
                </Typography>
            </Toolbar>
            <List component="nav">
                {/* Overview */}
                <ListItemButton onClick={() => navigate('/')} selected={isSelected('/')}>
                    <ListItemIcon sx={{ color: 'inherit' }}><DashboardIcon /></ListItemIcon>
                    <ListItemText primary="Overview" />
                </ListItemButton>

                {/* Recruitment */}
                <ListItemButton onClick={() => handleClick(setOpenRecruitment, openRecruitment)}>
                    <ListItemIcon sx={{ color: 'inherit' }}><WorkIcon /></ListItemIcon>
                    <ListItemText primary="Recruitment" />
                    {openRecruitment ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openRecruitment} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {navItem('Jobs', '/recruitment/jobs', <WorkIcon />)}
                        {navItem('CV Screening', '/recruitment/cv-screening', <CVIcon />)}
                        {navItem('Shortlist', '/recruitment/shortlist', <ShortlistIcon />)}
                    </List>
                </Collapse>

                {/* Interviews */}
                <ListItemButton onClick={() => handleClick(setOpenInterview, openInterview)}>
                    <ListItemIcon sx={{ color: 'inherit' }}><MicIcon /></ListItemIcon>
                    <ListItemText primary="Interviews" />
                    {openInterview ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openInterview} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {navItem('Dashboard', '/interview/dashboard', <DashboardIcon />)}
                        {navItem('Question Bank', '/interview/questions', <QuestionIcon />)}
                        {/* Live Sim usually linked from dashboard but can be direct */}
                    </List>
                </Collapse>

                {/* Employees */}
                <ListItemButton onClick={() => navigate('/employees/directory')} selected={isSelected('/employees/directory')}>
                    <ListItemIcon sx={{ color: 'inherit' }}><BadgeIcon /></ListItemIcon>
                    <ListItemText primary="Employees" />
                </ListItemButton>

                {/* Performance */}
                <ListItemButton onClick={() => handleClick(setOpenPerformance, openPerformance)}>
                    <ListItemIcon sx={{ color: 'inherit' }}><PerformanceIcon /></ListItemIcon>
                    <ListItemText primary="Performance" />
                    {openPerformance ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openPerformance} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {navItem('Dashboard', '/performance/dashboard', <DashboardIcon />)}
                        {navItem('Prediction', '/performance/feedback-prediction', <PredictionIcon />)}
                        {navItem('Reports', '/performance/reports', <ReportIcon />)}
                    </List>
                </Collapse>

                {/* Retention */}
                <ListItemButton onClick={() => handleClick(setOpenRetention, openRetention)}>
                    <ListItemIcon sx={{ color: 'inherit' }}><WarningIcon /></ListItemIcon>
                    <ListItemText primary="Retention" />
                    {openRetention ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openRetention} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {navItem('Dashboard', '/retention/dashboard', <DashboardIcon />)}
                        {navItem('Early Warnings', '/retention/alerts', <WarningIcon />)}
                        {navItem('Actions', '/retention/actions', <ActionIcon />)}
                        {navItem('Explainability', '/retention/explainability', <ExplainIcon />)}
                    </List>
                </Collapse>

                {/* Compliance */}
                <ListItemButton onClick={() => handleClick(setOpenCompliance, openCompliance)}>
                    <ListItemIcon sx={{ color: 'inherit' }}><ComplianceIcon /></ListItemIcon>
                    <ListItemText primary="Compliance" />
                    {openCompliance ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openCompliance} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {navItem('Bias & Fairness', '/compliance/bias-fairness', <BiasIcon />)}
                        {navItem('Audit Logs', '/compliance/audit-logs', <AuditIcon />)}
                    </List>
                </Collapse>

                {/* Settings */}
                <ListItemButton onClick={() => handleClick(setOpenSettings, openSettings)}>
                    <ListItemIcon sx={{ color: 'inherit' }}><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Settings" />
                    {openSettings ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSettings} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {navItem('System', '/settings/system', <SettingsIcon />)}
                        {navItem('Role KPI', '/settings/role-kpi', <SettingsIcon />)}
                        {navItem('Thresholds', '/settings/thresholds', <ThresholdIcon />)}
                    </List>
                </Collapse>

            </List>
        </Box>
    );

    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>
            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};


export default Sidebar;
