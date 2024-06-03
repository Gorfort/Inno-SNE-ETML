import json

with open("data.json", "r", encoding='utf-8') as file:
    data = json.load(file)

for key in data:
   print('key : ' + key + ", value : " + data[key])