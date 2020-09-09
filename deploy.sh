#!/bin/bash

echo "nvm 설정"

export NVM_DIR="/home/ec2-user/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

echo "해당 디렉토리 이동"

cd /home/ec2-user/delpoy/WebApiServer

echo "package 설치"

npm install


npm start