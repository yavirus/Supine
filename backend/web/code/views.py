from aiohttp import web
from psycopg2 import connect
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def create_user(c):
    conn = connect(db_name=c['database'],
                   user=c['user'],
                   password=c['password'],
                   host=c['host'],
                   port=c['port'])
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE: users (
                        id integer primary key autoincrement,
                        FirstName text not null,
                        LastName TEXT not null,
                        NickName TEXT not null,
                        INTERESTS TEXT not null,
                        legal_entity TEXT
                    );''')
    cursor.close()
    conn.close()
