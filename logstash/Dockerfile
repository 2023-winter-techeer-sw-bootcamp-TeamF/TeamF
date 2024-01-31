ARG ELASTIC_VERSION

# https://www.docker.elastic.co/
FROM docker.elastic.co/logstash/logstash:${ELASTIC_VERSION}
# FROM docker.elastic.co/logstash/logstash:7.17.11

# 로컬의 pipeline/logstash.conf 파일을 컨테이너의 /usr/share/logstash/pipeline/logstash.conf 파일로 복사
COPY pipeline/ /usr/share/logstash/pipeline/

# 로컬의 config/logstash.yml 파일을 컨테이너의 /usr/share/logstash/config/logstash.yml 파일로 복사
COPY config/ /usr/share/logstash/config/
# Add your logstash plugins setup here
# Example: RUN logstash-plugin install logstash-filter-json
