// pages/Chatbot.js

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "pk-lQmwtSTXCUqXAkPHuNiCpBZebPpTUVdddpEeEFrjwNbPEkfr",
  baseURL: "https://api.pawan.krd/v1/chat/completions",
});

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    setMessages([...messages, { role: 'user', content: message }]);
    const response = await openai.chat.completions.create({
      messages: [...messages, { role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });
    setMessages([...messages, response.choices[0].message]);
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', minHeight: '200px' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.role === 'user' ? <strong>You:</strong> : <strong>Chatbot:</strong>} {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
};

export default Chatbot;
