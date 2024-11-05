export const System = {};

System.label = "Chroniques Oubliées Galactiques";
System.name = "cog";
System.rootPath = "/systems/" + System.name;
System.dataPath = System.rootPath + "/data";
System.templatesPath = System.rootPath + "/templates";
System.debugMode = true;
System.DEV_MODE = false;

System.ASCII = `
   ******    *******     ******
  **////**  **/////**   **////**
 **    //  **     //** **    //
/**       /**      /**/**
/**       /**      /**/**
//**    **//**     ** //**    **
 //******  //*******   //******
  //////    ///////     ////// `;

export const COG = {};

COG.stats = {
    "str": "COG.stats.str.label",
    "dex": "COG.stats.dex.label",
    "con": "COG.stats.con.label",
    "int": "COG.stats.int.label",
    "wis": "COG.stats.wis.label",
    "cha": "COG.stats.cha.label"
};

COG.skills = {
    "melee": "COG.attacks.melee.label",
    "ranged": "COG.attacks.ranged.label",
    "magic": "COG.attacks.magic.label"
};

COG.statAbbreviations = {
    "str": "COG.stats.str.abbrev",
    "dex": "COG.stats.dex.abbrev",
    "con": "COG.stats.con.abbrev",
    "int": "COG.stats.int.abbrev",
    "wis": "COG.stats.wis.abbrev",
    "cha": "COG.stats.cha.abbrev"
};

COG.itemProperties = {
    "equipable": "COG.properties.equipable",
    "stackable": "COG.properties.stackable",
    "unique": "COG.properties.unique",
    "ranged": "COG.properties.ranged",
    "proficient": "COG.properties.proficient",
    "finesse": "COG.properties.finesse",
    "two-handed": "COG.properties.two-handed",
    "equipment": "COG.properties.equipment",
    "weapon": "COG.properties.weapon",
    "protection": "COG.properties.protection",
    "reloadable": "COG.properties.reloadable",
    "bow": "COG.properties.bow",
    "crossbow": "COG.properties.crossbow",
    "powder": "COG.properties.powder",
    "throwing": "COG.properties.throwing",
    "dr": "COG.properties.dr",
    "sneak": "COG.properties.sneak",
    "powerful": "COG.properties.powerful",
    "critscience": "COG.properties.critscience",
    "specialization": "COG.properties.specialization",
    "effects": "COG.properties.effects",
    "activable": "COG.properties.activable",
    "2H": "COG.properties.2H",
    "13strmin": "COG.properties.13strmin",
    "bashing": "COG.properties.bashing",
    "sling": "COG.properties.sling",
    "spell": "COG.properties.spell",
    "profile": "COG.properties.profile",
    "prestige": "COG.properties.prestige",
    "alternative": "COG.properties.alternative",
    "racial": "COG.properties.racial",
    "creature": "COG.properties.creature",
    "proneshot": "COG.properties.proneshot",
    "salve": "COG.properties.salve",
    "explosive": "COG.properties.explosive"
};

COG.itemSlots = {
    hand: "COG.slot.hand",
    head: "COG.slot.head",
    ear: "COG.slot.ear",
    neck: "COG.slot.neck",
    shoulders: "COG.slot.shoulders",
    chest: "COG.slot.chest",
    back: "COG.slot.back",
    arm: "COG.slot.arm",
    finger: "COG.slot.finger",
    wrist: "COG.slot.wrist",
    waist: "COG.slot.waist",
    legs: "COG.slot.legs",
    feet: "COG.slot.feet",
    belt: "COG.slot.belt",
    backpack: "COG.slot.backpack",
    quiver: "COG.slot.quiver"
};

COG.itemTypes = {
    "profile": "COG.category.profile",
    "capacity": "COG.category.capacity",
    "path": "COG.category.path",
    "trait": "COG.category.trait",
    "item": "COG.category.item",
    "encounterWeapon": "COG.category.encounterWeapon"
};

COG.itemCategories = {
    "armor": "COG.category.armor",
    "shield": "COG.category.shield",
    "melee": "COG.category.melee",
    "ranged": "COG.category.ranged",
    "spell": "COG.category.spell",
    "currency": "COG.category.currency",
    "jewel": "COG.category.jewel",
    "ammunition": "COG.category.ammunition",
    "consumable": "COG.category.consumable",
    "container": "COG.category.container",
    "mount": "COG.category.mount",
    "vehicle": "COG.category.vehicle",
    "trapping": "COG.category.trapping",
    "other": "COG.category.other"
}

