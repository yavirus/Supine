from views import (
    create_user
)

BASE_API_URL = '/api/v1'

def setup_routes(app):
    app.router.add_post(BASE_API_URL + '/create-user', create_user)