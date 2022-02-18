import { Component, useState } from 'react';
import './App.css';
import { AppState, InitState, StylunkContext } from './AppState';
import { ChoiceSet } from './ChoiceSet';
import { ItemSlots } from './CLData/Clothes/Wardrobe';
import { CharacterAppearance } from './CLStyleLib/CharacterAppearance';
import { IconChooser } from './IconChooser';
import { PosePanel } from './Pose';
import { Icon } from './ReactComponents/Icon';

export function capitalize(s: string): string {
  return s.split(' ').map((s) => { return s[0].toUpperCase() + s.substring(1) }).join(' ')
}


function App() {
  let realSetAppearance: (newAppearance: CharacterAppearance) => void;
  let setAppearance = (newAppearance: CharacterAppearance): void => { realSetAppearance(newAppearance) };
  let [pose, setPose] = useState<[number, number]>([8, 0]);

  let [state, setState] = useState<AppState>(() => {
    return { ...InitState(), setAppearance };
  });

  realSetAppearance = (newAppearance: CharacterAppearance) => {
    setState((oldState) => {
      return { ...oldState, appearance: newAppearance };
    });
  };

  return (
    <StylunkContext.Provider value={state}>
      <div className="App">
        <div className="previewPanel">
          <Icon appearance={state.appearance} pose={pose} />
          <PosePanel pose={pose} setPose={setPose}></PosePanel>
        </div>
        <IconChooser appearance={state.appearance}></IconChooser>
        <CustomizationPanel></CustomizationPanel>
      </div>
    </StylunkContext.Provider>
  );
}

export default App;

class CustomizationPanel extends Component {
  override shouldComponentUpdate(): boolean { return false; }
  override render() {
    return ItemSlots.map(slot => <ChoiceSet key={slot} slot={slot}></ChoiceSet>)
  }
}
