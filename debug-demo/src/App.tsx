import { useState } from 'react';

function App() {
  const [show, setShow] = useState(false);

  return (
    <div>
      {show && <div className="text-(4xl sm:5xl md:6xl)">不是哥们？</div>}
      <button onClick={() => setShow(true)}>SHOW</button>
    </div>
  );
}

export default App;
