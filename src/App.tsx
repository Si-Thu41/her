import React from 'react';
import Profile from './components/profile';
import BirdhouseClock from './components/clock';

type Bubble={
  id:number,
  x:number,
  y:number,
  size?:number,
  color?:string
}
export default function App() {
  const bubbleIdRef= React.useRef(0);
  const [bubbles,setBubbles]=React.useState<Bubble[]>([]);

 
  React.useEffect(()=>{
    
    const handleMouseMove = (event:MouseEvent)=>{
      const newBubble: Bubble = {
        id: bubbleIdRef.current++,
        x: event.clientX,
        y: event.clientY
      };
      setBubbles(prev => [...prev, newBubble]);
      setTimeout(()=>{
        setBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id));
      },1100)
    }
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  },[])

  return (
<div className="relative flex flex-col min-h-dvh bg-cover bg-center bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.5)),url(/background.jpg)]">        
<div className="  flex-1" >
   
    {bubbles.map(bubble => (
      <div key={bubble.id} className="fixed pointer-events-none text-2xl  px-2 py-1 rounded-full animate-bubble-up " style={{left: bubble.x, top: bubble.y}}>
        ❤️
      </div>
    ))}
    <Profile />
    <div className="lg:w-1/4 w-3/4 mx-auto rounded-2xl overflow-hidden mt-4">
    <img src="cats-in-love-love.gif" />
       </div>
   
  </div>
   <footer>
      <p className="text-center text-white opacity-75 text-lg xl:hidden">
        Tab the screen
      </p>
      <p className="text-center text-white opacity-75 text-lg hidden xl:block">
        Swipe the screen
      </p>
      
    </footer>
    <div className="absolute top-0 left-0 lg:w-1/3 w-3/10">
    <BirdhouseClock />
    </div>
    </div>

);
}