# Running Typescript on AWS Lambda and API Gateway by Serverless Framework

This code helps deploying the sample CRUD typescript app to AWS lambda using Serverless framework. 

# Getting Started

Before you continue, please clone this repository to your local machine.

```sh
# Change directory to your preferred location
cd <local dev path>

# Clone the repo
git clone https://github.com/vedsingh-fullstack/serverless-typescript.git

# Alternatively, with SSH,
git clone git@github.com:vedsingh-fullstack/serverless-typescript.git
```


## Installation Instructions

Install the packages via NPM

```sh
npm install
```

## Testing the services locally

We can test the functions locally using serverless offline command with local dynamodb setup

```sh

serverless offline start

```

We can also test already deployed function locally using serverless cli

```sh

sls invoke -f function-name

```
## Deploying the function to Lambda using serverless cli

We can deploy all the function at once to serverlss using ```sls deploy```,


```sh

sls deploy --aws-profile profile_name

```

We can also deploy individual function which is quicker,

```sh

sls deploy function --function function-name --aws-profile profile_name

```

