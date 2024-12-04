import React from "react";
import styles from './RightSidebar.module.css';

type RightSidebarProps = {
    onButtonClick: (endpoint: string) => void;
    className?: string;
}

/*TODO: アップロード可能なファイル形式を書いておく */
/*TODO: 禁止ワードはとりあえずメアドとかの個人情報かなー */
const buttons = [
    { label: "禁止ワード登録", endpoint: "register-prohibited-words" },
    { label: "チャットbotを新規作成する", endpoint: "create-new-chatbot" },
    { label: "ファイルをアップロードする", endpoint: "file-upload" },
    { label: "ユーザー情報を管理する", endpoint: "management-users-info" },
];

const RightSidebar: React.FC<RightSidebarProps> = ({ onButtonClick, className }) => {
    return (
        <div className={`${styles.rightSidebar} ${className || ''}`.trim()}>
            {buttons.map((button, index) => (
                <button
                    key={index}
                    onClick={() => onButtonClick(button.endpoint)}
                    aria-label={button.label}
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
};

export default RightSidebar;
