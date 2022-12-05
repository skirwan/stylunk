import { Component } from 'react';
import { capitalize } from './App';
import { CharacterAppearance, differentAppearance } from './CLStyleLib/CharacterAppearance';
import { CharIcon, icons } from './CLStyleLib/CharIcon';
import { Icon } from './ReactComponents/Icon';

interface CaptionProps {
    icon: CharIcon
}
class IconCaption extends Component<CaptionProps> {
    override shouldComponentUpdate(newProps: CaptionProps): boolean {
        return this.props.icon !== newProps.icon;
    }

    override render() {
        let icon = this.props.icon;

        let armed: JSX.Element = icon.armed ? <></> : <>, unarmed</>;
        let variant: JSX.Element = icon.variant ? <i> ({capitalize(icon.variant)})</i> : <></>;

        return (
            <>
                <span>{icon.race}</span>
                <span>{capitalize(icon.gender)}{armed}{variant}</span>
            </>
        );
    }
}

interface IconChoiceButtonProps {
    icon: CharIcon
    appearance: CharacterAppearance,
    setAppearance: (newAppearance: CharacterAppearance) => void;

}

export class IconChoiceButton extends Component<IconChoiceButtonProps> {
    override shouldComponentUpdate(newProps: IconChoiceButtonProps): boolean {
        if (newProps.icon !== this.props.icon) { return true }
        return differentAppearance(newProps.appearance, this.props.appearance);
    }

    override render() {
        const proposedAppearance = this.props.appearance.withIcon(this.props.icon)

        let disabled = false;
        let className = '';

        if (this.props.appearance.icon === this.props.icon) {
            disabled = true;
            className = 'active';
        }

        return (
            <button disabled={disabled} className={className} onClick={() => this.props.setAppearance(proposedAppearance)}>
                <Icon appearance={proposedAppearance} />
                <IconCaption icon={this.props.icon}></IconCaption>
            </button>
        );
    }
}

interface IconChooserProps {
    appearance: CharacterAppearance;
    setAppearance: (newAppearance: CharacterAppearance) => void;
}
export class IconChooser extends Component<IconChooserProps> {
    override shouldComponentUpdate(newProps: IconChooserProps): boolean {
        if (this.props.appearance.icon !== newProps.appearance.icon) { return true }
        return differentAppearance(newProps.appearance, this.props.appearance);
    }

    override render() {
        // TODO: Create IconChooserSummary that pulls appearance from context; then we can remove the props for this and won't need to reiterate loop
        return (
            <details>
                <summary>Icon <span className="currentSelection"> — <IconCaption icon={this.props.appearance.icon}></IconCaption></span></summary>
                <ul className="optionsList">
                    {icons.map(icon => <li key={`${icon.race}_${icon.gender}_${icon.armed}_${icon.variant}`}>
                        <IconChoiceButton icon={icon} {...this.props}></IconChoiceButton>
                    </li>
                    )}
                </ul>
            </details>
        );
    }
}
