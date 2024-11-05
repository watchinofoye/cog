import { CharacterGeneration } from "./chargen.js";
import { Hitpoints } from "../controllers/hitpoints.js";
import { CoCActor } from "../actors/actor.js";
import { Macros } from "./macros.js";

export default function registerHooks() {
  Hooks.on("getChatLogEntryContext", (html, options) => {
    let canApplyDamage = (li) => li.find("h2.damage").length;
    let canApplyHealing = (li) => li.find("h2.heal").length;

    options.push(
      {
        name: game.i18n.localize("COC.ui.applyDamage"),
        icon: '<i class="fas fa-user-minus"></i>',
        condition: canApplyDamage,
        callback: (li) => {
          const dmg = parseInt(li.find(".dice-total").text());
          Hitpoints.applyToTargets(-dmg);
        },
      },
      {
        name: game.i18n.localize("COC.ui.applyDamage"),
        icon: '<i class="fas fa-user-minus"></i>',
        condition: canApplyHealing,
        callback: (li) => {
          const dmg = parseInt(li.find(".dice-total").text());
          Hitpoints.applyToTargets(-dmg);
        },
      },
      {
        name: game.i18n.localize("COC.ui.applyHalfDamage"),
        icon: '<i class="fas fa-user-shield"></i>',
        condition: canApplyDamage,
        callback: (li) => {
          const dmg = Math.ceil(parseInt(li.find(".dice-total").text()) / 2);
          Hitpoints.applyToTargets(-dmg);
        },
      },
      {
        name: game.i18n.localize("COC.ui.applyDoubleDamage"),
        icon: '<i class="fas fa-user-injured"></i>',
        condition: canApplyDamage,
        callback: (li) => {
          const dmg = parseInt(li.find(".dice-total").text()) * 2;
          Hitpoints.applyToTargets(-dmg);
        },
      },
      {
        name: game.i18n.localize("COC.ui.applyHealing"),
        icon: '<i class="fas fa-user-plus"></i>',
        condition: canApplyDamage,
        callback: (li) => {
          const dmg = parseInt(li.find(".dice-total").text());
          Hitpoints.applyToTargets(dmg);
        },
      },
      {
        name: game.i18n.localize("COC.ui.applyHealing"),
        icon: '<i class="fas fa-user-plus"></i>',
        condition: canApplyHealing,
        callback: (li) => {
          const dmg = parseInt(li.find(".dice-total").text());
          Hitpoints.applyToTargets(dmg);
        },
      }
    );
  });
}

/**
 * Create a macro when dropping an entity on the hotbar
 * Item      - open roll dialog for item
 * Actor     - open actor sheet
 * Journal   - open journal sheet
 */

Hooks.on("hotbarDrop", (bar, data, slot) => {
  if (["Actor", "Item", "JournalEntry"].includes(data.type)) {
    Macros.createCocMacro(data, slot);
    return false;
  }
});

/**
 * Intercepte les commandes de chat
 * /stat - Jet de caractéristique
 * /skill stat - Jet de caractéristique
 * /stats - Génère les caractéristiques d'un personnage
 */

Hooks.on("chatMessage", (html, content, msg) => {
  let regExp;
  regExp = /(\S+)/g;
  let commands = content.match(regExp);
  let command = commands.length > 0 && commands[0].split("/").length > 0 ? commands[0].split("/")[1].trim() : null;
  let arg1 = commands.length > 1 ? commands[1].trim() : null;
  const actor = game.cog.macros.getSpeakersActor();

  const validCommands = ["for", "str", "dex", "con", "int", "sag", "wis", "cha", "atc", "melee", "atd", "ranged", "atm", "magic"];

  if (command && validCommands.includes(command)) {
    game.cog.macros.rollStatMacro(actor, command, 0, 0, null);
    return false;
  } else if (command && command === "skill") {
    if (arg1 && validCommands.includes(arg1)) {
      game.cog.macros.rollStatMacro(actor, arg1, 0, 0, null);
    } else {
      ui.notifications.error('Vous devez préciser la caractéristique à tester, par exemple "/skill str".');
    }
    return false;
  } else if (command && command === "stats") {
    CharacterGeneration.statsCommand();
    return false;
  }
});

Hooks.on("renderChatMessage", (message, html, data) => {
  // Affiche ou non les boutons d'application des dommages
  if (game.settings.get("cog", "displayChatDamageButtonsToAll")) {
    html.find(".apply-dmg").click((ev) => Hitpoints.onClickChatMessageApplyButton(ev, html, data));
  } else {
    if (game.user.isGM) {
      html.find(".apply-dmg").click((ev) => Hitpoints.onClickChatMessageApplyButton(ev, html, data));
    } else {
      html.find(".apply-dmg").each((i, btn) => {
        btn.style.display = "none";
      });
      html.find(".dr-checkbox").each((i, btn) => {
        btn.style.display = "none";
      });
    }
  }
  // Affiche ou non la difficulté
  const displayDifficulty = game.settings.get("cog", "displayDifficulty");
  if (displayDifficulty === "none" || (displayDifficulty === "gm" && !game.user.isGM)) {
    html.find(".display-difficulty").each((i, elt) => {
      elt.remove();
    });
  }

  html.find(".item-chat").click(async (event) => {
    event.preventDefault();
    const uuid = $(event.currentTarget).data("itemUuid");
    let item = await fromUuid(uuid);
    if (item) item.sheet.render(true);
  });
});

/**
 * Intercepte la création d'un active effect
 * Si l'effet provient d'un item équipable, on disable l'effet si l'item n'est pas équipé (par défaut il n'est pas équipé)
 * Il n'y as pas de preCreateActiveEffect pour les effets transférés depuis un item
 * On procède donc à une mise à jour de l'effet
 */
Hooks.on("createActiveEffect", (activeEffect) => {
  // Si l'effet ne s'applique pas à un actor, on quitte en laissant l'effet se créer normalement
  if (!activeEffect.parent instanceof CoCActor) return;

  let origin = activeEffect.origin;
  // Si l'effet ne provient pas d'un item, on quitte en laissant l'effet se créer normalement
  if (!/Item\.[^.]+$/.test(origin)) return;

  let parts = origin.split(".");
  let item;

  // Récupération de l'item parent en fonction de si il vient d'un actor du compendium ou d'un token
  if (parts[0] === "Actor") {
    item = ActorDirectory.collection.get(parts[1])?.getEmbeddedDocument("Item", parts[3]);
  } else if (parts[0] === "Scene") {
    item = SceneDirectory.collection.get(parts[1])?.tokens.get(parts[3])?.getEmbeddedDocument("Item", parts[5]);
  } else return true;

  // Si l'item parent n'est pas équipable, on quitte en laissant l'effet se créer normalement
  let itemData = item;
  if (!itemData.system.properties?.equipable) return;

  // Si l'effet est déjà à jour, on quitte
  if (activeEffect.disabled === !itemData.system.worn) return;

  // On met à jour l'effet en fonction du fait que l'item est équipé ou non
  activeEffect.update({ disabled: !itemData.system.worn });
});
