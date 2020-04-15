FROM mongo
COPY clients.json /clients.json
CMD mongoimport --host mongo --db totvs --collection clients --type json --file /clients.json --jsonArray