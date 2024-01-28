ARG ELASTIC_VERSION

FROM docker.elastic.co/beats/filebeat:${ELASTIC_VERSION}

COPY filebeat.yml /usr/share/filebeat/filebeat.yml
USER root

RUN mkdir /var/log/server
RUN chown -R root /usr/share/filebeat