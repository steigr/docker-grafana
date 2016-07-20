# Grafana Docker image

This project builds a Docker image with the latest master build of Grafana.

## Running your Grafana container

Start your container binding the external port `3000`.

```
docker run -d --name=grafana -p 3000:3000 appcelerator/grafana
```

Try it out, default admin user is admin/changeme.

## Configuring your Grafana container

All options defined in conf/grafana.ini can be overriden using environment
variables, for example:

```
docker run \
  -d \
  -p 3000:3000 \
  --name=grafana \
  -e "INFLUXDB_HOST=influxdb" \
  -e "INFLUXDB_USER=grafana" \
  -e "INFLUXDB_PASS=changeme" \
  -e "GRAFANA_USER=admin" \
  -e "GRAFANA_PASS=changeme" \
  -e "GRAFANA_BASE_URL=myUrlPrefix" \
  -e "FORCE_HOSTNAME=auto" \
  appcelerator/grafana
```

- **GRAFANA_BASE_URL** allows to set `root_url` in `grafana.ini` like this `https://domain:port/<GRAFANA_BASE_URL>`. If not set, no prefix defined.

## Grafana container with persistent storage (recommended)

```
# create /var/lib/grafana as persistent volume storage
docker run -d -v /var/lib/grafana --name grafana-storage busybox:latest

# start grafana
docker run \
  -d \
  -p 3000:3000 \
  --name=grafana \
  --volumes-from grafana-storage \
  appcelerator/grafana
```

## Running specific version of Grafana

```
# specify right tag, e.g. 3.0.4 - see Docker Hub for available tags
docker run \
  -d \
  -p 3000:3000 \
  --name grafana \
  appcelerator/grafana:3.0.4
```

# Dashboard and datasources

mount dashboards in /etc/extra-config/grafana/config-dashboard*.js and datasources in /etc/extra-config/grafana/config-datasource*.js, they will be loaded at container start.

You can find samples in the github repository, to mount your own, put your config-*.js file in a $config folder and:

```docker run -v $config:/etc/extra-config/grafana:ro ...```

An other way to load default configuration is to download a tarball archive from a public site. Use the CONFIG_ARCHIVE_URL for that:

```
docker run -d -e CONFIG_ARCHIVE_URL=https://download.example.com/config/grafana.tgz ... appcelerator/grafana:latest
```

The archive should contain under a top directory one or both directory:
- base-config/grafana
- extra-config/grafana

# amp pilot

To enable amp-pilot, specify the Consul URL:

```docker run -e CONSUL=consul:8500 ...```
