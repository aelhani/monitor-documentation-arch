### `infra-devops` Description
- **Description**: “Hosts pipelines for managing GKE cluster configuration, networking, monitoring, and CI/CD infrastructure—ensuring the platform supports core services and applications.”

---

### Elements Under `infra-devops`
1. **`cluster-cicd`**:
   - **Purpose**: Provisions/updates GKE cluster.
   - **Repo**: `monitor-cicd-infra-config/terraform/` (Terraform files).
   - **Jenkinsfile**: 
     ```groovy
     stage('Provision GKE') {
         steps {
             sh 'terraform apply -auto-approve'
         }
     }
     ```
2. **`network-cicd`**:
   - **Purpose**: Configures VPC, firewall rules, Ingress.
   - **Repo**: `monitor-cicd-infra-config/network/`.
   - **Jenkinsfile**: 
     ```groovy
     stage('Setup Network') {
         steps {
             sh 'gcloud compute firewall-rules create allow-ingress --allow tcp:80'
         }
     }
     ```
3. **`monitoring-cicd`**:
   - **Purpose**: Deploys Prometheus, Grafana, or GCP Monitoring.
   - **Repo**: `monitor-cicd-infra-config/monitoring/`.
   - **Jenkinsfile**: 
     ```groovy
     stage('Deploy Monitoring') {
         steps {
             sh 'kubectl apply -f monitoring/'
         }
     }
     ```
4. **`pipelines-cicd`**:
   - **Purpose**: Manages Jenkins pipeline scripts (e.g., validates/updates `monitor-cicd-pipelines`).
   - **Repo**: `monitor-cicd-pipelines/jenkins/`.
   - **Jenkinsfile**: 
     ```groovy
     stage('Validate Pipelines') {
         steps {
             sh 'groovy lint user-mgmt/Jenkinsfile'
         }
     }
     ```
5. **`jenkins-backup`**:
   - **Purpose**: Backs up Jenkins config.
   - **Repo**: `monitor-cicd-infra-config/jenkins/`.
   - **Jenkinsfile**: 
     ```groovy
     stage('Backup Jenkins') {
         steps {
             sh 'tar -czf jenkins-backup.tar.gz /var/lib/jenkins/'
             sh 'gsutil cp jenkins-backup.tar.gz gs://jenkins-backups/'
         }
     }
     ```

---

### Why This Fits
- **Infra-DevOps**: Focuses on platform-level stability and CI/CD maintenance—decoupled from app deployments.
