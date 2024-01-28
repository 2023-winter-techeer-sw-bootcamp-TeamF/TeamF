ARG ELASTIC_VERSION

# https://www.docker.elastic.co/
FROM docker.elastic.co/elasticsearch/elasticsearch:${ELASTIC_VERSION}
# FROM docker.elastic.co/elasticsearch/elasticsearch:7.17.11

# 로컬의 config/elasticsearch.yml 파일을 컨테이너의 /usr/share/elasticsearch/config/elasticsearch.yml 파일로 복사
COPY config/ /usr/share/elasticsearch/config/

# Add your elasticsearch plugins setup here
# Example: RUN elasticsearch-plugin install analysis-icu
