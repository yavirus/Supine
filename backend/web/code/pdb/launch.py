from .worker import PostgresWorker

async def init_pg(app):
    conf= app['config']['postgres']
    worker = PostgresWorker(**conf)
    app['db'] = worker


async def close_pg(app):
    app['db'].close_connection()