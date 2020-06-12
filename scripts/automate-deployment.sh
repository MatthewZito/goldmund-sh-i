#!/usr/bin/env bash
docker build -t exbotanical/goldmund-api:latest -t exbotanical/goldmund-api:$COMMIT_SHA -f ./packages/goldmund-api/Dockerfile ./packages/goldmund-api
docker build -t exbotanical/goldmund-client:latest -t exbotanical/goldmund-client:$COMMIT_SHA -f ./packages/goldmund-client/Dockerfile ./packages/goldmund-client
docker push exbotanical/goldmund-api:latest
docker push exbotanical/goldmund-client:latest
docker push exbotanical/goldmund-api:$COMMIT_SHA 
docker push exbotanical/goldmund-client:$COMMIT_SHA 
kubectl apply $(ls ./kubernetes/*.yml | awk ' { print " -f " $1 } ')
kubectl set image deployments/goldmund-api-deployment goldmund-api=exbotanical/goldmund-api:$COMMIT_SHA 
kubectl set image deployments/goldmund-client-deployment goldmund-client=exbotanical/goldmund-client:$COMMIT_SHA 
