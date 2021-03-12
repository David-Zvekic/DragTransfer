# Drag'n'Transfer v 1.0.0
A module for Foundry VTT 

Enable moving (rather than cloning) inventory between actors by dragging and dropping.

This tool is mostely useful for GM who want to easily be able to distribute items between character sheets - without accidentally duplicating items.  Or possibly players transfering items from dead companions.

Standard Foundry VTT behavior clones items when they are dragged and dropped from 1 actor-sheet to another. If you prefer the item to not be duplicated, this module might be what you are looking for: **Drag'n'Transfer**  causes the item to be deleted from the original sheet when it is dropped onto another actor sheet.

I've tested it with DND5e and alienrpg Systems.  **Drag'n'Transfer** depends on items being recorded using certain JSON values. (In the future I may make this JSON configurable if people send requests). Please tell me if you get it to work on other systems. I didn't specifically target any particular systems, but those are the 2 that I play, so I noticed that it works on both.

It is important for GM's to test this module in their world because Drag'n'Transfer **assumes** that the item will be cloned onto the destination.  Drag'n'Transfer hooks on the drop action, and doesnt know if another module ALSO hooks onto the drop action and changes the destiny of that dropped item.  For example: if another module canceled the cloning, preventing the item from being cloned, Drag'n'Transfer would not know and would still delete the item from the original actor sheet.

**Limitation :**  To prevent deletion of items when they are dropped onto sheets that lack a comparable inventory section, this module will only respond when both the source and target of the drag and drop are both of the same "type".  If you are playing a system that gives all actors the same "type" then this safety check wont work and you are responsible to make sure you dont drop items onto target sheets that lack the ability to display the same items as the source. 

**PRO TIP**: If players want to leave things in a room somewhere, you can create an Actor-sheet with a token that looks like a box, and then drag'n'drop inventory into that actor-sheet, and just leave the token of that actor on the map.  Their items will be recorded inside the actor and need not clutter up your item sidebar.

**Future Plans:** If I can create a generic "Inventory Actory" that is system agnostic and serves as an actor with a token which items can be dragged and dropped from.  Such an actor would be cleaner than using a full blown character sheet, and if players had ownership rights over it, then they could access storage lockers placed on a map without the GM needing to move inventory for them.

