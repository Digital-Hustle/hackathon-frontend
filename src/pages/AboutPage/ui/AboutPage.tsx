import React, { memo, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from "widgets/Page/Page";
import { Client, StompSubscription } from '@stomp/stompjs';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "shared/const/localstorage";

const SERVER_URL = "ws://10.165.8.60:8081/ws";
const DESTINATION = `/chat/14`;
const SEND_DESTINATION = "/app/sendMessage";

const AboutPage: React.FC = () => {
    const { t } = useTranslation('about');

    const [messages, setMessages] = useState<{ nickname: string, content: string }[]>([]);
    const [message, setMessage] = useState('');
    const [nickname, setNickname] = useState('');
    const [chatId, setChatId] = useState(14);

    const clientRef = useRef<Client | null>(null);
    const subscriptionRef = useRef<StompSubscription | null>(null);

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: SERVER_URL,
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log('✅ WebSocket (STOMP) подключен');
                subscriptionRef.current = stompClient.subscribe(DESTINATION, (message) => {
                    try {
                        const receivedMessage: { nickname: string; content: string } = JSON.parse(message.body);
                        console.log('📥 Получено сообщение:', receivedMessage);
                        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                    } catch (error) {
                        console.error('Ошибка обработки сообщения (STOMP):', error);
                    }
                });
                clientRef.current = stompClient;
            },
            onStompError: (frame) => {
                console.error('❌ STOMP Ошибка:', frame.headers['message'], frame.body);
            },
        });

        stompClient.activate();

        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
            if (stompClient) {
                stompClient.deactivate().then(() => console.log('🔌 WebSocket (STOMP) отключен'));
            }
        };
    }, []);

    const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        if (message.trim() && clientRef.current) {
            const token = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
            if (token) {
                const messageBody = JSON.stringify({
                    chatId: chatId,
                    messageText: message,
                    senderName: "dyrak",
                });

                console.log('📨 Отправка сообщения (STOMP):', messageBody);

                clientRef.current.publish({
                    destination: SEND_DESTINATION,
                    body: messageBody,
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessage('');
            } else {
                console.warn('⚠️ Токен не найден в localStorage!');
            }
        } else {
            console.warn('⚠️ WebSocket (STOMP) не подключен!');
        }
    };

    const getSendFrame = (chatId: number, message: string, senderName: string, token: string) => {
        console.log('чатайди', chatId);
        console.log('текст', message);
        console.log('сендер', senderName);
        return `SEND\n` +
            `destination:/app/sendMessage\n` +
            `content-type:application/json\n` +
            `Authorization:Bearer ${token}\n\n` +
            `{\n` +
            `  "chatId": ${chatId},\n` +
            `  "messageText": "${message}",\n` +
            `  "senderName": "${senderName}"\n` +
            `}\n\u0000`;
    };

    return (
        <Page>
            <div>
                <input type="text" placeholder="Введите ник" value={nickname} onChange={handleNickNameChange} />
                <input type="text" placeholder="Введите сообщение" value={message} onChange={handleMessageChange} />
                <button onClick={sendMessage}>Отправить</button>

                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>{msg.nickname}:</strong> {msg.content}
                        </li>
                    ))}
                </ul>
            </div>
        </Page>
    );
};

export default memo(AboutPage);