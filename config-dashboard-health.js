{
  "Dashboard" :
  {
  "id": null,
  "title": "Swarm Health",
  "originalTitle": "Swarm Health",
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
          "id": 2,
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
              "fields": [
                {
                  "func": "mean",
                  "name": "max_usage"
                }
              ],
              "groupByTags": [
                "datacenter",
                "host",
                "cont_name"
              ],
              "measurement": "docker_mem",
              "query": "SELECT mean(max_usage) FROM \"docker_mem\" WHERE $timeFilter GROUP BY time($interval), \"datacenter\", \"host\", \"cont_name\"",
              "tags": []
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
        }
      ],
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
              "fields": [
                {
                  "func": "mean",
                  "name": "usage_percent"
                }
              ],
              "groupByTags": [
                "datacenter",
                "host",
                "cont_name"
              ],
              "measurement": "docker_cpu",
              "query": "SELECT mean(usage_percent) FROM \"docker_cpu\" WHERE $timeFilter GROUP BY time($interval), \"datacenter\", \"host\", \"cont_name\"",
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
      "title": "New row",
      "height": "250px",
      "editable": true,
      "collapse": false,
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
              "fields": [
                {
                  "func": "mean",
                  "name": "usage_system"
                }
              ],
              "groupByTags": [
                "datacenter",
                "host"
              ],
              "measurement": "cpu",
              "query": "SELECT mean(usage_system) FROM \"cpu\" WHERE $timeFilter GROUP BY time($interval), \"datacenter\", \"host\"",
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
      ]
    }
  ],
  "nav": [
    {
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
    }
  ],
  "time": {
    "from": "now-6h",
    "to": "now"
  },
  "templating": {
    "list": []
  },
  "annotations": {
    "list": []
  },
  "schemaVersion": 6,
  "version": 5,
  "links": []
 }
}
