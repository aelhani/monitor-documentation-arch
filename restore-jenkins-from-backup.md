Backing up the **entire `/var/lib/jenkins`** directory is the **recommended and most complete** way to preserve your Jenkins configuration, including jobs, credentials, build history, plugin settings, and SSH keys. You're on the right track.

---

### ✅ What’s included in `/var/lib/jenkins`

* **`config.xml`** – global config
* **`jobs/`** – all job configs
* **`plugins/`** – installed plugin data
* **`credentials.xml`** – stored credentials (including SSH keys)
* **`secrets/`** – encrypted secrets and keys to unlock credentials
* **`nodes/`** – agent configs
* **`users/`** – user accounts
* **SSH keys** stored via Jenkins credentials manager (linked via `credentials.xml` + `secrets/`)

---

### ⚠️ Important When Restoring to a New Server

#### 1. ✅ **Permissions**

Ensure correct ownership after restore:

```bash
chown -R jenkins:jenkins /var/lib/jenkins
```

#### 2. ✅ **Java & Jenkins version match**

* Install the **same Jenkins version** or newer (don't go backward).
* Jenkins may fail to load if plugin or core version is too different.

#### 3. ✅ **Plugins**

* After restoring, Jenkins may complain about missing plugins.
* Run Jenkins once with `--enable-future-java` or manually install missing plugins if needed.

#### 4. ✅ **SSH keys for GitHub**

* If your SSH credentials were stored in Jenkins' credentials manager:

  * They’ll be restored **only if** both `credentials.xml` and the `secrets/` folder are intact.
  * No need to re-add keys if you restore those correctly.

#### 5. ✅ **New server SSH access**

* Ensure the new server has the **private key** that matches the **public key in GitHub**.
* Jenkins itself doesn’t need the key under `~/.ssh` if it's stored as a credential, but:

  * If your pipeline uses Git via command line (not Git plugin), you might still need it in `~jenkins/.ssh/id_rsa`.

#### 6. ✅ **Hostname/IP differences**

* If your jobs refer to a fixed IP or hostname (for agents or SCM), update those.

---

### 🛠️ Restore Steps Summary

1. Install Jenkins (same or newer version).
2. Stop Jenkins:

   ```bash
   systemctl stop jenkins
   ```
3. Restore your backup:

   ```bash
   cp -r /your-backup/* /var/lib/jenkins/
   chown -R jenkins:jenkins /var/lib/jenkins
   ```
4. Start Jenkins:

   ```bash
   systemctl start jenkins
   ```
