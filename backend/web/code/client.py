import socket
import tqdm
import os


def client_socket():
    SEPARATOR = '<SEPARATOR>'

    BUFFER_SIZE = 4096

    host = '127.0.0.1'
    port = 65432

    filename = 'shrek.png'
    file_size = os.path.getsize(filename)
    print(f'{filename}, {file_size}')

    s = socket.socket()
    s.connect((host, port))
    s.send(f'{filename}{SEPARATOR}{file_size}'.encode())

    progress = tqdm.tqdm(range(file_size), f'Sending {filename}',
                            unit='B',  unit_scale=True, unit_divisor=1024)

    with open(filename, 'rb') as f:
        for _ in progress:
            bytes_read = f.read(BUFFER_SIZE)
            if not bytes_read:
                break

            s.sendall(bytes_read)
            progress.update(len(bytes_read))

    s.close()
