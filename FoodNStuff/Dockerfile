FROM python:3.8

# directory on the container where the application files will be
WORKDIR /FoodNStuff


# copy requirements file into dogapp directory
COPY requirements.txt /FoodNStuff/
# --no-cache-dir to keep container light, no cache needed here as far as I know
RUN pip install --no-cache-dir -r requirements.txt


# copy project files into container app directory
COPY . /FoodNStuff/


CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]