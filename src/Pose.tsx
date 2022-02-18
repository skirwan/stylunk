import { Component } from "react";
import { StylunkContext } from "./AppState";
import { Rotator } from "./Rotator";

export type Pose = [number, number];

type PoseDirection = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type PoseMode = {
    mode: 'stand';
    direction: PoseDirection;
} | {
    mode: 'attack' | 'walk';
    direction: PoseDirection;
    frame: number;
} | {
    mode: 'dance';
    frame: number;
};

function poseForMode(mode: PoseMode): Pose {
    function wrap(index: number): Pose {
        return [index % 16, (index / 16) | 0];
    }
    switch (mode.mode) {
        case 'stand':
            return wrap(mode.direction * 4);
        case 'attack':
            return wrap(mode.direction * 4 + 3 * (mode.frame % 2));
        case 'walk':
            return wrap(mode.direction * 4 + 1 + (mode.frame % 2));
        case 'dance':
            return wrap(32 + mode.frame % 16);
    }
}

function modeFromPose(pose: Pose): PoseMode {
    let idx = pose[0] + pose[1] * 16;
    if (idx >= 32) { return { mode: 'dance', frame: idx - 32 } };
    let direction = ((idx / 4) | 0) as PoseDirection;
    let frame = idx - direction * 4;
    if (frame === 0) { return { mode: 'stand', direction: direction } }
    if (frame === 3) { return { mode: 'attack', direction: direction, frame: 1 } }
    return { mode: 'walk', direction: direction, frame: 1 };
}

function directionFromAngle(degrees: number): PoseDirection {
    while (degrees < 0) degrees += 360;
    degrees = degrees % 360;

    // 567
    // 4 0
    // 321

    if (degrees < 22.5) { return 6 }
    if (degrees < 67.5) { return 7 }
    if (degrees < 112.5) { return 0 }
    if (degrees < 157.5) { return 1 }
    if (degrees < 202.5) { return 2 }
    if (degrees < 247.5) { return 3 }
    if (degrees < 292.5) { return 4 }
    if (degrees < 337.5) { return 5 }
    return 6;
}

interface PosePanelProps {
    pose: Pose;
    setPose(newPose: Pose): void;
}
interface PosePanelState {
    mode: PoseMode;
}

export class PosePanel extends Component<PosePanelProps, PosePanelState> {
    static contextType = StylunkContext
    context!: React.ContextType<typeof StylunkContext>;

    private interval?: number;

    constructor(props: PosePanelProps) {
        super(props);
        this.setDegrees = this.setDegrees.bind(this);
        this.tick = this.tick.bind(this);
        this.state = {
            mode: modeFromPose(props.pose)
        };
    }

    setDegrees(angle: number) {
        let direction = directionFromAngle(angle);

        if (this.state.mode.mode === 'dance') { return }
        let newMode = { ...this.state.mode, direction: direction };
        this.setState({ mode: newMode });
        let newPose = poseForMode(newMode);

        if (this.props.pose[0] !== newPose[0] || this.props.pose[1] !== newPose[1]) {
            this.props.setPose(newPose);
        }
    }

    setMode(mode: 'stand' | 'walk' | 'attack' | 'dance') {
        let newMode = { direction: 2, frame: 0, ...this.state.mode, mode: mode } as PoseMode;
        this.setState({ mode: newMode });
        let newPose = poseForMode(newMode);

        if (this.props.pose[0] !== newPose[0] || this.props.pose[1] !== newPose[1]) {
            this.props.setPose(newPose);
        }

        let animates = mode === 'walk' || mode === 'attack' || mode === 'dance';

        if (animates) {
            if (!this.interval) {
                this.interval = window.setInterval(this.tick, 500);
            }
        } else {
            if (this.interval) {
                window.clearInterval(this.interval);
                this.interval = undefined;
            }
        }
    }

    tick() {
        switch (this.state.mode.mode) {
            case 'stand':
            case 'dance':
                return;
            case 'walk':
            case 'attack':
                let newMode = { ...this.state.mode, frame: 1 + this.state.mode.frame };
                this.props.setPose(poseForMode(newMode));
                this.setState({ mode: newMode });
        }
    }
    render() {
        let angle = 180;

        const standClass = this.state.mode.mode === 'stand' ? 'active' : '';
        const walkClass = this.state.mode.mode === 'walk' ? 'active' : '';
        const attackClass = this.state.mode.mode === 'attack' ? 'active' : '';
        const danceClass = this.state.mode.mode === 'dance' ? 'active' : '';

        return (
            <div className="posePanel">
                <Rotator degrees={angle} setDegrees={this.setDegrees}></Rotator>
                <div className="buttonGroup">
                    <button className={standClass} onClick={() => this.setMode('stand')}>Stand</button>
                    <button className={attackClass} onClick={() => this.setMode('attack')}>Attack</button>
                    <button className={walkClass} onClick={() => this.setMode('walk')}>Walk</button>
                </div>
                <button className={danceClass} onClick={() => this.setMode('dance')}>Dance</button>
            </div>
        );
    }
}