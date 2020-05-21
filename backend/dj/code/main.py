from settings import config
from tools import config_db_as_admin
from mingrations import shippers_migration

if __name__ == '__main__':
    config_db_as_admin(config)
    print(f"New database and user created successfully")
    create_tables(config)
    print(f"Tables created successfully")
