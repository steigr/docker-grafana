{
  "Dashboard":
  {
  "id": null,
  "title": "AMP Swarm Health",
  "originalTitle": "AMP Swarm Health",
  "tags": [],
  "style": "dark",
  "timezone": "browser",
  "editable": true,
  "hideControls": false,
  "sharedCrosshair": false,
  "rows": [
    {
      "collapse": false,
      "editable": true,
      "height": "",
      "panels": [],
      "showTitle": false,
      "title": "DockerLevel"
    },
    {
      "collapse": false,
      "editable": true,
      "height": "250px",
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "datasource": "telegraf",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null,
            "threshold1": null,
            "threshold1Color": "rgba(216, 200, 27, 0.27)",
            "threshold2": null,
            "threshold2Color": "rgba(234, 112, 112, 0.22)"
          },
          "id": 1,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 2,
          "links": [],
          "nullPointMode": "connected",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "span": 12,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "dsType": "influxdb",
              "fields": [
                {
                  "func": "mean",
                  "name": "usage_percent"
                }
              ],
              "groupBy": [
                {
                  "interval": "auto",
                  "params": [
                    "auto"
                  ],
                  "type": "time"
                },
                {
                  "key": "datacenter",
                  "params": [
                    "datacenter"
                  ],
                  "type": "tag"
                },
                {
                  "key": "host",
                  "params": [
                    "host"
                  ],
                  "type": "tag"
                },
                {
                  "key": "container_name",
                  "params": [
                    "container_name"
                  ],
                  "type": "tag"
                }
              ],
              "measurement": "docker_container_mem",
              "query": "SELECT mean(\"usage_percent\") FROM \"docker_container_mem\" WHERE $timeFilter GROUP BY time($interval), \"container_name\", \"datacenter\", \"host\"",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "usage_percent"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "mean"
                  }
                ]
              ],
              "tags": [],
              "rawQuery": true
            }
          ],
          "timeFrom": null,
          "timeShift": null,
          "title": "Docker Memory Utilization",
          "tooltip": {
            "shared": true,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "y-axis": true,
          "y_formats": [
            "short",
            "short"
          ]
        },
        {
          "aliasColors": {},
          "bars": false,
          "datasource": "telegraf",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null,
            "threshold1": null,
            "threshold1Color": "rgba(216, 200, 27, 0.27)",
            "threshold2": null,
            "threshold2Color": "rgba(234, 112, 112, 0.22)"
          },
          "id": 5,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 2,
          "links": [],
          "nullPointMode": "connected",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "span": 12,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "dsType": "influxdb",
              "fields": [
                {
                  "func": "mean",
                  "name": "usage_percent"
                }
              ],
              "groupBy": [
                {
                  "interval": "auto",
                  "params": [
                    "auto"
                  ],
                  "type": "time"
                },
                {
                  "key": "datacenter",
                  "params": [
                    "datacenter"
                  ],
                  "type": "tag"
                },
                {
                  "key": "host",
                  "params": [
                    "host"
                  ],
                  "type": "tag"
                },
                {
                  "key": "container_name",
                  "params": [
                    "container_name"
                  ],
                  "type": "tag"
                }
              ],
              "measurement": "docker_container_cpu",
              "query": "SELECT mean(\"usage_percent\") FROM \"docker_container_cpu\" WHERE $timeFilter GROUP BY time($interval), \"datacenter\", \"host\", \"container_name\"",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "usage_percent"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "mean"
                  }
                ]
              ],
              "tags": []
            }
          ],
          "timeFrom": null,
          "timeShift": null,
          "title": "Docker CPU Utilization",
          "tooltip": {
            "shared": true,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "y-axis": true,
          "y_formats": [
            "short",
            "short"
          ]
        }
      ],
      "title": "New row"
    },
    {
      "collapse": false,
      "editable": true,
      "height": "250px",
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "datasource": "telegraf",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null,
            "threshold1": null,
            "threshold1Color": "rgba(216, 200, 27, 0.27)",
            "threshold2": null,
            "threshold2Color": "rgba(234, 112, 112, 0.22)"
          },
          "id": 3,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 2,
          "links": [],
          "nullPointMode": "connected",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "span": 12,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "dsType": "influxdb",
              "fields": [
                {
                  "func": "mean",
                  "name": "usage_system"
                }
              ],
              "groupBy": [
                {
                  "interval": "auto",
                  "params": [
                    "auto"
                  ],
                  "type": "time"
                },
                {
                  "key": "datacenter",
                  "params": [
                    "datacenter"
                  ],
                  "type": "tag"
                },
                {
                  "key": "host",
                  "params": [
                    "host"
                  ],
                  "type": "tag"
                }
              ],
              "measurement": "cpu",
              "query": "SELECT mean(\"usage_system\") FROM \"cpu\" WHERE $timeFilter GROUP BY time($interval), \"datacenter\", \"host\"",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "usage_system"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "mean"
                  }
                ]
              ],
              "tags": []
            }
          ],
          "timeFrom": null,
          "timeShift": null,
          "title": "System CPU Utilization",
          "tooltip": {
            "shared": true,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "y-axis": true,
          "y_formats": [
            "short",
            "short"
          ]
        }
      ],
      "title": "New row"
    },
    {
      "collapse": false,
      "editable": true,
      "height": "250px",
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "datasource": "telegraf",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null,
            "threshold1": null,
            "threshold1Color": "rgba(216, 200, 27, 0.27)",
            "threshold2": null,
            "threshold2Color": "rgba(234, 112, 112, 0.22)"
          },
          "id": 4,
          "isNew": true,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 2,
          "links": [],
          "nullPointMode": "connected",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "span": 12,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "dsType": "influxdb",
              "groupBy": [
                {
                  "params": [
                    "$interval"
                  ],
                  "type": "time"
                },
                {
                  "params": [
                    "datacenter"
                  ],
                  "type": "tag"
                },
                {
                  "params": [
                    "host"
                  ],
                  "type": "tag"
                }
              ],
              "measurement": "mem",
              "query": "SELECT mean(\"used_percent\") FROM \"mem\" WHERE $timeFilter GROUP BY time($interval), \"datacenter\", \"host\"",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "used_percent"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "mean"
                  }
                ]
              ],
              "tags": []
            }
          ],
          "timeFrom": null,
          "timeShift": null,
          "title": "System Memory Utilization",
          "tooltip": {
            "shared": true,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "y-axis": true,
          "y_formats": [
            "short",
            "short"
          ]
        }
      ],
      "title": "New row"
    }
  ],
  "time": {
    "from": "now-5m",
    "to": "now"
  },
  "timepicker": {
    "collapse": false,
    "enable": true,
    "notice": false,
    "now": true,
    "refresh_intervals": [
      "5s",
      "10s",
      "30s",
      "1m",
      "5m",
      "15m",
      "30m",
      "1h",
      "2h",
      "1d"
    ],
    "status": "Stable",
    "time_options": [
      "5m",
      "15m",
      "1h",
      "6h",
      "12h",
      "24h",
      "2d",
      "7d",
      "30d"
    ],
    "type": "timepicker"
  },
  "templating": {
    "list": []
  },
  "annotations": {
    "list": []
  },
  "schemaVersion": 8,
  "version": 2,
  "links": []
}
}
