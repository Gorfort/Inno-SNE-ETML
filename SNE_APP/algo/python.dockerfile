FROM python

WORKDIR /app

COPY *.txt *.py *.json ./

RUN apt-get update && apt-get upgrade -y && pip install -r requirements.txt

CMD [ "python3", "script.py" ]