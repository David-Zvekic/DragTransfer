// DragTransfer
// (c) 2021 David Zvekic

Hooks.on('dropActorSheetData',(target,sheet,dragSource,user)=>{
 
  if(dragSource.type=="Item" && dragSource.actorId) {
	if(!target.data._id) {
		console.warn("Drag'n'Trasfer - target has no data._id?",target);
		return; 
	}
	if(target.data._id ==  dragSource.actorId) return;  // ignore dropping on self
      let sourceActor = game.actors.get(dragSource.actorId);
      if(sourceActor) {
	 	// if both source and target have the same type then allow deleting original item.
		// this is a safety check because some game systems may allow dropping on targets
		// that don't actually allow the GM or player to see the inventory, making the item
		// inaccessible.
		if (sourceActor.data.type==target.data.type) 
	      sourceActor.deleteOwnedItem( dragSource.data._id);
	  }
    }
});
  

   



	  
