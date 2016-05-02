{
    "name":"influx",
    "type":"influxdb",
    "url":"{{ INFLUXDB_PROTO | default("http") }}://{{ INFLUXDB_HOST | default("localhost") }}:{{ INFLUXDB_PORT | default("8086") }}",
    "access":"proxy",
    "isDefault":true,
    "database":"mydb",
    "user":"{{ INFLUXDB_USER | default("admin") }}",
    "password":"{{ INFLUXDB_PASS | default("secret") }}"
}
