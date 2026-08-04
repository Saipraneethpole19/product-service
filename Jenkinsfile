pipeline {
    agent any

    environment {
        SERVICE_NAME = "user-service"
        ECR_REPO     = "<account-id>.dkr.ecr.us-east-1.amazonaws.com/user-service"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/<org>/user-service.git'
            }
        }

        stage('Test') {
            steps {
                sh 'npm install && npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${ECR_REPO}:${BUILD_NUMBER} ."
            }
        }

        stage('Push to ECR') {
            steps {
                sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ECR_REPO}"
                sh "docker push ${ECR_REPO}:${BUILD_NUMBER}"
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh "helm upgrade --install ${SERVICE_NAME} ./helm-charts/${SERVICE_NAME} --set image.tag=${BUILD_NUMBER}"
            }
        }

        stage('Notify') {
            steps {
                echo "Deployment complete: ${SERVICE_NAME} build #${BUILD_NUMBER}"
            }
        }
    }

    post {
        failure {
            echo "Pipeline failed for ${SERVICE_NAME} build #${BUILD_NUMBER}"
        }
    }
}
