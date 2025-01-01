




document.body.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('send-button').click();
    }
});


document.getElementById('clear-button').addEventListener('click', function() {
    let chatbox = document.getElementById('chatbox');
    chatbox.innerHTML = '';
});

var j = 0;

document.getElementById('send-button').addEventListener('click', function() {
    chatbox.scrollTop = chatbox.scrollHeight;
    
    
    const user_input = document.getElementById('user_input').value;
    document.getElementById('user_input').value = '';

    createChatBubbleUser(user_input);

    fetch('/chat_completion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_input })
        })
        .then(response => response.json())
        .then(data => {
            let response = data.ai_response;


            var speed = 20;
            var i = 0;
            if (response.length > 400) {
                speed = 1;
            }

            let chatbox = document.getElementById('chatbox');
            let chatBubble = document.createElement('div'); 
            chatBubble.classList.add('chat-bubble-bot');
            chatBubble.id = `bot${j}`;
            chatbox.appendChild(chatBubble);
            let id = `bot${j}`;

            
            function typeWriter() {
                
                if (i < response.length) {
                    document.getElementById(id).textContent += response.charAt(i);
                    i++;
                    console.log(i);
                    if (chatbox.scrollHeight - chatbox.scrollTop > 50) {
                        chatbox.scrollTop = chatbox.scrollHeight;
                        console.log(chatbox.scrollTop);
                    }

                    setTimeout(typeWriter, speed);
                }
            }
            typeWriter();

            j++;
            

        });

});


function createChatBubbleUser(content) {
    let chatbox = document.getElementById('chatbox');
    let chatBubble = document.createElement('div'); 
    chatBubble.classList.add('chat-bubble-user');
    chatBubble.innerHTML = content;
    chatbox.appendChild(chatBubble);
}

function createChatBubbleBot(content) {
    let chatbox = document.getElementById('chatbox');
    let chatBubble = document.createElement('div'); 
    chatBubble.classList.add('chat-bubble-bot');
    chatBubble.innerHTML = content;
    chatbox.appendChild(chatBubble);
}

