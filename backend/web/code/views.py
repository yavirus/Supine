from aiohttp import web
from psycopg2 import connect
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import json
import requests

async def save_user(request):
    request_data = await request.json()
    save_result = request.app['db'].save_user(request_data)
    response = json.dumps(save_result)

    session = request.app['PERSISTENT_SESSION']
    async with session.get('http://sup-ine.com') as resp:
        return web.json_response(resp.status)



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

async def add_section(request):
    request_data = await request.json()
    add_result = request.app['db'].add_section(request_data)
    response = json.dumps(add_result)
    return web.json_response(response)

async def get_sec_data(request):
    sec_data = request.app['db'].get_sec_data()
    response = json.dumps(sec_data)
    return web.json_response(response)

async def add_sub_sec(request):
    request_data = await request.json()
    add_result = request.app['db'].add_sub_sec(request_data)
    response = json.dumps(add_result)
    return web.json_response(response)