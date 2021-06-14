// DragTransfer
// (c) 2021 David Zvekic


"use strict";

import {registerSettings} from './settings/settings.js';

let dragTransfer= new Object();

Hooks.once('init',()=>{
	
    registerSettings();
	
  
});


Hooks.on('dropActorSheetData',(dragTarget,sheet,dragSource,user)=>{
 
  if(dragSource.type=="Item" && dragSource.actorId) {
	
	  
	if(!dragTarget.data._id) {
		console.warn("Drag'n'Transfer - target has no data._id?",dragTarget);
		return; 
	}
	if(dragTarget.data._id ==  dragSource.actorId) return;  // ignore dropping on self
      let sourceActor = game.actors.get(dragSource.actorId);
      if(sourceActor) {
	 	// if both source and target have the same type then allow deleting original item.
		// this is a safety check because some game systems may allow dropping on targets
		// that don't actually allow the GM or player to see the inventory, making the item
		// inaccessible.
				    
		
		  function checkCompatable(a,b){
			  console.info('DragNTransfer - Check Compatability: Dragging Item:"' + String(dragSource.data.type) + '" from sourceActor.data.type:"' +String(a) +'" to dragTarget.data.type:"'+String(b)+'".');
			  if(a==b) return true;
			  try {
				 
     			  const transferPairs = JSON.parse("{"+ game.settings.get('DragTransfer', 'actorTransferPairs') +"}");
				
	              if(transferPairs[a]==b) return true;
			      if(transferPairs[b]==a) return true;
				  
			  }
	          catch(err){
				  console.error('DragTransfer: ',err.message);
				  ui.notifications.error('DragTransfer: '+err.message);
	  	      }
   		      return false;
		  };
	
		if ( checkCompatable(sourceActor.data.type,dragTarget.data.type) ) {
			if(sourceActor.deleteEmbeddedDocuments!=undefined) {
			   sourceActor.deleteEmbeddedDocuments( "Item",[dragSource.data._id]);
		    } else 
			{
		       sourceActor.deleteOwnedItem( dragSource.data._id);
            }
	    }
	  }
    }
});
  

   



	  
