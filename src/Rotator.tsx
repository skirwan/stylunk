import React, { Component, createRef, RefObject } from 'react';
import './Rotator.css';

interface RotatorProps {
    degrees: number;
    setDegrees: (degrees: number) => void;
}

export class Rotator extends Component<RotatorProps> {
    private elementRef: RefObject<HTMLDivElement>;
    private thumbRef: RefObject<HTMLDivElement>;
    private dragging: boolean;
    private visibleAngle: number;

    constructor(props: RotatorProps) {
        super(props);
        this.elementRef = createRef();
        this.thumbRef = createRef();
        this.dragging = false;
        this.visibleAngle = props.degrees;

        this.startDrag = this.startDrag.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    override componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
        this.reflectAngle(this.visibleAngle);
    }

    override shouldComponentUpdate(newProps: RotatorProps) {
        if (newProps.degrees !== this.props.degrees) {
            this.visibleAngle = newProps.degrees;
            this.reflectAngle(newProps.degrees);
        }
        return false;
    }

    private calculateAngle(evt: MouseEvent): number {
        if (!this.elementRef.current) { return this.props.degrees; }
        if (!this.thumbRef.current) { return this.props.degrees; }

        let rect = this.elementRef.current.getBoundingClientRect()
        const midX = rect.left + rect.width / 2;
        const midY = rect.top + rect.height / 2;
        const relX = evt.clientX - midX;
        const relY = evt.clientY - midY;

        if (relY === 0) {
            if (relX < 0) return 270;
            return 90;
        }

        const radians = Math.atan(-relX / relY) + (relY > 0 ? Math.PI : 0);
        return (180 * radians / Math.PI) | 0;
    }

    private reflectAngle(degrees: number) {
        if (!this.elementRef.current) { return this.props.degrees; }
        if (!this.thumbRef.current) { return this.props.degrees; }

        const width = this.elementRef.current.offsetWidth;
        const height = this.elementRef.current.offsetHeight;

        const thumbWidth = this.thumbRef.current.offsetWidth;
        const thumbHeight = this.thumbRef.current.offsetHeight;

        const rx = width / 2 - thumbWidth * 0.75;
        const ry = height / 2 - thumbHeight * 0.75;

        const x = rx * Math.sin(Math.PI * degrees / 180);
        const y = -ry * Math.cos(Math.PI * degrees / 180);

        this.thumbRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }

    private reflectEvent(event: MouseEvent) {
        //console.log('reflectEvent');
        const degrees = this.calculateAngle(event);
        if (this.visibleAngle === degrees) { return }
        this.visibleAngle = degrees;
        this.reflectAngle(degrees);
        this.props.setDegrees(degrees);
        //console.log('reflectEvent fininshed');
    }

    startDrag(event: React.MouseEvent) {
        //console.log('startDrag');
        this.dragging = true;
        this.reflectEvent(event.nativeEvent);
    }

    handleMouseUp(evt: MouseEvent) {
        //console.log('handleMouseUp');
        if (!this.dragging) { return }
        //console.log('ending drag');

        this.dragging = false;
        this.reflectEvent(evt);
    }

    handleMouseMove(evt: MouseEvent) {
        //console.log('handleMouseMove');
        if (!this.dragging) { return }
        this.reflectEvent(evt);
        //console.log('reflected mouse move');
    }

    override render() {
        //console.log('render');
        return (
            <div className="rotator" ref={this.elementRef} onMouseDown={this.startDrag}>
                <div className="thumb" ref={this.thumbRef}></div>
            </div>
        );
    }

    override componentWillUnmount() {
        //console.log('componentWillUnmount');
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('mousemove', this.handleMouseMove);
    }
}
