import React from 'react';
import styles from './Sidebar.module.css';

type SidebarProps = {
  chatbots: string[];
  selectedBot: string | null;
  onBotClick: (botName: string) => void;
  onReset: () => void;
  className?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ chatbots, selectedBot, onBotClick, onReset, className }) => {
  return (
    <div className={`${styles.sidebar} ${className || ''}`.trim()}>
      <div className={styles.sidebarHeader} onClick={onReset}>
        SK RAG SYSTEM -inDev
      </div>
      <ul className={styles.list}>
        {chatbots.map((bot) => (
          <li
            key={bot}
            className={`${styles.listItem} ${selectedBot === bot ? styles.selected : ''}`}
            onClick={() => onBotClick(bot)}
          >
            {bot}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
