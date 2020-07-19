import socket
import tqdm
import os

import uuid


def server_socket():
    SERVER_HOST = "0.0.0.0"
    SERVER_PORT = 65432

    BUFFER_SIZE = 4096
    SEPARATOR = "<SEPARATOR>"

    s = socket.socket()
    s.bind((SERVER_HOST, SERVER_PORT))

    s.listen(5)
    print(f'[*] Listening as {SERVER_HOST}:{SERVER_PORT}')



    client_socket, address = s.accept()
    print(f'[+] {address} is connected')

    received = client_socket.recv(BUFFER_SIZE).decode()
    file_name, file_size = received.split(SEPARATOR)
    file_name = os.path.basename(file_name)
    file_size = int(file_size)
    print(f'{file_name}, {file_size}')

    progress = tqdm.tqdm(range(file_size), f'Receiving {file_name}',
                            unit='B', unit_scale=True, unit_divisor=1024)

    img_name = uuid.uuid4()
    url = f'file_storage/avatars/{img_name}.png'

    with open(url, 'xb') as f:
        for _ in progress:
            bytes_read = client_socket.recv(BUFFER_SIZE)
            if not bytes_read:
                break

            progress.update(len(bytes_read))
            f.write(bytes_read)

    client_socket.close()
    s.close()
