#!/bin/bash

GRAFANA_BIN=/bin/grafana-server

should_configure=0
for f in /etc/grafana/json/config-*.js; do
    # look for jinja templates, and convert them
    grep -q "{{ " "$f"
    if [[ $? -eq 0 ]]; then
        echo "converting $f"
        cfg=/etc/grafana/$(basename $f)
        cp "$f" "$cfg.tpl"
        envtpl "$cfg.tpl"
    else
        cp "$f" /etc/grafana/
    fi
    should_configure=1
done

# Generating configuration file from template if needed
if [[ -f /usr/share/grafana/conf/defaults.ini.tpl ]] ; then
    echo "Generating /usr/share/grafana/conf/defaults.ini.tpl from template..."
    envtpl /usr/share/grafana/conf/defaults.ini.tpl
else
    if [[ -f /usr/share/grafana/conf/defaults.ini ]] ; then
        echo "/usr/share/grafana/conf/defaults.ini already exists. Nothing to do."
    else
        echo "ERROR: No template or configuration file found: /usr/share/grafana/conf/defaults.ini.tpl"
    fi
fi

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
    echo "waiting for availability of grafana..."
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

if [[ ! -z $GRAFANA_BASE_URL ]]; then
    urlPrefix="${GRAFANA_BASE_URL}/"
else
    urlPrefix=
fi

if [ $should_configure -eq 1 ]; then
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
    for f in /etc/grafana/config-datasource*.js; do
        echo "datasource $f"
        curl -sS "http://$GRAFANA_USER:$GRAFANA_PASS@127.0.0.1:3001/${urlPrefix}api/datasources" -X POST -H 'Content-Type: application/json;charset=UTF-8' --data-binary "@$f"
    done

    echo
    echo "configure dashboards..."
    for f in /etc/grafana/config-dashboard*.js; do
        echo "dashboard $f"
        curl -sS  "http://$GRAFANA_USER:$GRAFANA_PASS@127.0.0.1:3001/${urlPrefix}api/dashboards/db" -X POST -H 'Content-Type: application/json;charset=UTF-8' --data-binary "@$f"
    done
    touch /.ds_is_configured
    echo
    echo "Restarting grafana..."
    killall "$(basename $GRAFANA_BIN)"
else
    echo "no datasource or dashboard json file, skip the configuration step"
fi

echo
"$GRAFANA_BIN" \
  --homepath=/usr/share/grafana             \
  cfg:default.paths.data="$GF_PATHS_DATA"   \
  cfg:default.paths.logs="$GF_PATHS_LOGS"   \
  cfg:default.paths.plugins="$GF_PATHS_PLUGINS" \
  web
