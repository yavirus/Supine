from psycopg2 import connect
from psycopg2 import sql
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def config_db_as_admin(c):
    conn = connect(dbname='postgres',
                   user='postgres',
                   password='password',
                   host=c['host'],
                   port=c['port'])
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    cursor.execute(sql.SQL(f"DROP DATABASE IF EXISTS {c['database']}"))
    cursor.execute(sql.SQL(f"DROP ROLE IF EXISTS {c['user']}"))
    cursor.execute(sql.SQL(f"CREATE USER {c['user']} WITH PASSWORD '{c['password']}'"))
    cursor.execute(sql.SQL(f"CREATE DATABASE {c['database']} ENCODING 'UTF8'"))
    cursor.execute(sql.SQL(f"GRANT ALL PRIVILEGES ON DATABASE {c['database']} TO {c['user']}"))
    cursor.close()
    conn.close()

def create_tables(c):
    conn = connect(dbname=c['database'],
                   user=c['user'], password=c['password'],
                   host=c['host'], port=c['port'])
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE users (
                        id SERIAL PRIMARY KEY,
                        username VARCHAR UNIQUE,
                        hobbys VARCHAR, 
                        password VARCHAR,
                        email VARCHAR
                        );''')
    cursor.close()
    conn.close()