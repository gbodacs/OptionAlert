call npm run build
call rmdir /s /q .\www\
call mkdir www
call xcopy /E .\build\*.* .\www\*.*
call cordova build android --release