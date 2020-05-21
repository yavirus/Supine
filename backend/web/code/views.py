from aiohttp import web
from psycopg2 import connect
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import json


async def save_user(request):
    request_data = await request.json()
    parsed_data = json.loads(request_data)
    save_result = request.app['db'].save_user(parsed_data)
    response = json.dumps(save_result)
    return web.json_response(response)

