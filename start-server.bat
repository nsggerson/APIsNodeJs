@echo off
:: Verifica se está rodando como administrador
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Pedindo permissões de administrador...
    powershell -Command "Start-Process '%~f0' -Verb runAs"
    exit
)
cd /d C:\2024\Balta.io\APIsNodeJs
nodemon .\bin\server.js
