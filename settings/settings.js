
export function registerSettings() {
    const moduleName = 'DragTransfer';
	const MODNAME = 'DRAGTANSFER';
	
    game.settings.register(moduleName, 'actorTransferPairs', {
      name: game.i18n.localize(MODNAME+".actorTransferPairs"),
      hint: game.i18n.localize(MODNAME+".actorTransferPairsHint"),
      scope: 'world',   
      config: true,      
      type: String,     
      default: "",
      onChange: value => { 
		        try {
		              JSON.parse("{"+value +"}"); 
                }
                catch(err){
					ui.notifications.error(err.message);
					throw err;
				} 
    }
    });
   
	 
};
