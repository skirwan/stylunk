import React from 'react';
import logo from './logo.svg';
import './App.css';


/*
Copy classic palette
Iterate through items, overriding it

Allocate Uint8ClampedArray of pixel data (size * 4) and expand icon x overridden palette into it

new ImageData() from that

Each button with a preview is doing the same thing; but when clicking a button, the state change should include the new image


<SLButton currentAppearance={foo} onApplyButton={ (item, slot, computedImage) => void } item={item} slot={slot}

<SLApp>
    <PreviewPanel computedImage={} visiblePose={} />
    <PoserPanel visiblePose={} onApplyPose={(pose) => void} />
    <Panel label="Icon" summary={describeIcon()}>
        
    </Panel>
    { customizationPoints.map( x => Section(x) ) }
</SLApp>

*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
