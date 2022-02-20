import { Component, useState } from 'react';
import './App.css';
import { ChoiceSet } from './ChoiceSet';
import { ItemSlots, Wardrobe } from './CLData/Clothes/Wardrobe';
import { CharacterAppearance, differentAppearance } from './CLStyleLib/CharacterAppearance';
import { ImageDataCache } from './CLStyleLib/ImageDataCache';
import { IconChooser } from './IconChooser';
import { PosePanel } from './Pose';
import { Icon } from './ReactComponents/Icon';
import { icons } from "./CLStyleLib/CharIcon";
import { Item } from './CLStyleLib/Item';

export function capitalize(s: string): string {
  return s.split(' ').map((s) => { return s[0].toUpperCase() + s.substring(1) }).join(' ')
}

export const GlobalImageDataCache = new ImageDataCache();

function App() {
  let [appearance, setAppearance] = useState(() => new CharacterAppearance(icons[0], {
    underwear: Wardrobe.underwear[1] as Item,
    hair: Wardrobe.hair[0] as Item,
    weapon: Wardrobe.weapon[0] as Item,
    skin: Wardrobe.skin[0] as Item,
  }));
  let [pose, setPose] = useState<[number, number]>([8, 0]);

  return (
    <div className="App">
      <div className="previewPanel">
        <Icon appearance={appearance} pose={pose} />
        <PosePanel pose={pose} setPose={setPose}></PosePanel>
      </div>
      <IconChooser appearance={appearance} setAppearance={setAppearance}></IconChooser>
      <CustomizationPanel appearance={appearance} setAppearance={setAppearance}></CustomizationPanel>
    </div>
  );
}

export default App;

interface CustomizationPanelProps {
  appearance: CharacterAppearance,
  setAppearance: (newAppearance: CharacterAppearance) => void;
}
class CustomizationPanel extends Component<CustomizationPanelProps> {
  override shouldComponentUpdate(newProps: CustomizationPanelProps): boolean {
    return differentAppearance(newProps.appearance, this.props.appearance);
  }
  override render() {
    return ItemSlots.map(slot => <ChoiceSet key={slot} slot={slot} {...this.props}></ChoiceSet>)
  }
}
