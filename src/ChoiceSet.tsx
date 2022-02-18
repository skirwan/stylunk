import { Component } from 'react';
import { capitalize } from './App';
import { StylunkContext } from './AppState';
import { Berries, Berry } from './CLData/Berries';
import { ItemCategory, ItemSlot, Wardrobe, WardrobeRules } from './CLData/Clothes/Wardrobe';
import { sameAppearance } from './CLStyleLib/CharacterAppearance';
import { differentItemColors, Item } from './CLStyleLib/Item';
import { Icon } from './ReactComponents/Icon';

interface ItemChoiceProps {
    slot: ItemSlot,
    item: Item
}
class ItemChoice extends Component<ItemChoiceProps> {
    static contextType = StylunkContext
    context!: React.ContextType<typeof StylunkContext>;

    override render() {
        const proposedAppearance = this.context.appearance.withEquipped(this.props.slot, this.props.item);

        // TODO: Disable hats for non-Dwarves
        let className = '';
        if (this.context.appearance.wornItems[this.props.slot]?.name === this.props.item.name) {
            className = "active";
        }

        return (
            <li>
                <button className={className} onClick={() => this.context.setAppearance(proposedAppearance)}>
                    <Icon appearance={proposedAppearance} />
                    <span>{this.props.item.name}</span>
                </button>
            </li>
        );
    }
}

interface NoneChoiceProps {
    slot: ItemSlot
}
class NoneChoice extends Component<NoneChoiceProps> {
    static contextType = StylunkContext
    context!: React.ContextType<typeof StylunkContext>;

    override render() {
        const proposedAppearance = this.context.appearance.withEquipped(this.props.slot);

        let className = this.context.appearance.wornItems[this.props.slot] === undefined ? 'active' : '';

        return (
            <li>
                <button className={className} onClick={() => this.context.setAppearance(proposedAppearance)}>
                    <Icon appearance={proposedAppearance} />
                    <span>None</span>
                </button>
            </li>
        );
    }
}

interface BerryRowProps {
    slot: ItemSlot,
    berry: Berry,
}
class BerryRow extends Component<BerryRowProps> {
    static contextType = StylunkContext
    context!: React.ContextType<typeof StylunkContext>;

    override render() {
        const { appearance, setAppearance } = this.context;
        const equipped = appearance.wornItems[this.props.slot];

        let bleachAppearance = appearance;
        let canBleach = false;
        let dyeAppearance = appearance;
        let canDye = false;

        if (equipped !== undefined) {
            bleachAppearance = appearance.withColorManipulated(this.props.slot, this.props.berry.bleach)
            canBleach = differentItemColors(
                bleachAppearance.wornItems[this.props.slot]!.colors,
                equipped.colors
            );

            dyeAppearance = appearance.withColorManipulated(this.props.slot, this.props.berry.dye)
            canDye = differentItemColors(
                dyeAppearance.wornItems[this.props.slot]!.colors,
                equipped.colors
            );
        }

        return (
            <div className="berry">
                <button disabled={!canBleach} onClick={() => setAppearance(bleachAppearance)}>
                    <Icon appearance={bleachAppearance} />
                    <span>{capitalize(this.props.berry.name)} Bleach</span>
                </button>
                <button disabled={!canDye} onClick={() => setAppearance(dyeAppearance)}>
                    <Icon appearance={dyeAppearance} />
                    <span>{capitalize(this.props.berry.name)} Dye</span>
                </button>
            </div>
        );
    }
}

interface BerryGridProps {
    slot: ItemSlot
}
class BerryGrid extends Component<BerryGridProps> {
    override render() {
        return (
            <div className="berryGrid">
                {Berries.map(berry => <BerryRow key={berry.name} slot={this.props.slot} berry={berry}></BerryRow>)}
            </div>
        );
    }
}

interface ChoiceSetSummaryProps {
    slot: ItemSlot
}
export class ChoiceSetSummary extends Component<ChoiceSetSummaryProps> {
    static contextType = StylunkContext
    context!: React.ContextType<typeof StylunkContext>;

    override render() {
        let equipped = this.context.appearance.wornItems[this.props.slot];

        if (equipped) {
            let recipe = this.context.appearance.wornItems[this.props.slot]!.toRecipeString()
            return (
                <summary>
                    {WardrobeRules[this.props.slot].label}
                    <span className="currentSelection"> — {equipped.name} {recipe}</span>
                </summary>
            );
        } else {
            return (<summary>{WardrobeRules[this.props.slot].label}</summary>);
        }
    }
}

interface ChoiceSetProps {
    slot: ItemSlot
}
export class ChoiceSet extends Component<ChoiceSetProps> {
    override shouldComponentUpdate(_: ChoiceSetProps, __: {}, nextContext: React.ContextType<typeof StylunkContext>): boolean {
        return !sameAppearance(this.context.appearance, nextContext.appearance);
    }

    override render() {
        return (
            <details open={WardrobeRules[this.props.slot].initiallyVisible} className={'slotOptions' + WardrobeRules[this.props.slot].colorable ? ' colorable' : ''}>
                <ChoiceSetSummary slot={this.props.slot}></ChoiceSetSummary>
                <ul className="optionsList">
                    {!WardrobeRules[this.props.slot].required ? <NoneChoice slot={this.props.slot}></NoneChoice> : <></>}
                    {Wardrobe[this.props.slot].flatMap(item => {
                        return item instanceof Item ? [
                            <ItemChoice key={item.name} slot={this.props.slot} item={item}></ItemChoice>
                        ] : [
                            <li key={item.category} className="category"><h4>{item.category}</h4></li>,
                            ...item.items.map(subItem => (
                                <ItemChoice key={(item as ItemCategory).category! + '_' + subItem.name} slot={this.props.slot} item={subItem}></ItemChoice>
                            ))
                        ];
                    })}
                </ul>
                {WardrobeRules[this.props.slot].colorable ? <BerryGrid slot={this.props.slot}></BerryGrid> : <></>}
            </details>
        );
    }
}
