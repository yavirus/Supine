FROM alpine:3.11.6

ENV PYTHONUNBUFFERED 1

COPY entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod u+x /usr/bin/entrypoint.sh

RUN apk update && apk add gcc postgresql-dev musl-dev python3-dev

RUN apk add --no-cache \
        libressl-dev \
        musl-dev \
        libffi-dev\
        jpeg-dev \
        zlib-dev \
        freetype-dev \
        lcms2-dev \
        openjpeg-dev \
        tiff-dev \
        tk-dev \
        tcl-dev \
        harfbuzz-dev \
        fribidi-dev

COPY requirements.txt .
RUN pip3 install --upgrade pip && \
    pip3 install --trusted-host pypi.python.org -r requirements.txt && \
    rm -f requirements.txt


WORKDIR /app

ADD ./code .

ENTRYPOINT [ "/usr/bin/entrypoint.sh" ]

CMD [ "python3", "main.py" ]