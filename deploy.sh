#!/bin/bash


echo "nvm 설정"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo "해당 디렉토리 이동"

cd /home/ec2-user/delpoy/WebApiServer

echo "package 설치 시작"

npm install

echo "app 실행"

forever stop -c "npm start" ./
