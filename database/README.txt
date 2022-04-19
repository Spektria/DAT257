-- Fungerar i PowerShell 
&"c:\Program Files\PostgreSQL\13\bin\psql.exe" -f "C:\"navigera här till filen runtest.sql" -v ON_ERROR_STOP=1 postgresql://postgres:postgres@127.0.0.1