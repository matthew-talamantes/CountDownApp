FROM python:3.11

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY countdown/ ./countdown

EXPOSE 8000
EXPOSE 3030
WORKDIR /usr/src/app/countdown