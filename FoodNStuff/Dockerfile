FROM python:3.8

# directory on the container where the application files will be
WORKDIR /app


# copy requirements file into dogapp directory
COPY requirements.txt /app/
# --no-cache-dir to keep container light, no cache needed here as far as I know
RUN pip install --no-cache-dir -r requirements.txt


# copy project files into container app directory
COPY . /app/

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]