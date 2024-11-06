import { CoGBaseSheet } from "./base-sheet.js";
import { COG } from "../system/config.js";

export class CoGNpcSheet extends CoGBaseSheet {

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["cog", "base", "sheet", "actor", "npc"],
            template: "/systems/cog/templates/actors/actor-sheet.hbs",
            width: 970,
            height: 750,
            tabs: [{navSelector: ".sheet-navigation", contentSelector: ".sheet-body", initial: "stats"}],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        });
    }

    /** @override */
    async getData(options) {
        const data = await super.getData(options);
        if (COG.debug) console.log("COG | NpcSheet getData", data);

        // The Actor's data
        const actorData = this.actor.toObject(false);

        // Owned Items
        data.profile = actorData.items.find(item => item.type === "profile");
        data.trait = actorData.items.find(item => item.type === "trait");

        // PATHS & CAPACITIES
        const paths = actorData.items.filter(item => item.type === "path");
        data.paths = paths;
        data.pathCount = data.paths.length;
        data.capacities = {
            count: actorData.items.filter(item => item.type === "capacity").length,
            collections: []
        }
        data.capacities.collections.push({
            id: "standalone-capacities",
            label: "Capacités Hors-Voies",
            items: Object.values(actorData.items).filter(item => {
                if (item.type === "capacity" && item.system.path.key === "") {
                    return true;
                }
            }).sort((a, b) => (a.name > b.name) ? 1 : -1)
        });
        for (const path of paths) {
            data.capacities.collections.push({
                id: (path.system.key) ? path.system.key : path.name.slugify({ strict: true }),
                label: path.name,
                items: Object.values(actorData.items).filter(item => {
                    if (item.type === "capacity" && item.system.path._id === path._id) return true;
                }).sort((a, b) => (a.system.rank > b.system.rank) ? 1 : -1)
            });
        }


        data.items = actorData.items;
        for ( let i of actorData.items ) {
            const item = this.actor.items.get(i._id);
            i.labels = item.labels;
        }
        data.items.sort((a, b) => (a.sort || 0) - (b.sort || 0));

        // Labels and filters
        data.labels = this.actor.labels || {};

        // Combat and Inventory
        data.combat = {
            count: data.items.filter(i => i.system.worn).length,
            categories: []
        };
        data.inventory = {
            count: data.items.filter(i => i.type === "item").length,
            categories: []
        };
        for (const category of Object.keys(game.cog.config.itemCategories)) {
            data.combat.categories.push({
                id: category,
                label: game.cog.config.itemCategories[category],
                items: Object.values(data.items).filter(item => item.type === "item" && item.system.subtype === category && item.system.worn && (item.system.properties.weapon || item.system.properties.protection)).sort((a, b) => (a.name > b.name) ? 1 : -1)
            });
            data.inventory.categories.push({
                id: category,
                label: "COG.category." + category,
                items: Object.values(data.items).filter(item => item.type === "item" && item.system.subtype === category).sort((a, b) => (a.name > b.name) ? 1 : -1)
            });
        }

        data.combat.categories.forEach(category => {
            if (category.items.length > 0) {
                category.items.forEach(item => {
                    if (item.system.properties?.weapon) {
                        // Compute MOD
                        const itemModStat = item.system.skill.split("@")[1];
                        const itemModBonus = parseInt(item.system.skillBonus);

                        item.system.mod = this.actor.computeWeaponMod(itemModStat, itemModBonus);

                        // Compute DM
                        const itemDmgBase = item.system.dmgBase;
                        const itemDmgStat = item.system.dmgStat.split("@")[1];
                        const itemDmgBonus = parseInt(item.system.dmgBonus);

                        item.system.dmg = this.actor.computeDm(itemDmgBase, itemDmgStat, itemDmgBonus)
                    }
                });
            }
        });

        // Gestion des boutons de modification des effets (visible pour le npc)
        data.isEffectsEditable = true;

        data.enrichedDescription = await TextEditor.enrichHTML(this.object.system.description, {async: true});

        if (COG.debug) console.log("COG | NpcSheet getData", data);
        return data;
    }
}
