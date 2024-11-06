/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
import { CoGRoll } from "../controllers/roll.js";
import { Capacity } from "../controllers/capacity.js";
import { Path } from "../controllers/path.js";
import { Profile } from "../controllers/profile.js";
import { ArrayUtils } from "../utils/array-utils.js";
import { COG } from "../system/config.js";

export class CoGBaseSheet extends ActorSheet {
  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Right click to open
    html.find(".cog-compendium-pack").contextmenu((ev) => {
      ev.preventDefault();
      const li = $(ev.currentTarget);

      let packName;
      let attributeName;
      // SHIFT + right click to alternative open
      if (ev.shiftKey) {
        packName = "alternative-pack";
        attributeName = "data-alternative-open";
      } else {
        packName = "pack";
        attributeName = "data-open";
      }
      const pack = game.packs.get(li.data(packName));
      if (pack) {
        if (li.attr(attributeName) === "1") {
          li.attr(attributeName, "0");
          pack.apps[0].close();
        } else {
          li.attr(attributeName, "1");
          pack.render(true);
        }
      }
    });

    // Click to open
    html.find(".item-create.cog-compendium-pack").click((ev) => {
      ev.preventDefault();
      let li = $(ev.currentTarget);
      let packName = li.data("pack").startsWith("cog.") ? li.data("pack") : `cog.${li.data("pack")}`;
      let pack = game.packs.get(packName);
      if (li.attr("data-open") === "1") {
        li.attr("data-open", "0");
        pack.apps[0].close();
      } else {
        li.attr("data-open", "1");
        pack.render(true);
      }
    });

    // Initiate a roll
    html.find(".rollable").click((ev) => {
      ev.preventDefault();
      return this._onRoll(ev);
    });

    // Equip/Unequip item
    html.find(".inventory-equip").click(this._onToggleEquip.bind(this));

    // Stackable item
    html.find(".inventory-consume").click(this._onConsume.bind(this));
    html.find(".inventory-qty").click(this._onIncrease.bind(this));
    html.find(".inventory-qty").contextmenu(this._onDecrease.bind(this));

    // html.find('.item-name, .item-edit').click(this._onEditItem.bind(this));
    html.find(".item-edit").click(this._onEditItem.bind(this));
    html.find(".item .item-name h4").click(this._onItemSummary.bind(this));
    html.find(".item-to-chat").click(this._onSendToChatItem.bind(this));
    html.find(".item-delete").click(this._onDeleteItem.bind(this));
    html.find(".foldable h3.item-name").click((ev) => {
      ev.preventDefault();
      const li = $(ev.currentTarget);
      const ol = li.parents(".inventory-list");
      const tab = ol.data("tab");
      const category = ol.data("category");
      const itemList = ol.find(".item-list");
      const actor = this.actor;
      itemList.slideToggle("fast", function () {
        ol.toggleClass("folded");
        if (actor.system.settings) {
          if (ol.hasClass("folded")) {
            if (!actor.system.settings[tab].folded.includes(category)) {
              actor.system.settings[tab].folded.push(category);
            }
          } else {
            ArrayUtils.remove(actor.system.settings[tab].folded, category);
          }
        }
        actor.update({ "system.settings": actor.system.settings });
      });
    });

    // Check/Uncheck capacities
    html.find(".capacity-checked").click((ev) => {
      ev.preventDefault();
      return this._onCheckedCapacity(this.actor, ev, true);
    });
    html.find(".capacity-unchecked").click((ev) => {
      ev.preventDefault();
      return this._onCheckedCapacity(this.actor, ev, false);
    });
    html.find(".capacity-create").click((ev) => {
      ev.preventDefault();
      return Capacity.create(this.actor, ev);
    });
    html.find(".capacity-toggle").click((ev) => {
      ev.preventDefault();
      const li = $(ev.currentTarget).closest(".capacity");
      li.find(".capacity-description").slideToggle(200);
    });

