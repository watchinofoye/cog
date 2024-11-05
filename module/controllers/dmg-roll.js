export class DamageRoll {
    constructor(label, formula, isCritical, description){
        this._label = label;
        this._formula = formula;
        this._isCritical = isCritical;
        this._description = description;
    }

    async roll(actor){
        const r = new Roll(this._formula);
        // Manage explosive dice
        if (game.settings.get("cog","explosiveDice")) {
            r.dice.forEach((die)=>{
                if (!die.modifiers.includes("x")) die.modifiers.push("x");
            });
        }
        await r.roll();
        if (this._isCritical) r._total = r._total * 2;
        this._buildDamageRollMessage().then(msgFlavor => {
            r.toMessage({
                user: game.user.id,
                flavor: msgFlavor,
                speaker: ChatMessage.getSpeaker({actor: actor}),
                flags : {msgType : "damage"}
            });
        });
    }

    _buildDamageRollMessage() {
        const rollMessageTpl = 'systems/cog/templates/chat/dmg-roll-card.hbs';
        const tplData = {
            label : this._label,
            isCritical : this._isCritical,
            hasDescription : this._description && this._description.length > 0,
			description : this._description
        };
        return renderTemplate(rollMessageTpl, tplData);
    }

}