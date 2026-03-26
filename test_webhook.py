import requests

user_message = "Create an event for me named 'Meeting with John' on 25th March 2026 at 10:00 AM to 11:00 AM?"

request_message = {"message": user_message}

url = "https://alwaysbehappy.app.n8n.cloud/webhook-test/70dd6b91-f571-430e-bdc6-b15f82d13886"

response = requests.post(url, json=request_message)

print(response.status_code)
print(response.text)
