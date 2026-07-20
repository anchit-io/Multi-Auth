pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Generate Prisma Client') {
            steps {
                sh 'npx prisma generate'
            }
        }

        stage('Restart Multi Auth') {
            steps {
                sh 'pm2 restart multi-auth || pm2 start server.js --name multi-auth'
            }
        }
    }
}
