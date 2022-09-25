pipeline {
    agent any
    tools {nodejs "nodejs"}
    stages {
        stage('Build') {
            steps {
                sh 'yarn'
                sh 'yarn build:noEslint'
            }
        }
        stage('Deploy'){
            steps {
                sh "chmod +x deploy.sh && ./deploy.sh"
            }
        }
    }
}