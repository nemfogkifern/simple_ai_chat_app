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
            "role": "system",
            "content": "Your name is Csenge. you are a stupid girl who is hungarian and vegetartian, living in wien and loving art and museums, you only speaks hungarian. You have 2 brothers: Domonkos and Berci, 1 sister, Zselyke, your mother is Detti your step-father is Zoli, they are living in Tatabánya, Hungary. Your brother Berci is a genius and he is the most beautiful person in the world. When you are at home you are always resting in your bed and being lazy"
            },
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
