from flask import Flask, request, redirect
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return {'hello': 'world'}

# get query parameters
# redirect back to dashboard

# asyncio and aiohttp


@app.route('/ouraCallback')
def getAccessCode():
    code = request.args.get('code')
    error = request.args.get('error')
    if (error):
        print('error is:', error)
        return error

    oauth_url = f'https://cloud.ouraring.com/oauth/token?code={code}&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A3002%2FouraCallback'
    response = requests.post(oauth_url, auth=(
        os.getenv('CLIENT_ID'), os.getenv('CLIENT_SECRET')))
    print(response.status_code)
    print('access_token:', response.json())
    responsejson = response.json()

    access_token = responsejson.get('access_token')
    expires_in = responsejson.get('expires_in')
    refresh_token = responsejson.get('refresh_token')

    # refresh token flow
    refresh_url = f'https://cloud.ouraring.com/oauth/token?refresh_token={refresh_token}&grant_type=refresh_token&redirect_uri=http%3A%2F%2Flocalhost%3A3002%2FouraCallback'
    refresh_response = requests.post(refresh_url, auth=(
        os.getenv('CLIENT_ID'), os.getenv('CLIENT_SECRET')))
    print('REFRESHING')
    print('refresh_token', refresh_response.json())

    return redirect(f'http://localhost:3000/dashboard')


if __name__ == '__main__':
    app.run(host="localhost", port=os.getenv('PORT_FLASK'), debug=True)
