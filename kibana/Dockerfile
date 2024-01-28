ARG ELASTIC_VERSION

# https://www.docker.elastic.co/
FROM docker.elastic.co/kibana/kibana:${ELASTIC_VERSION}
# FROM docker.elastic.co/kibana/kibana:7.17.11

# 로컬의 config/kibana.yml 파일을 컨테이너의 /usr/share/kibana/config/kibana.yml 파일로 복사
COPY config/ /usr/share/kibana/config/

# Add your kibana plugins setup here
# Example: RUN kibana-plugin install <name|url>
