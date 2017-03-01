# Grafana Docker image

This project builds a Docker image with the latest master build of Grafana.

## Running your Grafana container

Start your container binding the external port `3000`.

    docker run -d --name=grafana -p 3000:3000 steigr/grafana

Try it out, default admin user is admin/changeme.

## Configuration (ENV, -e)

Variable | Description | Default value | Sample value 
-------- | ----------- | ------------- | ------------
FORCE_HOSTNAME | Sets the hostname of the container | localhost | auto 
GRAFANA_BASE_URL | Root URL | | grafana
CONFIG_ARCHIVE_URL | URL of a configuration archive | | 
INFLUXDB_HOST | Hostname for InfluxDB | localhost | influxdb
INFLUXDB_PORT | Port for InfluxDB | 8086 |
INFLUXDB_PROTO | Protocol for InfluxDB | http |
INFLUXDB_USER | Grafana user in InfluxDB | grafana |
INFLUXDB_PASS | Grafana password in InfluxDB | changeme |
GRAFANA_USER | Admin user | admin |
GRAFANA_PASS | Admin password | changeme |
GRAFANA_PLUGIN_LIST | Space separated list of plugins to install | | grafana-piechart-panel
EXECUTE_ALERTS | Makes it possible to turn off alert rule execution | true | false
DISABLE_LOGIN_FORM | Set to true to disable (hide) the login form, useful if you use OAuth | false | true

## Grafana container with persistent storage (recommended)

    docker run -d -v /var/lib/grafana --name grafana-storage busybox:latest
    docker run \
      -d \
      -p 3000:3000 \
      --name=grafana \
      --volumes-from grafana-storage \
      steigr/grafana

## Dashboards and datasources

mount dashboards in /etc/extra-config/grafana/config-dashboard*.js and datasources in /etc/extra-config/grafana/config-datasource*.js, they will be loaded at container start.

You can find samples in the github repository, to mount your own, put your config-*.js file in a $config folder and:

    docker run -v $config:/etc/extra-config/grafana:ro ...

An other way to load default configuration is to download a tarball archive from a public site. Use the CONFIG_ARCHIVE_URL for that:

    docker run -d -e CONFIG_ARCHIVE_URL=https://download.example.com/config/grafana.tgz ... steigr/grafana:latest

The archive should contain under a top directory at least one of these directories:
- base-config/grafana
- extra-config/grafana

## Tags

- ```v4.1.1```
- ```v4.1.2```
- ```latest```

## Docker Image

[![](https://images.microbadger.com/badges/image/steigr/grafana.svg)](http://microbadger.com/images/steigr/grafana "Get your own image badge on microbadger.com")
[![](https://images.microbadger.com/badges/version/steigr/grafana.svg)](http://microbadger.com/images/steigr/grafana "Get your own version badge on microbadger.com")
[![](https://images.microbadger.com/badges/commit/steigr/grafana.svg)](http://microbadger.com/images/steigr/grafana "Get your own commit badge on microbadger.com")
