from aiohttp import web
from psycopg2 import connect
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT


async def save_user(request):
    request_data = await request.json()
    save_result = request.app['db'].save_user(request_data)
    return web.json_response(save_result)

