import { useState, useRef, useEffect } from 'react';

const TypingEffect = ({ content, onComplete }) => {
    const [displayedContent, setDisplayedContent] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      if (currentIndex < content.length) {
        const timer = setTimeout(() => {
          setDisplayedContent(prevContent => prevContent + content[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, 20);
  
        return () => clearTimeout(timer);
      } else if (onComplete) {
        onComplete();
      }
    }, [content, currentIndex, onComplete]);
  
    return displayedContent;
  };


  export default TypingEffect