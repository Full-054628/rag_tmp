import React from 'react';
import styles from './ChatArea.module.css';

type ChatAreaProps = {
  selectedBot: string;
  prompt: string;
  onPromptChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPromptSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  messages: Message[];
  isLoading: boolean;
  responseData: string;
  className?: string;
};

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const ChatArea: React.FC<ChatAreaProps> = ({
  selectedBot,
  prompt,
  onPromptChange,
  onPromptSubmit,
  messages,
  isLoading,
  responseData,
  className,
}) => {
  // 最新メッセージに自動スクロール
  const chatBodyRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className={`${styles.chatArea} ${className || ''}`.trim()}>
      <div className={styles.chatHeader}>
        <h3>会話中: {selectedBot}</h3>
      </div>
      <div className={styles.chatBody} ref={chatBodyRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              message.sender === 'user' ? styles.userMessage : styles.botMessage
            }`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className={styles.loading}>
            <span className={styles.loader}></span>
            <span>応答を生成中...</span>
          </div>
        )}
      </div>
      <div className={styles.chatPrompt}>
        <form onSubmit={onPromptSubmit} className={styles.promptForm}>
          <input
            type="text"
            value={prompt}
            onChange={onPromptChange}
            placeholder="プロンプトを入力してください"
            className={styles.promptInput}
          />
          <button type="submit" className={styles.promptButton} disabled={isLoading}>
            <span role="img" aria-label="send">
              🚀
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
