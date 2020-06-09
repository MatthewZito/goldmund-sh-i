## AWS Deployment via Elastic Beanstalk

1. Navigate to Elastic Beanstalk and create new app
2. Create a web-server environment, multi-container docker, sample app
3. Create Redis ECS instance:
  - 1. 'ElastiCache' -> Redis [new]: Node type: cache.t2.micro .5GiB; Replicas: None 
  - 2. New Subnet Group -> VPC ID: default; subnets: enable all
3. Create VPC-contingent security group and assign to all instances:
  - 1. Nav to VPC dash, ensure VPC is same as EBS instance
  - 2. Security Groups [new] ->  tag/group: VPC; VPC: VPC
  - 3. Inbound Rule [new] -> Protocol: TCP; Port Range: 6379; Source: self 
  - 4. Add new group to ECS, EBS environ

4. Configure process vars with SSM and applicable IAM restrictions (because AWS is embarrassingly slow at properly implementing this feature...but SSM is a start, I suppose)

5. IAM time.
  - 1. IAM [new] -> Type: programmatic; Attachments: primary 

6. Configure Travis CI for automated deployments. I can just add this to my `.travis.yml`:

```
deploy:
  provider: elasticbeanstalk
  region: <MY_VPC_REGION>
  app: <MY_APP_NAME>
  env:  <MY_APP_ENV_NAME>
  bucket_name: <MY_VPC_BUCKET>
  bucket_path: <ARBITRARY_PATH>
  on:
    tag: <REGEX HERE>
  access_key_id: $OH_GOD_THIS_IS_GONNA_SHOW_UP_IN_GOOGLE_DORKS
  secret_access_key: $AND_HOPEFUL_BOTS_WILL_CLONE_THIS_REPO_FOR_NOTHING
```

NOTE: I cannot recall the version of Travis CI for which the dpl script used to handle build/deployment verification is broken. If I encounter a `persistent missing bucket_name` exception, I am using said version.  In order to bypass this (should it arise), I will need to prepend to the aforementioned `deploy` configurations the `edge: true` option. 

This will force Travis to use the v2 (experimental) dpl script, which does not contain this bug.
