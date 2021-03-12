// DragTransfer
// (c) 2021 David Zvekic
// permission granted to use and distribute as per LICENSE file

Hooks.on('dropActorSheetData',(actor,sheet,source,user)=>{
 
  if(source.type=="Item" && source.actorId) {
	if(!actor.data._id) {
		console.warn('target actor has no ID?',actor);
		return; //if target actor doesn't seem to have an id, then simply bail 
	}
	if(actor.data._id ==  source.actorId) return;  // if dropping item back onto the same actor, just bail out.
      let sourceActor = game.actors.get(source.actorId);
    if(sourceActor) sourceActor.deleteOwnedItem( source.data._id);
    }
});
  

   



	  
