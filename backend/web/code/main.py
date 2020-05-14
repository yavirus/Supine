from aiohttp import web
import logging

from routes import setup_routes


from settings import config
from pdb.launch import (
    init_pg, close_pg
)



def init_app():
    app = web.Application()

    app['config'] = config

    app.on_startup.append(init_pg)
    app.on_cleanup.append(close_pg)

    setup_routes(app)

    return app

if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)

    app = init_app()

    web.run_app(app, host=config['general']['host'], port=config['general']['port'])
