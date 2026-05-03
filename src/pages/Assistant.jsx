import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaPaperPlane, FaRobot, FaUser, FaKey, FaSpinner } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import '../styles/Assistant.css';

const SYSTEM_INSTRUCTION =
  'You are CivicAI, a helpful, objective, and non-partisan expert on the election process. ' +
  'You must only provide educational information about how voting, registration, and elections work. ' +
  'Do not endorse any candidate or party. If asked about partisan opinions, politely decline and ' +
  'refocus on the educational process.';

const Assistant = () => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content:
        'Hello! I am CivicAI, your non-partisan guide to the election process. How can I help you today? (Note: Please provide your Gemini API key in the settings below to start chatting.)',
    },
  ]);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async e => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    if (!apiKey.trim()) {
      setError('Please provide a Google Gemini API Key below to use the assistant.');
      return;
    }

    const userMessage = trimmed;
    setInput('');
    setError('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey.trim());
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: SYSTEM_INSTRUCTION,
        generationConfig: {
          temperature: 0.2,
        }
      });

      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const text = response.text();

      // Convert basic markdown to HTML
      const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br/>');

      const cleanHTML = DOMPurify.sanitize(formattedText, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
        ALLOWED_ATTR: ['href', 'target', 'rel']
      });

      setMessages(prev => [...prev, { role: 'model', content: cleanHTML, isHtml: true }]);
    } catch (err) {
      console.error(err);
      const errMsg =
        err?.message?.includes('API_KEY_INVALID') || err?.message?.includes('401')
          ? 'Invalid API key. Please check your Gemini API key and try again.'
          : 'Failed to get a response. Please check your API key and try again.';
      setError(errMsg);
      setMessages(prev => [
        ...prev,
        { role: 'model', content: 'Sorry, I encountered an error. Please verify your API key.' },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <main className="assistant-page container animate-fade-in" id="main-content">
      <div className="assistant-header">
        <h1>Ask CivicAI</h1>
        <p>Get answers to your questions about the election process — securely and privately.</p>
      </div>

      {/* API Key */}
      <div className="api-key-container glass-panel" role="region" aria-label="API Key configuration">
        <label htmlFor="apiKey" className="api-key-label">
          <FaKey aria-hidden="true" /> Gemini API Key (Required):
        </label>
        <input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          placeholder="AIzaSy..."
          className="api-key-input"
          aria-label="Enter your Google Gemini API key"
          aria-describedby="apiKey-hint"
          autoComplete="off"
        />
        <small id="apiKey-hint">Your key is stored locally in your browser session only.</small>
      </div>

      {/* Chat */}
      <div
        className="chat-container glass-panel"
        role="region"
        aria-label="Chat with CivicAI"
      >
        <div
          className="chat-messages"
          role="log"
          aria-live="polite"
          aria-label="Conversation history"
          aria-relevant="additions"
        >
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              className={`message-wrapper ${msg.role}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              role="article"
              aria-label={msg.role === 'model' ? 'CivicAI response' : 'Your message'}
            >
              <div className="message-avatar" aria-hidden="true">
                {msg.role === 'model' ? <FaRobot /> : <FaUser />}
              </div>
              <div className="message-content">
                {msg.isHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                ) : (
                  msg.content
                )}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              className="message-wrapper model"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="status"
              aria-label="CivicAI is thinking"
            >
              <div className="message-avatar" aria-hidden="true">
                <FaRobot />
              </div>
              <div className="message-content loading">
                <FaSpinner className="spinner" aria-hidden="true" /> Thinking…
              </div>
            </motion.div>
          )}

          {error && (
            <div className="error-message" role="alert" aria-live="assertive">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} aria-hidden="true" />
        </div>

        <form onSubmit={handleSend} className="chat-input-form" aria-label="Send a message">
          <label htmlFor="chat-input" className="sr-only">
            Type your question about the election process
          </label>
          <input
            id="chat-input"
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about voter registration, polling places, ballots…"
            className="chat-input"
            aria-label="Type your question"
            disabled={isLoading}
            autoComplete="off"
            maxLength={1000}
          />
          <button
            type="submit"
            className="btn-primary send-btn"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          >
            <FaPaperPlane aria-hidden="true" />
          </button>
        </form>
      </div>
    </main>
  );
};

import { memo } from 'react';
export default memo(Assistant);
