from aiohttp import web
from psycopg2 import connect
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import json
import requests
from aiohttp_session import get_session
from PIL import Image
from PIL import ImageDraw


async def save_user(request):
    request_data = await request.json()
    save_result = request.app['db'].save_user(request_data)
    await new_session(request, save_result)

async def new_session(request, user_id):
    session = await get_session(request)
    exc = web.HTTPFound(location='/')
    exc.set_cookie('user_id', user_id)
    session['user_id'] = user_id
    raise exc

async def get_cookies(request):
    session = await get_session(request)
    user_id = session['user_id']

    if (request.cookies['user_id'] == str(user_id)):
        return user_id
    else:
        return False

async def edit_prof(request):
    user_id = await get_cookies(request)
    request_data = await request.json()
    save_result = request.app['db'].edit_prof(request_data, user_id)
    response = json.dumps(save_result)
    return web.json_response(response)

async def get_set_data(request):
    user_id = await get_cookies(request)
    user_data = request.app['db'].get_set_data(user_id)
    response = json.dumps(user_data)
    return web.json_response(response)

async def get_prof_data(request):
    user_id = await get_cookies(request)
    user_data = request.app['db'].get_prof_data(user_id)
    response = json.dumps(user_data)
    return web.json_response(response)

async def get_pass_data(request):
    user_id = await get_cookies(request)
    curr_pass = request.app['db'].get_pass_data(user_id)
    response = json.dumps(curr_pass)
    return web.json_response(response)

async def edit_password(request):
    user_id = await get_cookies(request)
    request_data = await request.json()
    edit_result = request.app['db'].edit_password(request_data, user_id)
    response = json.dumps(edit_result)
    return web.json_response(response)

async def add_section(request):
    user_id = await get_cookies(request)
    request_data = await request.json()
    add_result = request.app['db'].add_section(request_data, user_id)
    response = json.dumps(add_result)
    return web.json_response(response)

async def get_sec_data(request):
    user_id = await get_cookies(request)
    sec_data = request.app['db'].get_sec_data(user_id)
    response = json.dumps(sec_data)
    return web.json_response(response)

async def add_sub_sec(request):
    user_id = await get_cookies(request)
    request_data = await request.json()
    add_result = request.app['db'].add_sub_sec(request_data, user_id)
    response = json.dumps(add_result)
    return web.json_response(response)

async def upload_avatar(request):
    data = await request.post()

    img_file = data['image'].file
    img_name = data['image'].filename

    image = Image.open(img_file)
    image.save(f'file_storage/avatars/{img_name}')
    return web.json_response(True)