COG.itemIcons = {
    "item": "icons/svg/tankard.svg",
    "capacity": "icons/svg/wing.svg",
    "profile": "icons/svg/statue.svg",
    "path": "icons/svg/upgrade.svg",
    "trait": "icons/svg/eye.svg",
    "encounterWeapon": "icons/svg/pawprint.svg"
}

COG.actorIcons = {
    "npc": "icons/svg/angel.svg",
    "encounter": "icons/svg/terror.svg"
}

COG.actorsAllowedItems = {
    "character": [
        "item",
        "capacity",
        "trait",
        "profile",
        "path"
    ],
    "npc": [
        "item",
        "capacity",
        "trait",
        "profile",
        "path"
    ],
    "encounter": [
        "item",
        "capacity",
        "encounterWeapon"
    ]
}

COG.debug = false;

/**
 * Creature sizes.
 * @enum {string}
 */
COG.actorSizes = {
    tiny: "COG.encounter.size.tiny",
    small: "COG.encounter.size.small",
    short: "COG.encounter.size.short",
    med: "COG.encounter.size.medium",
    big: "COG.encounter.size.big",
    huge: "COG.encounter.size.huge",
    colossal: "COG.encounter.size.colossal"
};

/**
 * Encounter archetype.
 * @enum {string}
 */
COG.encounterArchetypes = {
    standard: "COG.encounter.archetype.standard",
    rapide: "COG.encounter.archetype.rapide",
    puissant: "COG.encounter.archetype.puissant",
    inférieur: "COG.encounter.archetype.inférieur"
};
/**
 * Encounter category.
 * @enum {string}
 */
COG.encounterCategories = {
    vivante: "COG.encounter.category.vivante",
    humanoïde: "COG.encounter.category.humanoïde",
    "non-vivante": "COG.encounter.category.non-vivante"
};

/**
 * Encounter Boss Rank.
 * @enum {string}
 */
COG.encounterBossRanks = {
    "1": "COG.encounter.boss.rank.endurci",
    "2": "COG.encounter.boss.rank.expert",
    "3": "COG.encounter.boss.rank.elite",
    "4": "COG.encounter.boss.rank.legendaire"
};

COG.DICE_VALUES = {
    "1d4": "1d4",
    "1d6": "1d6",
    "1d8": "1d8",
    "1d10": "1d10",
    "1d12": "1d12",
    "1d20": "1d20"
};

COG.DAMAGE_STAT = {
    "@stats.str.mod": "COG.stats.str.label",
    "@stats.dex.mod": "COG.stats.dex.label",
    "@stats.con.mod": "COG.stats.con.label",
    "@stats.int.mod": "COG.stats.int.label",
    "@stats.wis.mod": "COG.stats.wis.label",
    "@stats.cha.mod": "COG.stats.cha.label"
};

COG.SKILL = {
    "@attacks.melee.mod": "COG.attacks.melee.label",
    "@attacks.ranged.mod": "COG.attacks.ranged.label",
    "@attacks.magic.mod": "COG.attacks.magic.label"
};

COG.DURATION = {
    rounds: "COG.ui.rounds",
    minutes: "COG.ui.minutes",
    hours: "COG.ui.hours",
    days: "COG.ui.days"
};

COG.SPELLCASTING = {
    "@stats.int.mod": "COG.stats.int.label",
    "@stats.wis.mod": "COG.stats.wis.label",
    "@stats.cha.mod": "COG.stats.cha.label"
};

COG.FAMILY = {
    "action": "COG.Family.action",
    "adventure": "COG.Family.adventure",
    "reflexion": "COG.Family.reflexion"
};

COG.SETTING = {
    "base": "COG.setting.base",
    "epouvante": "COG.setting.epouvante",
    "pulp": "COG.setting.pulp",
    "zombis": "COG.setting.zombis",
    "espionnage": "COG.setting.espionnage",
    "surhumains": "COG.setting.surhumains",
    "cyberpunk": "COG.setting.cyberpunk"
};

COG.RELOAD = {
    s: "COG.ui.simpleAction",
    l: "COG.ui.limitedAction"
};
