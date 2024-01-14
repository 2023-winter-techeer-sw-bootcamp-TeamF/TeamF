# 기본 Nginx 이미지를 사용합니다
FROM nginx:latest

# 로컬의 nginx.conf 파일을 컨테이너의 해당 경로에 복사합니다
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# 필요한 추가 설정이나 파일이 있다면 여기에 추가할 수 있습니다

# Nginx가 사용할 포트를 지정합니다 (옵션)
EXPOSE 80

# Nginx 서버를 시작합니다
CMD ["nginx", "-g", "daemon off;"]