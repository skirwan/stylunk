import { Component, createRef, CSSProperties, RefObject } from "react";
import { StylunkContext } from "../AppState";
import { CharacterAppearance, differentAppearance } from "../CLStyleLib/CharacterAppearance";

interface IconAttributes {
  appearance: CharacterAppearance,
  pose?: [number, number],
}

const runningJestTest = process.env.JEST_WORKER_ID !== undefined;

export class Icon extends Component<IconAttributes> {
  static contextType = StylunkContext
  context!: React.ContextType<typeof StylunkContext>;

  private elementRef: RefObject<HTMLCanvasElement>;
  private imageData?: ImageData;

  constructor(props: IconAttributes) {
    //console.log('constructor');
    super(props);
    this.elementRef = createRef();
  }

  valid(): boolean {
    //console.log('valid');
    const [poseX, poseY] = this.props.pose ?? [8, 0];

    if (poseX < 0) { return false }
    if (poseX > 15) { return false }
    if (poseY < 0) { return false }
    if (poseY > 2) { return false }

    return true;
  }

  setColors() {
    //console.log('setColors');
    if (!this.elementRef.current) return;

    let icon = this.props.appearance.icon;
    let palette = this.props.appearance.palette;

    let currentImageData = this.context.cache.getImageData(icon, palette);
    this.imageData = currentImageData

    if (runningJestTest) { return; }

    const canvas = this.elementRef.current;
    const context = canvas.getContext('2d')!;
    context.imageSmoothingEnabled = false;

    const [poseX, poseY] = this.props.pose ?? [8, 0];

    context.putImageData(
      currentImageData,
      -poseX * icon.cellWidth, -poseY * icon.cellHeight - 1,
      poseX * icon.cellWidth, poseY * icon.cellHeight + 1,
      icon.cellWidth,
      icon.cellHeight
    )
  }

  override componentDidMount() {
    //console.log('componentDidMount');
    this.setColors();
  }

  override shouldComponentUpdate(newProps: IconAttributes): boolean {
    //console.log('shouldComponentUpdate');
    //if (this.props.appearance !== newProps.appearance) { return true }

    const [poseX, poseY] = this.props.pose ?? [8, 0];
    const [newX, newY] = newProps.pose ?? [8, 0];

    if (poseX ?? 8 !== newX ?? 8) { return true }
    if (poseY ?? 0 !== newY ?? 0) { return true }

    if (this.props.appearance.icon !== newProps.appearance.icon) { return true }
    if (differentAppearance(this.props.appearance, newProps.appearance)) { return true }

    return false;
  }

  override render() {
    //console.log('render');
    if (!this.valid()) {
      return <span>?</span>;
    }

    let styles: CSSProperties = {
      imageRendering: 'pixelated'
    };

    return (
      <div className="iconWrapper">
        <canvas className="icon" width={this.props.appearance.icon.cellWidth} height={this.props.appearance.icon.cellHeight} ref={this.elementRef} style={styles} />
      </div>
    );
  }

  override componentDidUpdate() {
    //console.log('componentDidUpdate');
    this.setColors();
  }
}
