pipeline {
    agent any

    environment {
        APP_NAME = "multi-auth"
        HEALTH_URL = "https://multiauth-anc.duckdns.org/health"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Prepare Environment') {
            steps {
                sh '''
                cp /home/ubuntu/Multi-Auth/.env .
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                npm install
                npx prisma generate
                '''
            }
        }

        stage('Run Prisma Migrations') {
            steps {
                sh '''
                npx prisma migrate deploy
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                if npm run | grep -q " test"; then
                    npm test
                else
                    echo "No tests found. Skipping."
                fi
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                pm2 restart multi-auth --update-env || pm2 start server.js --name multi-auth --update-env
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 10
                curl --fail https://multiauth-anc.duckdns.org/health
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }

        failure {
            echo 'Deployment Failed!'
        }
    }
}

