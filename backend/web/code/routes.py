from views import (
    save_user,
    get_set_data,
    get_prof_data,
    get_pass_data,
    edit_password,
    edit_prof
)

BASE_API_URL = '/api/v1'

def setup_routes(app):
    app.router.add_post(BASE_API_URL + '/create-user', save_user)
    app.router.add_get(BASE_API_URL + '/get-set-data', get_set_data)
    app.router.add_get(BASE_API_URL + '/get-prof-data', get_prof_data)
    app.router.add_get(BASE_API_URL + '/get-pass-data', get_pass_data)
    app.router.add_post(BASE_API_URL + '/edit-password', edit_password)
    app.router.add_post(BASE_API_URL + '/edit-prof', edit_prof)