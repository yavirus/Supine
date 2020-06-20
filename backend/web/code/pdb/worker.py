from psycopg2 import connect
from psycopg2 import sql
from psycopg2 import extras
import psycopg2

import base64
from bitstring import BitArray

import json
from ast import parse



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


        self.cursor.connection.rollback()
        self.cursor.execute(request, (username, password, email))
        for record in self.cursor:
            records.append({'id': record['id']})
            user_id = record['id']
            id = f'user_{user_id}_sec'
            sec_request = f'''CREATE TABLE {id} (
                                        sec_id SERIAL,
                                        sec_name VARCHAR,
                                        sub_sec TEXT
                                        );'''

            self.cursor.execute(sec_request)
            self.conn.commit()
            return True

    def add_section(self, _sec_name):
        records = []
        request = '''INSERT INTO user_1_sec (sec_name)
                    VALUES(%s)
                    RETURNING sec_id;'''

        try:
            self.cursor.connection.rollback()
            self.cursor.execute(request, (_sec_name, ))

            self.conn.commit()
            return True
        except Exception as e:
            return e


    def edit_prof(self, data):

            name = data['name']
            value = data['value']
            update_request = (f"UPDATE users SET {name} = %s WHERE id=1;")



            self.cursor.connection.rollback()
            self.cursor.execute(update_request, (value, ))
            self.conn.commit()
            return True


    def get_set_data(self):
        try:
            request = '''SELECT username, email, fullname, password FROM users WHERE id=1;'''
            self.cursor.execute(request)

            data = self.cursor.fetchall()
            return data

        except (Exception, psycopg2.Error) as error:
            return error

    def get_prof_data(self):
        try:
            request = '''SELECT username, fullname FROM users WHERE id=1;'''
            self.cursor.execute(request)
            
            data = self.cursor.fetchall()
            return data

        except (Exception, psycopg2.Error) as error:
            return error

    def get_pass_data(self):
        try:
            request = '''SELECT password FROM users WHERE id=1;'''
            self.cursor.execute(request)

            data = self.cursor.fetchall()
            return data
        except (Exception, psycopg2.Error) as error:
            return error

    def edit_password(self, data):
        password = data['value']

        request = '''UPDATE users SET password = %s WHERE id = 1
                   RETURNING id;'''


        self.cursor.connection.rollback()
        self.cursor.execute(request, (password,))

        self.conn.commit()
        return True

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

