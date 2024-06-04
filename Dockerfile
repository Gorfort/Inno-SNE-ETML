FROM python
WORKDIR /app
COPY *.py *.txt *.json ./
RUN apt-get update && pip install -r requirements.txt --user -U
CMD [ "python3", "script.py" ]