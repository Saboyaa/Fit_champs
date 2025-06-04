FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONBUFFERED=1

WORKDIR /code

COPY requirements.txt /code/requirements.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . /code

EXPOSE 8000

CMD ["bash", "-c", "\
      cd /code/app && \
      alembic upgrade head && \
      cd /code && \
      uvicorn app.main:app --host 0.0.0.0 --port 8000 \
    "]