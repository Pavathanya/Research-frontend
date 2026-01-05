import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import Login from '../pages/auth/Login';
import Overview from '../pages/dashboard/Overview';
import Jobs from '../pages/recruitment/Jobs';
import CVScreening from '../pages/recruitment/CVScreening';
import CandidateProfile from '../pages/recruitment/CandidateProfile';
import Shortlist from '../pages/recruitment/Shortlist';
import RecruitmentDashboard from '../pages/recruitment/RecruitmentDashboard';
import InterviewDashboard from '../pages/interview/InterviewDashboard';
import QuestionBank from '../pages/interview/QuestionBank';
import LiveInterviewSim from '../pages/interview/LiveInterviewSim';
import EvaluationReport from '../pages/interview/EvaluationReport';
import EmployeeDirectory from '../pages/employees/EmployeeDirectory';
import EmployeeProfile from '../pages/employees/EmployeeProfile';
import PerformanceDashboard from '../pages/performance/PerformanceDashboard';
import FeedbackPrediction from '../pages/performance/FeedbackPrediction';
import PerformanceReports from '../pages/performance/PerformanceReports';
import RetentionDashboard from '../pages/retention/RetentionDashboard';
import EarlyWarningAlerts from '../pages/retention/EarlyWarningAlerts';
import RetentionActions from '../pages/retention/RetentionActions';
import Explainability from '../pages/retention/Explainability';
import BiasFairnessDashboard from '../pages/compliance/BiasFairnessDashboard';
import AuditLogs from '../pages/compliance/AuditLogs';
import { SystemSettings, RoleKPIConfig, ThresholdConfig } from '../pages/settings/AllSettings';

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            { path: '/', element: <Overview /> },

            // Recruitment
            { path: 'recruitment/dashboard', element: <RecruitmentDashboard /> },
            { path: 'recruitment/jobs', element: <Jobs /> },
            { path: 'recruitment/cv-screening', element: <CVScreening /> },
            { path: 'recruitment/candidates/:id', element: <CandidateProfile /> },
            { path: 'recruitment/shortlist', element: <Shortlist /> },

            // Interview
            { path: 'interview/dashboard', element: <InterviewDashboard /> },
            { path: 'interview/questions', element: <QuestionBank /> },
            { path: 'interview/live/:candidateId', element: <LiveInterviewSim /> },
            { path: 'interview/evaluation/:candidateId', element: <EvaluationReport /> },

            // Employees
            { path: 'employees/directory', element: <EmployeeDirectory /> },
            { path: 'employees/:id', element: <EmployeeProfile /> },

            // Performance
            { path: 'performance/dashboard', element: <PerformanceDashboard /> },
            { path: 'performance/feedback-prediction', element: <FeedbackPrediction /> },
            { path: 'performance/reports', element: <PerformanceReports /> },

            // Retention
            { path: 'retention/dashboard', element: <RetentionDashboard /> },
            { path: 'retention/alerts', element: <EarlyWarningAlerts /> },
            { path: 'retention/actions', element: <RetentionActions /> },
            { path: 'retention/explainability', element: <Explainability /> },

            // Compliance
            { path: 'compliance/bias-fairness', element: <BiasFairnessDashboard /> },
            { path: 'compliance/audit-logs', element: <AuditLogs /> },

            // Settings
            { path: 'settings/system', element: <SystemSettings /> },
            { path: 'settings/role-kpi', element: <RoleKPIConfig /> },
            { path: 'settings/thresholds', element: <ThresholdConfig /> },
        ]
    }
]);
