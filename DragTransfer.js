// DragTransfer
// (c) 2021 David Zvekic


"use strict";

import {registerSettings} from './settings/settings.js';

let dragTransfer = new Object();

Hooks.once('init', () => {
    registerSettings();
});



function isSuperset(set, subset) {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false
        }
    }
    return true
}

Hooks.on('dropActorSheetData', (dragTarget, sheet, dragSource, user) => {


    function isAlt() {
        // check if Alt and only Alt is being pressed during the drop event.

        let downKeys;
        let alt;

        if (typeof game.keyboard.downKeys !== 'undefined') {
            // FoundyVTT v9+ compatible  
            downKeys = game.keyboard.downKeys;
            alt = new Set(['AltLeft']);
        } else {
            // FoundryVTT v7, v8 compatible  
            downKeys = game.keyboard._downKeys;
            alt = new Set(['Alt']);
        }

        return (isSuperset(alt, downKeys) && isSuperset(downKeys, alt));
    }

    if (isAlt()) return; // ignore Drag'N'Transfer when Alt is pressed to drop.


    if (dragSource.type == "Item" && dragSource.uuid) {


        if (!dragTarget.data._id) {
            console.warn("Drag'n'Transfer - target has no data._id?", dragTarget);
            return;
        }
        let sourceActor = fromUuidSync(dragSource.uuid).actor;
        let targetActor = fromUuidSync(dragTarget.uuid);
        if (sourceActor.id == targetActor.id) return; // ignore dropping on self
        if (sourceActor) {
            // if both source and target have the same type then allow deleting original item.
            // this is a safety check because some game systems may allow dropping on targets
            // that don't actually allow the GM or player to see the inventory, making the item
            // inaccessible.


            function checkCompatable(a, b) {
                console.info('DragNTransfer - Check Compatability: Dragging Item:"' + String(dragSource.type) + '" from sourceActor.data.type:"' + String(a) + '" to dragTarget.data.type:"' + String(b) + '".');
                if (a == b) return true;
                try {

                    const transferPairs = JSON.parse("{" + game.settings.get('DragTransfer', 'actorTransferPairs') + "}");

                    if (transferPairs[a] == b) return true;
                    if (transferPairs[b] == a) return true;

                } catch (err) {
                    console.error('DragTransfer: ', err.message);
                    ui.notifications.error('DragTransfer: ' + err.message);
                }
                return false;
            };

            if (checkCompatable(sourceActor.type, dragTarget.type)) {
                if (sourceActor.deleteEmbeddedDocuments != undefined) {
                    sourceActor.deleteEmbeddedDocuments("Item", [fromUuidSync(dragSource.uuid).id]);
                } else {
                    sourceActor.deleteOwnedItem(dragSource.id);
                }
            }
        }
    }
});
