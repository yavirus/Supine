from aiohttp import web
from psycopg2 import connect
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import json
import requests
from aiohttp_session import get_session
from PIL import Image
import uuid
import base64





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
    data = await request.post()
    try:
        img_file = data['image'].file
        img_name = uuid.uuid4()
        url = f'file_storage/sections/{img_name}.png'

        sec_title = data['title']

        image = Image.open(img_file)
        image.save(url)
        add_result = request.app['db'].add_section(sec_title, user_id, url)

        return web.Response()
    except:
        sec_title = data['title']

        add_result = request.app['db'].add_section(sec_title, user_id, '')

        return web.Response()



async def add_text_section(request):
    user_id = await get_cookies(request)
    data = await request.json()
    add_result = request.app['db'].add_text_section(data, user_id)

    return web.Response()


async def get_sec_data(request):
    user_id = await get_cookies(request)
    sec_data = request.app['db'].get_sec_data(user_id)
    data = {}
    for key in sec_data:
        if key[1] == "" or key[1] == '""':
            data[str([key[0], key[2]])] = sec_data[key]
            for sub_key in sec_data[key]:
                if(sec_data[key][sub_key] != "" and
                        sec_data[key][sub_key] != '""'):
                    sub_url = sec_data[key][sub_key]
                    with open(sub_url, 'rb') as f:
                        sub_img = f.read()
                        sub_image = base64.b64encode(sub_img)

                        sec_data[key][sub_key] = str(sub_image)

                else:
                    sec_data[key][sub_key] = ''

        else:
            url = key[1]
            with open(url, 'rb') as f:
                img = f.read()
                image = base64.b64encode(img)

                data[str([key[0], image, key[2]])] = sec_data[key]

            for sub_key in sec_data[key]:
                if sec_data[key][sub_key] != '""':
                    sub_url = sec_data[key][sub_key]
                    with open(sub_url, 'rb') as f:
                        sub_img = f.read()
                        sub_image = base64.b64encode(sub_img)

                        sec_data[key][sub_key] = str(sub_image)

                else:
                    sec_data[key][sub_key] = ''

            
    response = json.dumps(data)
    return web.json_response(response)


async def add_sub_sec(request):
    user_id = await get_cookies(request)
    data = await request.post()

    try:
        img_file = data['image'].file
        img_name = uuid.uuid4()
        url = f'file_storage/sub_sections/{img_name}.png'

        sec_id = data['sec_id']
        sec_title = data['title']

        image = Image.open(img_file)
        image.save(url)

        request.app['db'].add_sub_sec(sec_id, sec_title, url, user_id)

        return web.Response()
    except Exception:
        sec_title = data['title']
        sec_id = data['sec_id']

        request.app['db'].add_sub_sec(sec_id, sec_title, '', user_id)

        return web.Response()


async def upload_avatar(request):
    data = await request.post()
    user_id = await get_cookies(request)

    img_file = data['image'].file
    img_name = uuid.uuid4()
    url = f'file_storage/avatars/{img_name}.png'

    image = Image.open(img_file)
    image.save(url)
    result = request.app['db'].save_avatar(url, user_id)
    return web.Response()


async def get_av_data(request):
    user_id = await get_cookies(request)
    try:
        url = request.app['db'].get_av_data(user_id)
        with open(url, 'rb') as f:
            image = f.read()

        return web.Response(body=image, content_type='image/jpeg')

    except Exception as e:
        return web.json_response('Image not found')

async def get_all_posts(request):
    result = request.app['db'].get_all_posts()

    return web.json_response(json.dumps(result))




