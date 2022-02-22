import { Component, createRef, CSSProperties, RefObject } from "react";
import { GlobalImageDataCache } from "../App";
import { CharacterAppearance, differentAppearance } from "../CLStyleLib/CharacterAppearance";

interface IconAttributes {
  appearance: CharacterAppearance,
  pose?: [number, number],
}

const runningJestTest = process.env.JEST_WORKER_ID !== undefined;

export class Icon extends Component<IconAttributes> {
  private elementRef: RefObject<HTMLCanvasElement>;
  private imageData?: ImageData;
  private dirty: boolean = true;
  private visible: boolean = true;
  private observer?: IntersectionObserver;

  constructor(props: IconAttributes) {
    //console.log('constructor');
    super(props);
    this.elementRef = createRef();
    this.setColors = this.setColors.bind(this);
    this.intersectionChangedCallack = this.intersectionChangedCallack.bind(this);
    if (!runningJestTest) {
      this.observer = new IntersectionObserver(this.intersectionChangedCallack);
    }
  }

  intersectionChangedCallack(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
    if (entries[0].intersectionRatio <= 0) {
      this.visible = false;
    } else {
      if (!this.visible) {
        this.visible = true
        if (this.dirty) {
          this.setColors();
        }
      }
    }
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
    if (!this.dirty) return;

    this.dirty = false;

    let icon = this.props.appearance.icon;
    let palette = this.props.appearance.palette;

    let currentImageData = GlobalImageDataCache.getImageData(icon, palette);
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
    if (!this.elementRef.current) return;
    this.observer?.observe(this.elementRef.current);
    this.setColors();
  }

  override shouldComponentUpdate(newProps: IconAttributes): boolean {
    //console.log('shouldComponentUpdate');
    //if (this.props.appearance !== newProps.appearance) { return true }

    this.dirty = true;
    const [poseX, poseY] = this.props.pose ?? [8, 0];
    const [newX, newY] = newProps.pose ?? [8, 0];

    if (poseX ?? 8 !== newX ?? 8) { return true }
    if (poseY ?? 0 !== newY ?? 0) { return true }

    if (this.props.appearance.icon !== newProps.appearance.icon) { return true }
    if (differentAppearance(this.props.appearance, newProps.appearance)) { return true }

    this.dirty = false;
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
    if (this.dirty && this.visible) {
      window.setTimeout(this.setColors, 0)
    }
  }

  override componentWillUnmount() {
    this.observer?.disconnect();
  }
}
