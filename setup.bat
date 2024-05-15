@echo off

echo Installing npm dependencies for my-app...
cd my-app
call npm i

rem Check for npm install error
if %errorlevel% neq 0 (
    echo Error: npm install failed for %~1.
    pause
    exit /b %errorlevel%
)
cd ..

echo Installing npm dependencies for server...
cd server
call npm i

rem Check for npm install error
if %errorlevel% neq 0 (
    echo Error: npm install failed for %~1.
    pause
    exit /b %errorlevel%
)
cd ..


echo npm install completed successfully for both directories.
pause
