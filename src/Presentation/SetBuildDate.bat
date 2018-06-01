echo off
for /f "tokens=1-4 delims=/ " %%i in ("%date%") do (
     set month=%%j
     set day=%%k
     set year=%%l
)
set datestr=%year%-%month%-%day%
del ClientApp\BuildDate.ts
echo export const BuildDate = "%datestr%";>> ClientApp\BuildDate.ts
echo on