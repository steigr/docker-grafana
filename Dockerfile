FROM appcelerator/alpine:20160928
MAINTAINER Nicolas Degory <ndegory@axway.com>

RUN apk --no-cache add nodejs

ENV GRAFANA_VERSION 4.0.0

RUN apk update && apk upgrade && \
    apk --no-cache add fontconfig && \
    apk --virtual build-deps add build-base go curl git gcc musl-dev make nodejs-dev fontconfig-dev && \
    # package pinning doesn't work with virtual packages
    apk add go@community && \
    export GOPATH=/go && \
    mkdir -p $GOPATH/src/github.com/grafana && cd $GOPATH/src/github.com/grafana && \
    git clone https://github.com/grafana/grafana.git -b v${GRAFANA_VERSION} &&\
    cd grafana && \
    go run build.go setup && \
    go run build.go build && \
    npm install -g grunt-cli && \
    npm install && \
    npm run build && \
    grunt && \
    npm uninstall -g grunt-cli && \
    npm cache clear && \
    mv ./bin/grafana-server ./bin/grafana-cli /bin/ && \
    mkdir -p /etc/grafana/json /var/lib/grafana/plugins /var/log/grafana /usr/share/grafana && \
    mv ./public_gen /usr/share/grafana/public && \
    mv ./conf /usr/share/grafana/conf && \
    apk del binutils-libs binutils gmp isl libgomp libatomic libgcc pkgconf pkgconfig mpfr3 mpc1 libstdc++ gcc go && \
    apk del build-deps && cd / && rm -rf /var/cache/apk/* $GOPATH

VOLUME ["/var/lib/grafana", "/var/lib/grafana/plugins", "/var/log/grafana"]

EXPOSE 3000

ENV INFLUXDB_HOST localhost
ENV INFLUXDB_PORT 8086
ENV INFLUXDB_PROTO http
ENV INFLUXDB_USER grafana
ENV INFLUXDB_PASS changeme
ENV GRAFANA_USER admin
ENV GRAFANA_PASS changeme
#ENV GRAFANA_BASE_URL
#ENV FORCE_HOSTNAME

COPY ./grafana.ini /usr/share/grafana/conf/defaults.ini.tpl
COPY ./run.sh /run.sh

ENTRYPOINT ["/bin/sh", "-c"]
CMD ["/run.sh"]

HEALTHCHECK --interval=5s --retries=5 --timeout=2s CMD curl -u $GRAFANA_USER:$GRAFANA_PASS localhost:3000/api/org 2>/dev/null | grep -q '"id":'

LABEL axway_image=grafana
# will be updated whenever there's a new commit
LABEL commit=${GIT_COMMIT}
LABEL branch=${GIT_BRANCH}
