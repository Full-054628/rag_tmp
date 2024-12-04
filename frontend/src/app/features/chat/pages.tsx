"use client";

import styles from './pages.module.css';
import React, { useReducer } from 'react';
import ChatArea from './components/ChatArea';
import RightSidebar from './components/RightSidebar';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

type State = {
  selectedBot: string | null;
  prompt: string;
  responseData: string;
  messages: Message[];
};

type Action =
  | { type: 'SET_BOT'; payload: string }
  | { type: 'SET_PROMPT'; payload: string }
  | { type: 'SET_RESPONSE'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'RESET' };

const initialState: State = {
  selectedBot: null,
  prompt: '',
  responseData: '',
  messages: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_BOT':
      return { ...state, selectedBot: action.payload };
    case 'SET_PROMPT':
      return { ...state, prompt: action.payload };
    case 'SET_RESPONSE':
      return { ...state, responseData: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleBotClick = (botName: string) => {
    dispatch({ type: 'SET_BOT', payload: botName });
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_PROMPT', payload: event.target.value });
  };

  const handlePromptSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    if (state.prompt.trim()) {
      const userMessage: Message = { sender: 'user', text: state.prompt };
      dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
      setIsLoading(true);
      try {
        // TODO: リクエスト先をハードコーディングしない
        const response = await fetch(`${baseUrl}/api/v1/chat/echo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: state.prompt }),
        });
        const data = await response.json();
        const botMessage: Message = { sender: 'bot', text: data.message };
        dispatch({ type: 'SET_RESPONSE', payload: data.message });
        dispatch({ type: 'ADD_MESSAGE', payload: botMessage });
        dispatch({ type: 'SET_PROMPT', payload: '' }); 
      } catch (error) {
        console.error('Failed to send prompt:', error);
        const errorMessage: Message = { sender: 'bot', text: 'error: 繋ぎ込みまだです！！' };
        dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });
        dispatch({ type: 'SET_PROMPT', payload: '' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // API呼び出しの汎用関数
  const handleClick = async (endpoint: string) => {
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`);
      const data = await response.text();
      dispatch({ type: 'SET_RESPONSE', payload: data });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const resetSelection = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <div className={styles.container}>
      {/* サイドバー */}
      <Sidebar
        chatbots={['出張レポート分析bot', 'coming-soon-bot1', 'coming-soon-bot2']} // TODO: chatbot情報はDBで持つようにする
        selectedBot={state.selectedBot}
        onBotClick={handleBotClick}
        onReset={resetSelection}
        className={styles.sidebar}
      />

      {/* メインのチャットエリア */}
      <div className={styles.main}>
        {state.selectedBot ? (
          <ChatArea
            selectedBot={state.selectedBot}
            prompt={state.prompt}
            onPromptChange={handlePromptChange}
            onPromptSubmit={handlePromptSubmit}
            messages={state.messages}
            isLoading={isLoading}
            responseData={state.responseData}
            className={styles.chatArea}
          />
        ) : (
          <WelcomeScreen
            className={styles.welcomeScreen}
          />
        )}
      </div>

      {/* 右サイドバー */}
      <RightSidebar onButtonClick={handleClick} className={styles.rightSidebar} />
    </div>
  );
};

export default App;
