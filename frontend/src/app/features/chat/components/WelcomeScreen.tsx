import React from "react";
import styles from "./WelcomeScreen.module.css";
import Image from 'next/image';

type WelcomeScreenProps = {
    className?: string;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ className }) => {
    return (
        <div className={`${styles.welcomeScreen} ${className || ''}`.trim()}>
            <Image 
                src="/test.png" 
                alt="Rag Demo Logo" 
                width={200} 
                height={200} 
                className={styles.logo} 
            />
            <p className={styles.welcomeText}>チャットbotを選択してください</p>
        </div>
    );
};

export default WelcomeScreen;
