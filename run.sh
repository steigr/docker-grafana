#!/bin/sh

GRAFANA_BIN=/bin/grafana-server
envtpl /etc/grafana/config-influxdb.js.tpl
envtpl /usr/share/grafana/conf/defaults.ini.tpl

: "${GF_PATHS_DATA:=/var/lib/grafana}"
: "${GF_PATHS_LOGS:=/var/log/grafana}"
: "${GF_PATHS_PLUGINS:=/var/lib/grafana/plugins}"

if [ ! -x $GRAFANA_BIN ]; then
  echo "can't find executable at $GRAFANA_BIN"
  exit 1
fi

# using port 3001 instead of 3000 for configuration sake,
# the service won't be up until the real start
API_URL="http://127.0.0.1:3001"
wait_for_start_of_grafana(){
    #wait for the startup of grafana
    local retry=0
    while ! curl ${API_URL} 2>/dev/null; do
        retry=$((retry+1))
        if [ $retry -gt 15 ]; then
            echo "\nERROR: unable to start grafana"
            exit 1
        fi
        echo -n "."
        sleep 1
    done
    echo
}

if [ ! -f /.ds_is_configured ]; then
    echo "Starting grafana for configuration"
    "$GRAFANA_BIN" \
      --homepath=/usr/share/grafana             \
      cfg:default.server.http_addr="127.0.0.1"   \
      cfg:default.server.http_port="3001"   \
      cfg:default.paths.data="$GF_PATHS_DATA"   \
      cfg:default.paths.logs="$GF_PATHS_LOGS"   \
      cfg:default.paths.plugins="$GF_PATHS_PLUGINS" \
      web &
    ps auwx | grep -q $GRAFANA_BIN || exit 1
    wait_for_start_of_grafana

    echo "configure datasources..."
    curl "http://$GRAFANA_USER:$GRAFANA_PASS@127.0.0.1:3001/api/datasources" -X POST -H 'Content-Type: application/json;charset=UTF-8' --data-binary @/etc/grafana/config-influxdb.js
    touch /.ds_is_configured
    echo
    echo "Restarting grafana..."
    killall "$(basename $GRAFANA_BIN)"
else
    echo "datasource is already configured, skip the configuration step"
fi

echo
exec "$GRAFANA_BIN" \
  --homepath=/usr/share/grafana             \
  cfg:default.paths.data="$GF_PATHS_DATA"   \
  cfg:default.paths.logs="$GF_PATHS_LOGS"   \
  cfg:default.paths.plugins="$GF_PATHS_PLUGINS" \
  web
