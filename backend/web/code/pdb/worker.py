from psycopg2 import connect
from psycopg2 import sql
from psycopg2 import extras

from .errors import NotValidConfiguration


class PostgresWorker:
    def __init__(self, **config):
        self._validate_config(config)
        self.conf = config
        self._connect()

    def close_connection(self):
        return self.disconnect()

    def save_user(self, contents):
        records = []
        con_values = []
        for dict in contents:
            con_values.append(dict['value'])
        username = con_values[0]
        email = con_values[1]
        password = con_values[3]

        request = '''INSERT INTO users (username, password, email)
                    VALUES(%s, %s, %s)
                    RETURNING id;'''

        try:
            self.cursor.connection.rollback()
            self.cursor.execute(request, (username, password, email))
            for record in self.cursor:
                records.append({'id': record['id']})
                self.conn.commit()
                return True
        except Exception:
            return False

    def _validate_config(self, conf):
        required_fields = ['database', 'user', 'password', 'host', 'port']
        for field in required_fields:
            if field not in required_fields:
                raise NotValidConfiguration(field, "This field is required!")

    def _connect(self):
        self.conn = connect(dbname=self.conf['database'],
                            user=self.conf['user'],
                            password=self.conf['password'],
                            host=self.conf['host'],
                            port=self.conf['port'])
        self.cursor = self.conn.cursor(cursor_factory=extras.RealDictCursor)

    def _disconnect(self):
        self.cursor.close()
        self.conn.close()

