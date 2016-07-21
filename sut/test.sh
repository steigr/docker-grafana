#!/bin/bash

GRAFANA_HOST=${GRAFANA_HOST:-grafana}

echo -n "test 1... "
i=0
r=1
while [[ $r -ne 0 ]]; do
  ((i++))
  sleep 1
  curl -L $GRAFANA_HOST:3000 2>/dev/null | grep -q '<title>Grafana</title>'
  r=$?
  if [[ $i -gt 30 ]]; then break; fi
done
if [[ $r -ne 0 ]]; then
  echo
  echo "Grafana:6001 failed"
  curl -L $GRAFANA_HOST:3000
  exit 1
fi
echo "[OK]"

echo "all tests passed successfully"
