@echo off
echo Installing frontend dependencies...
cd frontend
npm install lucide-react recharts --save
if %ERRORLEVEL% NEQ 0 (
    echo Installation failed.
    exit /b %ERRORLEVEL%
)
echo Starting frontend...
npm start
