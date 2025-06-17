//ॐ गं गणपतये नमः
import React from "react";
import "./App.css";
import { useState, useEffect } from 'react';
import logo from "./images/ChatGPT-Logo.png";
import edit from "./images/edit.png";
import send from "./images/up-arrow.png";


export default function App() {
 
  const [isTyping, setIsTyping] = useState(false);
  const [MainVisible, setMainVisible] = useState(true);
  const [textInputValue, setTextInputValue] = useState("");
  const[message,setMessage]=useState(null)
  const[previousChats,setPreviousChats]=useState([])
  const[currentTitle, setCurrentTitle]=useState(null)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && textInputValue.trim() !== '') {
      submit();
    }
  };
  
 const createNewChat=()=>{
  setMainVisible(true);
    
    setMessage(null)
    setTextInputValue("")
    setCurrentTitle(null)
  }
  const handleClick=(uniqueTitle)=>{
    setCurrentTitle(uniqueTitle)
    setMainVisible(false);
  }
  const submit = async() => {
    await getMessages();
    visibility();
    
      setTextInputValue(''); // Clear the text input value
    
  };
  const visibility=()=>{
    if(textInputValue==""){
      setMainVisible(true);
    }
    else{
      setMainVisible(false);
    }
  }
  const getMessages = async () => {
    setIsTyping(true); // Start typing effect
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: textInputValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch("http://localhost:8000/completions", options);
      const data = await response.json();
      console.log(data);
      setMessage(data.choices[0].message); // Assuming you want the first choice
      setIsTyping(false); // End typing effect
    } catch (error) {
      console.error(error);
      setIsTyping(false); // Ensure typing effect ends even on error
    }
  };
  useEffect(()=>{
    if(!currentTitle&&textInputValue&&message){
      setCurrentTitle(textInputValue)
    }
    if(currentTitle&& textInputValue&& message){
      let index=0;
      setPreviousChats(prevChats=>(
        [...prevChats,
          
        {
          key: `${currentTitle}-${message.role}-${index}`,
          title:currentTitle,
          role:"You",
          content:textInputValue
        },
        {
          key: `${currentTitle}-${message.role}-${index+1}`,
          title:currentTitle,
          role:"ChatGPT",
          content:message.content
        }
      ]
      ))
    }
    
  },[message,currentTitle])
  const currentChat=previousChats.filter(previousChat=>previousChat.title===currentTitle)
  const uniqueTitles=Array.from(new Set(previousChats.map(previousChat=>previousChat.title)))
  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem("chats")) || [];
    setPreviousChats(storedChats);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(previousChats));
  }, [previousChats]);
 
  const prompts = [
    "Simplify the theory of relativity.",
    "Explore climate change's effects on the environment.",
    "Outline photosynthesis in plants.",
    "Delve into the ethical dilemmas of genetic engineering.",
    "Break down artificial intelligence and its applications.",
    "Uncover the history of the Roman Empire.",
    "Highlight the advantages of renewable energy sources.",
    "Detail the structure of a typical animal cell.",
    "Illustrate the concept of supply and demand in economics.",
    "Weigh the pros and cons of social media in society.",
    "Navigate through the major events of World War II.",
    "Examine the significance of biodiversity in ecosystems.",
    "Demystify quantum computing.",
    "Probe the impact of social inequality on communities.",
    "Track the process of evolution through natural selection.",
    "Decode the key principles of democracy.",
    "Demystify blockchain technology and its applications.",
    "Journey through the history and culture of ancient Egypt.",
    "Clarify the principles of sustainable agriculture.",
    "Unravel the role of neurotransmitters in the brain.",
    "Elaborate on machine learning and its applications.",
    "Unearth the causes and consequences of the Industrial Revolution.",
    "Sketch the structure and function of DNA.",
    "Scrutinize the ethical issues surrounding artificial intelligence.",
    "Dive into the Big Bang theory and the universe's origin.",
    "Examine the impact of globalization on the world economy.",
    "Detail the major functions of the human digestive system.",
    "Analyze the key factors influencing climate change.",
    "Illuminate the theory of natural selection.",
    "Explore the history and significance of the Renaissance period.",
    "Paint a picture of the principles of green energy and renewable resources.",
    "Uncover the role of hormones in the human body.",
    "Elaborate on virtual reality and its applications.",
    "Examine the causes and effects of the American Civil War.",
    "Describe the structure of the periodic table and its elements.",
    "Scrutinize the ethical considerations in medical research.",
    "Peel back the layers of the multiverse theory in physics.",
    "Discover the history and culture of ancient Greece.",
    "Outline the principles of urban planning and sustainable cities.",
    "Unearth the function of the immune system in the human body.",
    "Unveil the concept of the Internet of Things (IoT).",
    "Explore the events and consequences of the French Revolution.",
    "Detail the major components of the nervous system.",
    "Probe the implications of data privacy in the digital age.",
    "Demystify the theory of relativity in physics.",
    "Trace the origins and impact of the Silk Road trade route.",
    "Illuminate the principles of classical conditioning in psychology.",
    "Analyze the role of ethics in business and decision-making.",
    "Break down nanotechnology, and its applications.",
    "Delve into the history and significance of the Industrial Age.",
    "Describe the structure and function of the human respiratory system.",
    "Explore the key factors affecting global population growth.",
    "Unravel the concept of the Heisenberg Uncertainty Principle.",
    "Uncover the development and impact of the printing press.",
    "Discuss the principles of game theory in economics.",
    "Examine the role of genetics in inherited traits.",
    "Explain the concept of augmented reality, and its uses.",
    "Peel back the layers of the history and culture of ancient China.",
    "Describe the principles of sustainable transportation and urban mobility.",
    "Analyze the function of enzymes in biological processes.",
    "Break down 3D printing, and its applications.",
    "Examine the causes and consequences of the Russian Revolution.",
    "Detail the major components of the cardiovascular system.",
    "Illuminate the ethical dilemmas in artificial intelligence and robotics.",
    "Unravel the concept of chaos theory in mathematics.",
    "Delve into the origins and influence of the Impressionist art movement.",
    "Explore the principles of behavioral economics.",
    "Analyze the role of nutrition in human health.",
    "Scrutinize the concept of quantum physics and its implications.",
    "Navigate through the history and culture of ancient Rome.",
    "Examine the principles of sustainable water management.",
    "Unearth the function of neurotransmitters in mental health.",
    "Break down 5G technology and its impact on communication.",
    "Probe the events and consequences of the American Revolution.",
    "Describe the structure and function of the human endocrine system.",
    "Explore the key considerations in bioethics and medical dilemmas.",
    "Unravel the concept of dark matter in astrophysics.",
    "Delve into the origins and influence of the Harlem Renaissance.",
    "Examine the principles of environmental conservation.",
    "Analyze the role of neuroplasticity in brain development.",
    "Unearth the concept of quantum entanglement in quantum mechanics.",
    "Discover the history and culture of ancient India.",
    "Detail the principles of sustainable architecture and design.",
    "Analyze the function of the circadian rhythm in the body.",
    "Scrutinize the concept of self-driving cars and their potential impact.",
    "Delve into the causes and effects of the Great Depression.",
    "Describe the structure and function of the human musculoskeletal system.",
    "Explore the key issues in artificial intelligence and creativity.",
    "Uncover the concept of black holes and their properties.",
    "Examine the origins and impact of the Civil Rights Movement.",
    "Unearth the principles of positive psychology.",
    "Delve into the role of dreams in understanding the subconscious mind.",
    "Uncover the concept of the butterfly effect in chaos theory.",
    "Delve into the history and culture of the Maya civilization.",
    "Analyze the principles of sustainable energy production.",
    "Examine the function of the endocannabinoid system in the human body.",
    "Probe CRISPR gene editing and its applications.",
    "Detail the major components of the human integumentary system.",
    "Uncover the key issues in artificial intelligence and creativity.",
    "Examine the concept of black holes and their properties.",
    "Delve into the origins and impact of the Civil Rights Movement.",
    "Unearth the principles of positive psychology.",
    "Delve into the role of dreams in understanding the subconscious mind.",
    "Uncover the concept of the butterfly effect in chaos theory.",
    "Delve into the history and culture of the Maya civilization.",
    "Analyze the principles of sustainable energy production.",
    "Examine the function of the endocannabinoid system in the human body.",
    "Uncover the key issues in artificial intelligence and creativity.",
    "Explore the concept of time dilation in Einstein's theory of relativity.",
    "Examine the impact of deforestation on climate change.",
    "Explore the process of mitosis in cell division.",
    "Investigate the ethical implications of gene editing in humans.",
    "Unravel the concept of machine vision and its applications.",
    "Unearth the history and significance of the Ancient Mesopotamian civilization.",
    "Highlight the principles of renewable energy storage technologies.",
    "Uncover the role of mitochondria in cellular respiration.",
    "Decode the concept of inflation in economics.",
    "Analyze the pros and cons of online education.",
    "Illustrate the major events of the Cold War.",
    "Explore the importance of conserving endangered species.",
    "Demystify quantum entanglement and its mysteries.",
    "Scrutinize the impact of automation on the job market.",
    "Uncover the process of protein synthesis in cells.",
    "Examine the key elements of a just legal system.",
    "Delve into 3D rendering and its applications.",
    "Navigate through the history and culture of the Aztec civilization.",
    "Elaborate on the principles of sustainable forestry and resource management.",
    "Unearth the role of the amygdala in the brain's emotional processing.",
    "Explain the concept of natural language processing and its uses.",
    "Peel back the layers of the causes and effects of the Great Recession.",
    "Describe the structure and function of RNA.",
    "Scrutinize the ethical considerations in animal testing.",
    "Peel back the layers of the many-worlds interpretation in quantum mechanics.",
    "Uncover the history and impact of the Space Race.",
    "Explore the principles of supply chain management.",
    "Unearth the function of the endocrine system in maintaining homeostasis.",
    "Elaborate on corporate social responsibility (CSR).",
    "Journey through the history and culture of the Inca civilization.",
    "Clarify the principles of sustainable fishing practices.",
    "Unveil the role of the prefrontal cortex in decision-making.",
    "Demystify quantum teleportation and its potential applications.",
    "Discuss the events and impact of the Watergate scandal.",
    "Detail the structure and function of the human immune system.",
    "Examine the ethical issues in human cloning and genetic modification.",
    "Uncover the concept of dark energy in cosmology.",
    "Explore the history and significance of the Enlightenment era.",
    "Unearth the principles of game-based learning.",
    "Delve into the role of the thyroid gland in regulating metabolism.",
    "Elaborate on autonomous vehicles and their future implications.",
    "Probe the causes and outcomes of the Mexican Revolution.",
    "Describe the major components of the human renal system.",
    "Examine the key considerations in the development of artificial intelligence ethics.",
    "Uncover the concept of gravitational waves and their detection.",
    "Peel back the layers of the origins and influence of the Surrealist art movement.",
    "Uncover the principles of positive reinforcement in psychology.",
    "Detail the role of the hypothalamus in regulating bodily functions.",
    "Explore the concept of genetic diversity and its importance in evolution.",
    "Demystify the events and consequences of the American Prohibition era.",
    "Describe the functions of the human skeletal system.",
    "Examine the ethical dilemmas in human organ transplantation.",
    "Uncover the concept of the Higgs boson and its role in particle physics.",
    "Discuss the history and culture of the Ottoman Empire.",
    "Unearth the principles of ecological succession in ecosystems.",
    "Delve into the role of the limbic system in emotional behavior.",
    "Examine the concept of neuroprosthetics and their applications.",
    "Uncover the causes and effects of the Dust Bowl during the Great Depression.",
    "Detail the structure and function of the human reproductive system.",
    "Explore the key considerations in the development of autonomous weapons legislation.",
    "Demystify the concept of the Fermi Paradox and the search for extraterrestrial civilizations.",
    "Delve into the origins and impact of the Green Revolution in agriculture.",
    "Describe the principles of emotional intelligence.",
    "Unearth the role of the pituitary gland in hormonal regulation.",
    "Explore the concept of time travel and its theoretical possibilities.",
    "Examine the history and culture of the Persian Empire.",
    "Unravel the principles of cultural appropriation and its controversies.",
    "Detail the function of the amygdala in emotional memory processing.",
    "Probe the concept of genetic mutation and its importance in evolution.",
    "Uncover the events and consequences of the American Civil Rights Movement.",
    "Elaborate on the major components of the human endocrine system.",
    "Scrutinize the key considerations in ensuring data privacy in the digital age.",
    "Examine the concept of the Copenhagen interpretation of quantum mechanics.",
    "Uncover the development and influence of the Pop Art movement in art.",
    "Delve into the principles of conservation psychology and environmental behavior change.",
    "Unearth the role of the pituitary gland in hormonal regulation.",
    "Explore the concept of the Fermi Paradox and the potential explanations for it.",
    "Discover the history and culture of the Ancient Egyptian civilization.",
    "Detail the principles of permaculture and sustainable agriculture design.",
    "Uncover the function of the amygdala in emotional processing and fear response.",
    "Scrutinize the concept of quantum superposition and its applications.",
    "Peel back the layers of the causes and effects of the Prohibition era in the United States.",
    "Examine the structure and function of the human respiratory system.",
    "Demystify the ethical considerations in the development of autonomous drones and UAVs.",
    "Uncover the concept of the Doppler effect and its role in astronomy.",
    "Explore the origins and impact of the Renaissance art movement in Europe.",
    "Detail the principles of positive psychology and well-being.",
    "Unearth the role of the hypothalamus in regulating various bodily functions.",
    "Examine the concept of genetic algorithms and their applications in optimization.",
    "Delve into the events and consequences of the Cuban Missile Crisis during the Cold War.",
    "Investigate the major components of the human musculoskeletal system.",
    "Examine the key ethical dilemmas in artificial intelligence and machine learning.",
    "Explore the concept of dark matter and its gravitational effects.",
    "Uncover the history and culture of the Roman Republic and Empire.",
    "Detail the principles of sustainable water purification and treatment.",
    "Unearth the function of the hippocampus in memory formation and retrieval.",
    "Scrutinize the concept of neuroplasticity and its role in brain development and recovery.",
    "Demystify the causes and effects of the Great Famine in Ireland in the 19th century.",
    "Uncover the structure and function of the human integumentary system.",
    "Investigate the key ethical concerns in the field of artificial intelligence research, including issues of bias, fairness, and transparency.",
    "Explore the concept of the butterfly effect in chaos theory, and provide examples of how small changes can lead to significant outcomes.",
    "Unravel the origins and impact of the Harlem Renaissance, a cultural and artistic movement that celebrated African American creativity and identity.",
  
  ];
  
  // Function to get a random prompt from the given array.
  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  };

  // Initialize the state with random prompts for the 4 buttons when the component mounts.
  useEffect(() => {
    const randomLabels = Array.from({ length: 4 }, getRandomPrompt);
    setButtonLabels(randomLabels);
  }, []);

  // State to store the button labels.
  const [buttonLabels, setButtonLabels] = useState([]);

  // State to store the current text input value.
  

  // Function to handle button click and update the text input.
  const handleButtonClick = (index) => {
    setTextInputValue(buttonLabels[index]);
  };

  return (
   
    <div>
       <div className="sidemain">
       <section className="sidebar" style={{fontFamily:"GPT-regular"}}>
        <div className="button-container">
        <button onClick={createNewChat} id="sidebar-button-1"><span><img src={logo} className="logo-small" alt="logo" /></span> New Chat<span id="plus"><img src={edit} className="editIcon"></img></span></button>
        
        </div><br />
        <div className="chat-box">
        <ul className="chats">
          {uniqueTitles?.map((uniqueTitle,index)=><li className="inner-chats" key={index} onClick={()=>handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        </div>
        
      <center> <footer>Made By Group 6 </footer></center>
       
      </section>
      
      <section id="main" >
  
    <div className="heading" style={{ display: MainVisible ? "block" : "none" }}>
    {MainVisible && (
          <>
    <img src={logo} className="logo" alt="logo" />
      <h1 className="title" >How can I help you today?</h1>
      
          </>
        )}
        </div>
        <ul className="feed" style={{ overflowY: MainVisible ? "hidden" : "scroll", height: MainVisible ? "100px" : "86%",paddingTop: MainVisible ? "0":"5%" }}>
  {currentChat?.map((chatMessage, index) => (
    <li key={index}>
      <p className="role">{chatMessage.role}</p>
      <p className="chat-content">{chatMessage.content}</p>
    </li>
  ))}
</ul>

     
    
    {/* Prompts Component */}
    <div className="textbox">
    <div>
      <div className="button-grid" style={{ display: MainVisible ? "grid" : "none" }}>
      {MainVisible && (
          <>
        {buttonLabels.map((label, index) => (
          <button className="prompt-button" key={index} onClick={() => handleButtonClick(index)}id={`button-${index}`}
         
          >
            <span style={{ fontWeight: 'bold', fontSize: 'larger' }}>
              {label.split(' ').slice(0, 3).join(' ')}
            </span>
            <br />
            {label.split(' ').slice(3).join(' ')}
          </button>
        ))}
         </>
        )}
      </div>
      <div>    
      <div className="textfield-submit">
        <input
          id='textfield'
          type="text"
          value={textInputValue}
          onChange={(e) => setTextInputValue(e.target.value)}
          placeholder='Message ChatGPT...'
          autoComplete="off"
          onKeyDown={handleKeyPress} 
          />
          <button className='grey-send'onClick={submit}>  
      <img src={send} alt="grey-send-button" width={14} />
          </button>
          <p id="mistake">ChatGPT can make mistakes. Consider checking important information.</p>
          
      </div>
    </div>
    </div>
    </div>
  </section>
  </div>
      
    </div>
  );
}