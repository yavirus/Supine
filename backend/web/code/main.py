from aiohttp import web
import logging
import aiohttp

from routes import setup_routes


from settings import config
from pdb.launch import (
    init_pg, close_pg
)

async def main(app):
    app['PERSISTENT_SESSION'] = session = aiohttp.ClientSession()
    yield
    session.close()

def init_app():
    app = web.Application()

    app['config'] = config

    app.on_startup.append(init_pg)
    app.on_cleanup.append(close_pg)
    app.cleanup_ctx.append(main)

    setup_routes(app)

    return app

if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)

    app = init_app()

    web.run_app(app, host=config['general']['host'], port=config['general']['port'])

    session = main(app)
