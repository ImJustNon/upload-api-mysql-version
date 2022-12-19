@echo off
title Upload_Image_API

:start_server
node ./server.js
goto start_server