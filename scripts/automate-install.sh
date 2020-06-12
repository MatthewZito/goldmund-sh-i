openssl aes-256-cbc -K $encrypted_9f3b5599b056_key -iv $encrypted_9f3b5599b056_iv -in scripts/service-account.json.enc -out service-account.json -d
curl https://sdk.cloud.google.com | bash > /dev/null;
source $HOME/google-cloud-sdk/path.bash.inc
gcloud components update kubectl
gcloud auth activate-service-account --key-file service-account.json
gcloud config set project <PROJECT_ID>
gcloud config set compute/zone <ZONE_STRING>
gcloud container clusters get-credentials <CLUSTER_NAME>
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin