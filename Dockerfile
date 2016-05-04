FROM alpine:3.3
MAINTAINER Nicolas Degory <ndegory@axway.com>

RUN apk --no-cache add python && \
    apk --virtual envtpl-deps add --update py-pip python-dev curl && \
    curl https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py | python - --version=20.9.0 && \
    pip install envtpl && \
    apk del envtpl-deps

RUN apk --no-cache add nodejs

ENV GRAFANA_VERSION 2.6.0

ADD package.json /tmp/package.json

RUN apk --virtual build-deps add go curl git gcc musl-dev make nodejs-dev && \
    export GOPATH=/go && \
    go get -d github.com/grafana/grafana/... && \
    cd $GOPATH/src/github.com/grafana/grafana && \
    git checkout -q --detach "v${GRAFANA_VERSION}" && \
    mv /tmp/package.json $GOPATH/src/github.com/grafana/grafana/ && \
    go run build.go setup && \
    $GOPATH/bin/godep restore && \
    go run build.go build && \
    npm install && \
    npm install -g grunt-cli && \
    grunt && \
    npm uninstall -g grunt-cli && \
    npm cache clear && \
    #curl -L https://github.com/tianon/gosu/releases/download/1.7/gosu-amd64 > /bin/gosu && chmod +x /bin/gosu && \
    mv ./bin/grafana-server /bin/ && \
    mkdir -p /etc/grafana /var/lib/grafana/plugins /var/log/grafana /usr/share/grafana && \
    mv ./public_gen /usr/share/grafana/public && \
    mv ./conf /usr/share/grafana/conf && \
    apk del build-deps && cd / && rm -rf /var/cache/apk/* $GOPATH

RUN apk --no-cache add curl

VOLUME ["/var/lib/grafana", "/var/lib/grafana/plugins", "/var/log/grafana", "/etc/grafana"]

EXPOSE 3000

ENV INFLUXDB_HOST localhost
ENV INFLUXDB_PORT 8086
ENV INFLUXDB_PROTO http
ENV INFLUXDB_USER grafana
ENV INFLUXDB_PASS changeme
ENV GRAFANA_USER admin
ENV GRAFANA_PASS changeme

COPY ./grafana.ini /usr/share/grafana/conf/defaults.ini.tpl
COPY ./config-*.js /etc/grafana/
COPY ./run.sh /run.sh

CMD ["/run.sh"]

# will be updated whenever there's a new commit
LABEL commit=${GIT_COMMIT}
LABEL branch=${GIT_BRANCH}
