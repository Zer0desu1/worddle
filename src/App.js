import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [inputWord, setInputWord] = useState('');
  const [matchingLetters, setMatchingLetters] = useState([[],[],[],[],[]]);
  const [available, setAvailable] = useState([[],[],[],[],[]]);
  const [tried, setTried] = useState(['','','','','']);
  const[count ,setCount]=useState(0);
  const[result,setResult]=useState('');
  useEffect(() => {
    // Define the function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/greet');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        setWord(data.words);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the function when the component mounts
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setInputWord(event.target.value);
    word.split('').map((letter, index) => (
      console.log(letter,index)
      
    ));
  };

  const handleDisplayWord = () => {
    //setWord(inputWord);
    if(count<5){
      compareLetters();
    availableLetters();
    setCount(count+1)
    const updatedTried = [...tried];
    updatedTried[count] = inputWord;
    setTried(updatedTried);
      if(count==4){
        setResult(word);
      }
      setInputWord('');
    }
    
  };
  const compareLetters = () => {
    if (word.length !== inputWord.length) {
      console.log('Words must have the same length for comparison.');
      return;
    }
  
    setMatchingLetters(prevMatchingLetters => {
      const newMatchingLetters = [...prevMatchingLetters];
      for (let i = 0; i < word.length; i++) {
        const wordLetter = word[i];
        const inputWordLetter = inputWord[i];
  
        if (wordLetter === inputWordLetter) {
          newMatchingLetters[count].push(i);
        }
      }
      return newMatchingLetters;
    });
  };
  const availableLetters = () => {
    if (word.length !== inputWord.length) {
      console.log('Words must have the same length for comparison.');
      return;
    }
  
    setAvailable(prevAvailable => {
      const newAvailable = [...prevAvailable];
      for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < inputWord.length; j++) {
          if (word[i] === inputWord[j] && i !== j) {
            newAvailable[count].push(j);
          }
        }
      }
      return newAvailable;
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>worddle</h1>
        

        <div className="letter-boxes">
          {Array(5).fill('').map((_, index) => (
            <div key={index} className={`letter-box ${matchingLetters[0].includes(index) ? 'green' : available[0].includes(index)?'yellow':'' }`}>
              {tried[0][index]}
            </div>
          ))}
        </div>
        <div className="letter-boxes">
          {word.split('').map((letter, index) => (
            <div key={index} className={`letter-box ${matchingLetters[1].includes(index) ? 'green' : available[1].includes(index)?'yellow':'' }`}>
              {tried[1][index]}
            </div>
          ))}
        </div>
        <div className="letter-boxes">
          {Array(5).fill('').map((_, index) => (
            <div key={index} className={`letter-box ${matchingLetters[2].includes(index) ? 'green' : available[2].includes(index)?'yellow':'' }`}>
              {tried[2][index]}
            </div>
          ))}
        </div>
        <div className="letter-boxes">
          {Array(5).fill('').map((_, index) => (
            <div key={index} className={`letter-box ${matchingLetters[3].includes(index) ? 'green' : available[3].includes(index)?'yellow':'' }`}>
              {tried[3][index]}
            </div>
          ))}
        </div>
        <div className="letter-boxes">
          {Array(5).fill('').map((_, index) => (
          <div
            key={index}
            className={`letter-box ${matchingLetters[4].includes(index) ? 'green' : available[4].includes(index)?'yellow':'' }`}
        >
            {tried[4][index]}
          </div>
        ))}
        </div>



        <textarea
          placeholder="Enter a word"
          value={inputWord}
          onChange={handleInputChange}
        />
        <button onClick={handleDisplayWord}>Display Word</button>
        <h>{inputWord}</h>
         <div>
          <h>{result}</h>
          </div> 
      </header>
    </div>
  );
}

export default App;