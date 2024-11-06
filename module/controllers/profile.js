import {Path} from "./path.js";

export class Profile {

    static async addToActor(actor, itemData) {
        if (actor.items.filter(item => item.type === "profile").length > 0) {
            ui.notifications.error(game.i18n.localize("COG.notification.ProfileAlreadyOwned"));
            return false;
        } else {
            itemData = itemData instanceof Array ? itemData : [itemData];
            // Ajout du profil dans les embedded items
            let newProfileData = await actor.createEmbeddedDocuments("Item", itemData);
            let newProfile = newProfileData[0];

            let paths = [];
            for (const path of newProfile.system.paths) {
                let pathData = await fromUuid(path.sourceId);
                pathData.flags.core = { sourceId: path.sourceId };
                pathData.system.profile = {
                    _id: newProfile._id,
                    name: newProfile.name,
                    img: newProfile.img,
                    key: newProfile.system.key,
                    sourceId: newProfile._stats.compendiumSource,
                };
                paths.push(pathData);
            }
            
            const updates = {"_id": newProfile._id, "system.paths": paths};            
            await actor.updateEmbeddedDocuments("Item", [updates]);
            
            // add paths from profile
            return Path.addPathsToActor(actor, paths);          
        }
    }

     /**
     * @name removeFromActor
     * @description Supprime le profil et ses voies de l'acteur en paramètre
     * @public @static
     *
     * @param {CogActor} actor l'acteur sur lequel supprimer le profil
     * @param {CogItem} profile l'item profil à supprimer
     * @returns
     */
    static removeFromActor(actor, profile) {
        const paths = actor.items.filter(item => item.type === "path" && item.system.profile?._id === profile.id);
        return Dialog.confirm({
            title: game.i18n.localize("COG.dialog.deleteProfile.title"),
            content: game.i18n.format('COG.dialog.deleteProfile.confirm', {name:actor.name}),
            yes: () => {
                Path.removePathsFromActor(actor, paths).then(() => {
                    ui.notifications.info(paths.length == 1 ? game.i18n.localize("COG.dialog.deletePath.confirmOnePath") : game.i18n.format("COG.dialog.deletePath.confirmSeveralPaths", {nb: paths.length}));
                });
                ui.notifications.info(game.i18n.localize("COG.dialog.deleteProfile.confirmDelete"));
                return actor.deleteEmbeddedDocuments("Item", [profile.id]);
            },
            defaultYes: false
        });
    }

}