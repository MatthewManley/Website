cd src/Presentation
call npm i
call npx webpack --config webpack.config.vendor.js
cd ../..
dotnet build %1