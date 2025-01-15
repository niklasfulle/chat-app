# Bereitstellung der Webanwendung lokal

Um die Anwendung lokal auszuführen, werden Docker und Docker Compose benötigt. Nachdem überprüft wurde, ob beide Tools installiert sind, reicht es in den chat-app Ordner zu gehen und

```
docker compose up
```

auszuführen. Docker Compose erstellt alle Container und baut das Netzwerk zwischen ihnen. Auf http://localhost:4173 ist die Chat-App dann erreichbar.

# Bereitstellung der Webanwendung bei AWS

Um die Anwendung bei AWS zu deployen, wird ein AWS Account, ein IAM Nutzer und ein Sicherheitsschlüssel (ssh-Key) bei AWS benötigt. Auf dem lokalen System muss die AWS CLI mit den IAM-Nutzerdaten konfiguriert und Terraform und Ansible installiert sein. Für Ansible muss noch ein Ansible Vault erstellt werden, in dem die IAM-Nutzerdaten gespeichert werden.

## Terraform

Mit diesem Befehl werden alle von Terraform benötigten Module heruntergeladen. Dazu muss in den terraform Ordner gewechselt werden.

```
terraform init
```

Mit diesem Befehl wird aufgezeigt, welche Services Terraform bei AWS erstellt oder nutzen wird.

```
terraform plan
```

Dieser Befehl führt letztendlich die Konfiguration durch und erstellt die Instanz bei AWS

```
terraform apply
```

## Ansible

Sobald die Instanz erstellt wurde, gibt Terraform die öffentliche IP-Adresse des Servers aus, diese muss in die hosts Datei von Ansible kopiert werden.
Nachdem in den ansible Ordner gewechselt wurde, kann mit diesem Befehl der Setup-Prozess gestartet werden.

```
ansible-playbook --ask-vault-pass setup.yml -i hosts -e 'ansible_python_interpreter=/usr/bin/python3'
```

Sobald der Setup-Prozess durchgelaufen ist kann mit diesem Befehl die Webanwendung gestartet werden.

```
ansible-playbook --ask-vault-pass start.yml -i hosts -e 'ansible_python_interpreter=/usr/bin/python3'
```

Nachdem dieser Prozess beendet wurde, wird die URL der Webanwendung, bestehend aus der IP-Adresse des Servers und dem Port, ausgegeben.

# Beenden der Webanwendung

Um die Wenanwendung zu beenden gibt es zwei Befehle, einmal um dem Ansible Part zu beenden, dieser kann aber auch übersprungen werden, wenn die ganze Infrastruktur beendet werden soll.

## Ansible

Hier werden die Docker Container beendet und gelöscht.

```
ansible-playbook --ask-vault-pass stop.yml -i hosts -e 'ansible_python_interpreter=/usr/bin/python3'
```

## Terraform

Hier wird die Infrastruktur heruntergefahren und gelöscht

```
terraform destroy
```
