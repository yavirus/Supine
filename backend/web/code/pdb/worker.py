from psycopg2 import connect
from psycopg2 import sql
from psycopg2 import extras
import psycopg2

from PIL import Image


from .errors import NotValidConfiguration


class PostgresWorker:
    def __init__(self, **config):
        self._validate_config(config)
        self.conf = config
        self._connect()

    def close_connection(self):
        return self.disconnect()

    def save_user(self, contents):
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
            user_id = record['id']
            id = f'user_{user_id}_sec'
            sec_request = f'''CREATE TABLE {id} (
                                        sec_id SERIAL,
                                        sec_name VARCHAR
                                        );'''

            self.cursor.execute(sec_request)
            self.conn.commit()
            return user_id

    def add_section(self, _sec_name, user_id):
        request = f'''INSERT INTO user_{user_id}_sec (sec_name)
                    VALUES(%s)
                    RETURNING sec_id;'''


        self.cursor.connection.rollback()
        self.cursor.execute(request, (_sec_name, ))
        for record in self.cursor:
            sec_id = record['sec_id']
            id = f'_{sec_id}_sub_sec'
            sub_table_req = f'''CREATE TABLE {id} (
                                sub_sec_id SERIAL,
                                user_id SERIAL,
                                sub_sec_name VARCHAR
                                
                            );'''

            self.cursor.execute(sub_table_req)
            self.conn.commit()
            return True

    def get_sec_data(self, user_id):
        request = f'''SELECT (sec_name, sec_id) FROM user_{user_id}_sec;'''
        self.cursor.connection.rollback()
        self.cursor.execute(request)

        sec_data = self.cursor.fetchall()
        data = []
        sub_data = []
        response = {}
        for row in sec_data:
            sec_id_list = row['row']
            sec_id = sec_id_list.strip(')(').split(',')  # list of section name and id actually
            data.append(sec_id[0])

            sub_request = f'''SELECT (sub_sec_name) FROM _{sec_id[1]}_sub_sec WHERE user_id = {user_id};'''
            self.cursor.connection.rollback()
            self.cursor.execute(sub_request)
            sub_name = self.cursor.fetchall()
            for row in sub_name:
                sub_data.append(dict(row)['sub_sec_name'])

            response[data[0]] = sub_data;

            data = []
            sub_data = []

        return response


    def add_sub_sec(self, data, user_id):
        sec_name = data[0]
        sec_request = f'''SELECT sec_id FROM user_{user_id}_sec WHERE sec_name = %s;'''
        sub_sec_name = data[1]

        self.cursor.connection.rollback()
        self.cursor.execute(sec_request, (sec_name, ))
        sec_id_arr = self.cursor.fetchall()
        sec_id = sec_id_arr[0]['sec_id']
        table_name = f'_{sec_id}_sub_sec'

        request = f'''INSERT INTO {table_name} (sub_sec_name, user_id)
                            VALUES(%s, {user_id})
                            RETURNING sub_sec_id;'''

        self.cursor.connection.rollback()
        self.cursor.execute(request, (sub_sec_name, ))
        self.conn.commit()
        return True

    def edit_prof(self, data, user_id):

            name = data['name']
            value = data['value']
            update_request = (f"UPDATE users SET {name} = %s WHERE id={user_id};")



            self.cursor.connection.rollback()
            self.cursor.execute(update_request, (value, ))
            self.conn.commit()
            return True


    def get_set_data(self, user_id):
        try:
            request = f'''SELECT username, email, fullname, password FROM users WHERE id={user_id};'''
            self.cursor.connection.rollback()
            self.cursor.execute(request)

            data = self.cursor.fetchall()
            return data

        except (Exception, psycopg2.Error) as error:
            return error

    def get_prof_data(self, user_id):
        try:
            request = f'''SELECT username, fullname FROM users WHERE id={user_id};'''
            self.cursor.connection.rollback()
            self.cursor.execute(request)
            
            data = self.cursor.fetchall()
            return data

        except (Exception, psycopg2.Error) as error:
            return error

    def get_pass_data(self, user_id):
        try:
            request = f'''SELECT password FROM users WHERE id={user_id};'''
            self.cursor.connection.rollback()
            self.cursor.execute(request)

            data = self.cursor.fetchall()
            return data
        except (Exception, psycopg2.Error) as error:
            return error

    def edit_password(self, data, user_id):
        password = data['value']

        request = f'''UPDATE users SET password = %s WHERE id = {user_id}
                   RETURNING id;'''


        self.cursor.connection.rollback()
        self.cursor.execute(request, (password,))

        self.conn.commit()
        return True

    def save_avatar(self, url, user_id):
        request = f'''UPDATE users SET avatar = %s WHERE id = {user_id}
                          RETURNING id;'''

        self.cursor.connection.rollback()
        self.cursor.execute(request, (url,))

        self.conn.commit()
        return True

    def get_av_data(self, user_id):
        request = f'SELECT avatar FROM users WHERE id = {user_id}'

        self.cursor.connection.rollback()
        self.cursor.execute(request)

        image_list = self.cursor.fetchall()
        image_dict = image_list[0]
        for key in image_dict:
            image = Image.open(image_dict[key])
            return image


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

