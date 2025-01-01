import os
from flask import Flask, render_template,request, jsonify
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

client = Groq(
    api_key=os.getenv('GROQ_API_KEY'),
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat_completion', methods=['POST'])
def chat_completion():

    user_input = request.json['user_input']

    chat_completion = client.chat.completions.create(
        messages=[
            {
                'role': 'user',
                'content': user_input
            }
        ],
        model="llama-3.3-70b-versatile",
    )

    ai_response = chat_completion.choices[0].message.content

    return jsonify({'ai_response': ai_response})

        




if __name__ == '__main__':
    app.run(debug=True)