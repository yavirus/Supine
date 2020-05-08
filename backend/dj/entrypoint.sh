#!/bin/sh

set -e

host="postgres"
port=5432
cmd="$@"

>&2 echo -e "Waiting for a database connection on:\n\t- host:$host\n\t- port: $port"

until nc -w l -z "$host" "$port"; do
    >&2 echo -e "\tDatabase not available. Sleeping 3 seconds."
    sleep 3
done

>&2 echo -e "Database is available! Launch WEB-server!/n"

exec $cmd