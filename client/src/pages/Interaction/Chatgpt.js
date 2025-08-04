import React, { useState, useEffect, useRef } from "react";
import { Modal, Avatar, Input } from "antd";
import "./Chatgpt.css";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import chatgpt from "../../assests/chatgpt.png"; // Make sure to import the image
import { API_BASE_URL } from "../../config/api";

const ChatGPT = () => {
  const [isModalVisible, setIsModalVisible] = useState(true); // Start with modal visible
  const [conversation, setConversation] = useState([]);
  const [userQuestion, setUserQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAskQuestion = async () => {
    if (userQuestion.length === 0) return;

    // Add user question to conversation
    const updatedConversation = [
      ...conversation,
      { role: "user", content: userQuestion },
    ];
    setConversation(updatedConversation);
    setUserQuestion("");

    // Fetch answer from ChatGPT
    setLoading(true);
    const url = "https://chatgpt-42.p.rapidapi.com/gpt4";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "c31e37b590msh53493f64684660cp15092ajsn8c95da3fe0c6",
        "X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: userQuestion }],
        web_access: false,
      }),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      const chatGPTAnswer = result.result;
      // Add chatbot answer to conversation
      updatedConversation.push({ role: "chatbot", content: chatGPTAnswer });
      setConversation(updatedConversation);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get response from AI");
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleAskQuestion();
    }
  };

  return (
    <Modal
      title={
        <div className="chatgpt-modal-header">
          <Avatar 
            src={chatgpt} // Use the imported chatgpt image
            alt="ChatGPT" 
            className="chatgpt-avatar" 
          />
          <span className="chatgpt-title">AI Assistant</span>
        </div>
      }
      open={isModalVisible}
      onCancel={handleCancel}
      width={600}
      footer={null}
      className="chatgpt-modal"
    >
      <div className="conversation-container">
        {conversation.length === 0 ? (
          <div className="empty-conversation">
            <div className="empty-icon">🤖</div>
            <h3>How can I help you today?</h3>
            <p>Ask me anything about programming, coding, or technology!</p>
          </div>
        ) : (
          conversation.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-container">
                {message.role === "user" ? (
                  <div className="user-icon">
                    <Avatar
                      src={`${API_BASE_URL}/auth/get-userPhoto/${auth.user._id}`}
                      className="user-avatar"
                    />
                  </div>
                ) : (
                  <div className="chatbot-icon">
                    <Avatar src={chatgpt} className="chatbot-avatar" />
                  </div>
                )}
                <div className="bubble-container">
                  <div className="message-bubble">
                    <div className="message-content">{message.content}</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <Input
          className="question-input"
          type="text"
          placeholder="Type your question here..."
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button
          className="ask-button"
          onClick={handleAskQuestion}
          disabled={loading || !userQuestion.trim()}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
    </Modal>
  );
};

export default ChatGPT;