    // Effects controls
    html.find(".effect-toggle").click((ev) => {
      ev.preventDefault();
      const elt = $(ev.currentTarget).parents(".effect");
      const effectId = elt.data("itemId");
      let updateData = foundry.utils.duplicate(this.actor);
      let effects = updateData.effects;
      const effect = effects.find((e) => e._id === effectId);
      if (effect) {
        effect.disabled = !effect.disabled;
        return this.actor.update(updateData);
      }
    });
    html.find(".effect-create").click((ev) => {
      ev.preventDefault();
      return this.actor.createEmbeddedDocuments("ActiveEffect", [
        {
          name: game.i18n.localize("COG.ui.newEffect"),
          img: "icons/svg/aura.svg",
          origin: this.actor.uuid,
          "duration.rounds": undefined,
          disabled: true,
        },
      ]);
    });
    html.find(".effect-edit").click(this._onEditItem.bind(this));
    html.find(".effect-delete").click((ev) => {
      ev.preventDefault();
      const elt = $(ev.currentTarget).parents(".effect");
      const effectId = elt.data("itemId");
      let effect = this.actor.effects.get(effectId);
      if (effect) effect.delete();
    });
  }

  /**
   * @name _onCheckedCapacity
   * @description Evènement sur la case à cogher d'une capacité dans la partie voie
   * @param {CofActor} actor l'acteur
   * @param {Event} event l'évènement
   * @param {boolean} isUncheck la capacité est décoghée
   * @returns l'acteur modifié
   * @private
   */
  _onCheckedCapacity(actor, event, isUncheck) {
    const elt = $(event.currentTarget).parents(".capacity");
    // get id of clicked capacity
    const capId = elt.data("itemId");
    // get id of parent path
    const pathId = elt.data("pathId");
    return Capacity.toggleCheck(actor, capId, pathId, isUncheck);
  }

  /**
   * Callback on render item actions : display or not the summary
   * @param event
   * @private
   */
  _onItemSummary(event) {
    event.preventDefault();
    let li = $(event.currentTarget).parents(".item").children(".item-summary");
    let entity = this.actor.items.get($(event.currentTarget).parents(".item").data("itemId"));
    if (entity && (entity.type === "capacity" || entity.type === "encounterWeapon")) {
      if (li.hasClass("expanded")) {
        li.css("display", "none");
      } else {
        li.css("display", "block");
      }
      li.toggleClass("expanded");
    } else {
      this._onEditItem(event);
    }
  }

  /**
   * Callback on render item actions
   * @param event
   * @private
   */
  _onEditItem(event) {
    event.preventDefault();
    const li = $(event.currentTarget).parents(".item");
    const id = li.data("itemId");
    const type = li.data("itemType") ? li.data("itemType") : "item";
    const uuid = li.data("uuid");

    if (type === "effect") {
      let effects = this.actor.effects;
      const effect = effects.get(id);
      if (effect) {
        return new COFActiveEffectConfig(effect, {}).render(true);
      } else return false;
    } else if (type === "capacity") {
      // Recherche d'un capacité existante avec la même clé
      const key = li.data("key");
      let entity = this.actor.items.find((i) => i.type === "capacity" && i.system.key === key);
      return entity ? entity.sheet.render(true) : fromUuid(uuid).then((e) => e.sheet.render(true));
    } else {
      // look first in actor embedded items
      let entity = this.actor.items.get(id);
      return entity ? entity.sheet.render(true) : fromUuid(uuid).then((e) => e.sheet.render(true));
    }
  }

  /**
   * Callback on the senf to chat action
   * @private
   */
  async _onSendToChatItem(event) {
    event.preventDefault();
    const id = $(event.currentTarget).parents(".item").data("itemId");
    console.log("Send to chat", id);

    let item = this.actor.items.get(id);

    // decription may begin by "<h1>Description</h1>", we suppress it
    let description = item.system.description;
    if (description && description.startsWith("<h1>Description</h1>")) {
      description = description.substr(20);
    }

    const templateData = {
      itemName: item.name,
      itemUuid: item.uuid,
      description: description,
      limited: item.system.limited,
      spell: item.system.spell,
      ranged: item.system.properties.ranged,
      limitedUsage: item.system.limitedUsage,
      save: item.system.save,
      activable: item.system.properties.activable,
    };

    const html = await renderTemplate("systems/cog/templates/chat/item-card.hbs", templateData);
    let chatData = {
      speaker: ChatMessage.getSpeaker(),
      content: html,
    };
    ChatMessage.create(chatData, {});
  }

  _onIncrease(event) {
    event.preventDefault();
    const li = $(event.currentTarget).closest(".item");
    const item = this.actor.items.get(li.data("itemId"));
    return item.modifyQuantity(1, false);
  }

  _onDecrease(event) {
    event.preventDefault();
    const li = $(event.currentTarget).closest(".item");
    const item = this.actor.items.get(li.data("itemId"));
    return item.modifyQuantity(1, true);
  }

  /**
   * Callbacks on consume actions
   * @param event
   * @private
   */
  _onConsume(event) {
    event.preventDefault();
    const li = $(event.currentTarget).closest(".item");
    const item = this.actor.items.get(li.data("itemId"));

    this.actor.consumeItem(item);
  }

  _onToggleEquip(event) {
    event.preventDefault();
    const li = $(event.currentTarget).closest(".item");
    const item = this.actor.items.get(li.data("itemId"));

    const bypassChecks = event.shiftKey;

    return this.actor.toggleEquipItem(item, bypassChecks);
  }

  /* -------------------------------------------- */
  /* DELETE EVENTS CALLBACKS                      */
  /* -------------------------------------------- */

  /**
   * Callback on delete item actions
   * @param event the roll event
   * @private
   */
  _onDeleteItem(event) {
    event.preventDefault();
    const li = $(event.currentTarget).parents(".item");
    let itemId = li.data("itemId");
    const entity = this.actor.items.find((item) => item.id === itemId);
    itemId = itemId instanceof Array ? itemId : [itemId];
    switch (entity.type) {
      case "capacity":
        return Capacity.removeFromActor(this.actor, entity);
      case "path":
        return Path.removeFromActor(this.actor, entity);
      case "profile":
        return Profile.removeFromActor(this.actor, entity);
      default:
        return this.actor.deleteEmbeddedDocuments("Item", itemId);
    }
  }

  /* -------------------------------------------- */
  /* DROP EVENTS CALLBACKS                        */
  /* -------------------------------------------- */

  /** @override */
  async _onDrop(event) {
    event.preventDefault();
    // Get dropped data
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch (err) {
      return false;
    }
    if (!data) return false;
    if (data.type === "Item") {
      return this._onDropItem(event, data);
    }
    if (data.type === "Actor") {
      return false;
    }
  }

  /**
   * Handle dropping of an item reference or item data onto an Actor Sheet
   * @param {DragEvent} event     The concluding DragEvent which contains drop data
   * @param {Object} data         The data transfer extracted from the event
   * @return {Object}             OwnedItem data to create
   * @private
   */
  async _onDropItem(event, data) {
    if (!this.actor.isOwner) return false;

    const item = await Item.fromDropData(data);
    if (!COG.actorsAllowedItems[this.actor.type]?.includes(item.type)) return;

    const itemData = foundry.utils.duplicate(item);
    switch (itemData.type) {
      case "path":
        return await Path.addToActor(this.actor, item);
      case "profile":
        return await Profile.addToActor(this.actor, itemData);
      case "capacity":
      default: {
        // Handle item sorting within the same Actor
        const actor = this.actor;
        let sameActor = item.actor?.id === actor.id && ((!actor.isToken && !data.tokenId) || data.tokenId === actor.token.id);
        if (sameActor) return this._onSortItem(event, itemData);

        // On force le nouvel Item a ne pas être équipé (notamment lors du transfert d'un inventaire à un autre)
        if (itemData.system.worn) itemData.system.worn = false;

        // Create the owned item
        return this.actor.createEmbeddedDocuments("Item", [itemData]).then(async () => {
          // Si il n'y as pas d'actor id, il s'agit d'un objet du compendium, on quitte
          if (!item.actor) return item;

          // Si l'item doit être "move", on le supprime de l'actor précédent
          let moveItem = game.settings.get("cog", "moveItem");
          if (moveItem ^ event.shiftKey) {
            const originalActor = (await fromUuid(data.uuid)).actor;
            originalActor.deleteEmbeddedDocuments("Item", [item.id]);
          }
        });
      }
    }
  }

  /* -------------------------------------------- */
  /* ROLL EVENTS CALLBACKS                        */
  /* -------------------------------------------- */

  /**
   * Initiates a roll from any kind depending on the "data-roll-type" attribute
   * @param event the roll event
   * @private
   */
  async _onRoll(event) {
    const elt = $(event.currentTarget)[0];
    const rolltype = elt.attributes["data-roll-type"].value;
    let data = await this.getData();
    // SHIFT + click
    if (event.shiftKey) {
      switch (rolltype) {
        // Spend recovery point without getting hit points
        case "recovery":
          return CoGRoll.rollRecoveryUse(data.data, this.actor, false);
      }
    }
    switch (rolltype) {
      case "skillcheck":
        return CoGRoll.skillCheck(data.data, this.actor, event);
      case "weapon":
        return CoGRoll.rollWeapon(data.data, this.actor, event);
      case "damage":
        return CoGRoll.rollDamage(data.data, this.actor, event);
      case "encounter-weapon":
        return CoGRoll.rollEncounterWeapon(data.data, this.actor, event);
      case "encounter-damage":
        return CoGRoll.rollEncounterDamage(data.data, this.actor, event);
      case "hp":
        return CoGRoll.rollHitPoints(data.data, this.actor, event);
      case "attributes":
        return CoGRoll.rollAttributes(data.data, this.actor, event);
      case "recovery":
        return CoGRoll.rollRecoveryUse(data.data, this.actor, true);
    }
  }

  /** @override */
  async getData(options) {
    const data = super.getData(options);
    const actorData = data.data;
    data.isGm = game.user.isGM;

    // Basic data
    let isOwner = this.actor.isOwner;

    data.owner = isOwner;
    data.limited = this.actor.limited;
    data.options = this.options;
    data.editable = this.isEditable;
    data.config = game.cog.config;
    data.cssClass = isOwner ? "editable" : "locked";
    data.isCharacter = this.actor.type === "character";
    data.isNPC = this.actor.type === "npc";
    data.isEncounter = this.actor.type === "encounter";
    data.isVehicle = this.actor.type === "vehicle";
    data.rollData = this.actor.getRollData.bind(this.actor);

    data.effects = data.actor.effects;
    data.folded = {
      combat: actorData.system.settings?.combat ? actorData.system.settings?.combat.folded : [],
      inventory: actorData.system.settings?.inventory ? actorData.system.settings?.inventory.folded : [],
      capacities: actorData.system.settings?.capacities ? actorData.system.settings?.capacities.folded : [],
      effects: actorData.system.settings?.effects ? actorData.system.settings?.effects.folded : [],
    };
    data.actor = actorData;
    data.system = actorData.system;

    return data;
  }
}
