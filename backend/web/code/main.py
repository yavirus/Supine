from aiohttp import web
import logging
import aiohttp
import time
import base64
from cryptography import fernet
from aiohttp_session import setup, get_session, session_middleware
from aiohttp_session.cookie_storage import EncryptedCookieStorage

from routes import setup_routes


from settings import config
from pdb.launch import (
    init_pg, close_pg
)

def init_app():
    app = web.Application()

    fernet_key = fernet.Fernet.generate_key()
    secret_key = base64.urlsafe_b64decode(fernet_key)
    setup(app, EncryptedCookieStorage(secret_key))

    app['config'] = config

    app.on_startup.append(init_pg)
    app.on_cleanup.append(close_pg)

    setup_routes(app)

    return app

if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)

    app = init_app()

    web.run_app(app, host=config['general']['host'], port=config['general']['port'])
