API SERVER

1. /admin/project    
프로젝트 생성 / 프로젝트 6개씩 한 페이지로 읽어오기    

2. /admin/project/:id     
특정 프로젝트(name으로)에 있는 total run 수 읽어오기 / 삭제 / 업데이트    

3. /admin/run    
런 생성(추후 삭제) / 모든 런 읽어오기 (프로젝트에 상관없이)     

4. /admin/run/:id     
특정 런(name으로) 정보 읽어오기 / 이름 업데이트     

5. /admin/run/project/:id     
특정 프로젝트(id로)에 속한 런을 30개씩 한 페이지로 읽어오기    

6. /project/run/:id
프로젝트 지울 때 속해있는 모든 run 삭제

(현재)     
1. 프로젝트 페이지 0이하 숫자 넣으면 1 페이지 출력되고, 없는 페이지는 아무것도 출력 안됨 (오류x)     

2. update 해도 create 순서로 가져옴 => 프로젝트는 create / 런은 update 순서로?

3. id를 다시 채워넣으면, 순서도 꼬일 것 같은데
