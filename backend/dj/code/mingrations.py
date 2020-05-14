from psycopg2 import connect
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT


def shippers_migration(c):
    conn = connect(dbname=c['database'],
                   user=c['user'], password=c['password'],
                   host=c['host'],
                   port=c['port'])
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
