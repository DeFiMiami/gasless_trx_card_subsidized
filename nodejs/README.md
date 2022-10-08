# Install

```shell
yarn install
```

# Run
Dev:
```
yarn start:dev
```

Prod:
```
yarn start
```

# Deploy
## Local
```
npm run build
docker build --tag gasless-trx .
docker images
docker run -p 8001:8001 -d gasless-trx
docker ps
docker stop <container_id>

docker-compose -f docker-compose.dev.yml up --build
```

## Heroku
```
heroku container:push --app gasless-trx web
heroku container:release --app gasless-trx web
heroku open --app gasless-trx
heroku logs --app gasless-trx
```

## Amazon
```
docker push 608789631846.dkr.ecr.us-east-1.amazonaws.com/gasless-trx
```



# Test
See http-request-example.http for HTTP examples.

curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8001/proxy

curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8001/signin

# TODO
- Sign in
 - Sign a message in Metamask
 - ecrecover at the backend and issue JWT token
 - use the JWT token for further calls

- Credit card payment
 - Display Stripe form and accept payment
 - Receive payment confirmation at the backend and update the db (add to balance)

- Subsidize gas cost
 - Proxy receives tx
 - Extract gas cost
 - Send gas amount to the address, update db (substract from balance), confirm it was included to the block
 - Send the original tx
 - Update db (add tx)

- Profile
 - Show list of transactions
 - Credit card balance and payment history
