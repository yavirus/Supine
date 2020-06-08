from aiohttp import web
from psycopg2 import connect
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import json


async def save_user(request):
    request_data = await request.json()
    save_result = request.app['db'].save_user(request_data)
    response = json.dumps(save_result)
    return web.json_response(response)

async def edit_prof(request):
    request_data = await request.json()
    save_result = request.app['db'].edit_prof(request_data)
    response = json.dumps(save_result)
    return web.json_response(response)

async def get_set_data(request):
    user_data = request.app['db'].get_set_data()
    response = json.dumps(user_data)
    return web.json_response(response)

async def get_prof_data(request):
    user_data = request.app['db'].get_prof_data()
    response = json.dumps(user_data)
    return web.json_response(response)

async def get_pass_data(request):
    curr_pass = request.app['db'].get_pass_data()
    response = json.dumps(curr_pass)
    return web.json_response(response)

async def edit_password(request):
    request_data = await request.json()
    edit_result = request.app['db'].edit_password(request_data)
    response = json.dumps(edit_result)
    return web.json_response(response)