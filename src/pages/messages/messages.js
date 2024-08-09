import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import './message.css';
import img from '../../images/Picsart_22-08-28_04-42-23-038.jpg';
import UserChat from './userChat';

const initialMsgs = {
  abdo: [
    { id: 1, text: "Hi", sender: "other" },
    { id: 2, text: "Hello!", sender: "user" },
    { id: 3, text: "How are you?", sender: "other" },
    { id: 4, text: "I'm good, thanks! How about you?", sender: "user" },
    { id: 5, text: "I'm doing well, just busy with work.", sender: "other" },
    { id: 6, text: "I can relate. What kind of work are you doing?", sender: "user" },
    { id: 7, text: "I'm working on a web development project.", sender: "other" },
    { id: 8, text: "That sounds interesting! Frontend or backend?", sender: "user" },
    { id: 9, text: "Mostly frontend. React and Bootstrap.", sender: "other" },
    { id: 10, text: "Nice! I'm also using React in my projects.", sender: "user" },
    { id: 11, text: "Great! React is really powerful.", sender: "other" },
    { id: 12, text: "Absolutely. It makes building UIs so much easier.", sender: "user" },
    { id: 13, text: "By the way, have you tried using Redux?", sender: "other" },
    { id: 14, text: "Yes, I have. It's excellent for state management.", sender: "user" },
    { id: 15, text: "I agree. It simplifies handling global state.", sender: "other" },
    { id: 16, text: "Are you using any other libraries with React?", sender: "user" },
    { id: 17, text: "I'm using React Router for navigation.", sender: "other" },
    { id: 18, text: "That's a must-have for SPA development.", sender: "user" },
    { id: 19, text: "Indeed. What about you?", sender: "other" },
  ],
  ali: [
    { id: 1, text: "Hey, how's it going?", sender: "other" },
    { id: 2, text: "Good, you?", sender: "user" },
  ],
  omar: [
    { id: 1, text: "Are you coming to the meeting?", sender: "other" },
    { id: 2, text: "Yes, I'll be there in 10 minutes.", sender: "user" },
  ],
  // يمكن إضافة المزيد من الرسائل للمستخدمين الآخرين
};

export default function Messages() {
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState('abdo'); // المستخدم المختار
  const [msgs, setMsgs] = useState(initialMsgs[selectedUser] || []); // الرسائل الحالية للمستخدم المختار
  const [searchTerm, setSearchTerm] = useState(''); // حالة البحث

  const chatContainerRef = useRef(null);
  useEffect(() => {
    // تمرير تلقائي إلى آخر رسالة
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [msgs]);

  useEffect(() => {
    // تحقق مما إذا كان هناك رسائل للمستخدم المحدد
    if (initialMsgs[selectedUser]) {
      setMsgs(initialMsgs[selectedUser]);
    } else {
      setMsgs([]); // تفريغ الرسائل إذا لم يكن هناك رسائل للمستخدم المختار
    }
  }, [selectedUser]);

  const handleUserSelection = (user) => {
    setSelectedUser(user); // تغيير المستخدم المختار

    // تحقق مما إذا كان هناك رسائل للمستخدم الجديد، إذا لم يكن هناك رسائل، قم بتفريغ الرسائل
    if (!initialMsgs[user]) {
      setMsgs([]);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: msgs.length + 1,
      text: newMessage,
      sender: 'user',
    };

    // تحديث الرسائل الحالية
    const updatedMsgs = [...msgs, newMsg];
    setMsgs(updatedMsgs);

    // تحديث الرسائل في initialMsgs بشكل دائم
    if (initialMsgs[selectedUser]) {
      initialMsgs[selectedUser] = updatedMsgs;
    } else {
      initialMsgs[selectedUser] = [newMsg];
    }

    setNewMessage('');
  };

  // تصفية الرسائل بناءً على النص الذي يتم البحث عنه
  const filteredMsgs = msgs.filter(msg =>
    msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className='messagePage'>
        <Container>
          <Row className='landing position-relative'>
            <div className='left-chat col-lg-8 col-md-12 col-12 p-3 my-2'>
              <div className='min-header p-2 d-flex justify-content-around align-items-center'>
                <Button>
                  <i className="fa-solid fa-bars text-white fs-4"></i>
                </Button>
                <div className='img-profile'>
                  <img src={img} alt="profile" className='img-fluid rounded-circle' />
                </div>
                <div className='text-name text-white'>
                  <h3>{selectedUser}</h3>
                </div>
                <Button>
                  <i className="fa-solid fa-arrow-right-long text-white fs-4"></i>
                </Button>
              </div>

              <div className='chat-container' ref={chatContainerRef}>
                {filteredMsgs.map(msg => (
                  <div key={msg.id} className={`message ${msg.sender}`}>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>

              <form className='send-message' onSubmit={(e) => e.preventDefault()}>
                <input
                  type='text'
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder='Type a message...'
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </form>

            </div>
            {/* == */}
            <div className='col-lg-4 col-md-12 col-12 p-3 my-2'>
              <div className='search'>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className='all-chat-users'>
                <button onClick={() => handleUserSelection('abdo')} className='users-chat'>
                  <UserChat name={'abdo'} />
                </button>
                <button onClick={() => handleUserSelection('ali')} className='users-chat'>
                  <UserChat name={'ali'} />
                </button>
                <button onClick={() => handleUserSelection('omar')} className='users-chat'>
                  <UserChat name={'omar'} />
                </button>
                <button onClick={() => handleUserSelection('ahmed')} className='users-chat'>
                  <UserChat name={'ahmed'} />
                </button>
                <button onClick={() => handleUserSelection('moamen')} className='users-chat'>
                  <UserChat name={'moamen'} />
                </button>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}
