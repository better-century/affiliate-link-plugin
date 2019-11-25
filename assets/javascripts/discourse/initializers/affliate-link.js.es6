import { withPluginApi } from "discourse/lib/plugin-api";
import { ajax } from "discourse/lib/ajax";
import DiscourseURL from "discourse/lib/url";
import { userPath } from "discourse/lib/url";
function affliateInit(api) {
	api.modifyClassStatic('model:user', {
		createAccount(attrs) {
			if(window.affliateGroup == undefined){
				return this._super(attrs);
			}else{
				return ajax(userPath(), {
					data: {
						name: attrs.accountName,
						email: attrs.accountEmail,
						password: attrs.accountPassword,
						username: attrs.accountUsername,
						password_confirmation: attrs.accountPasswordConfirm,
						challenge: attrs.accountChallenge,
						user_fields: attrs.userFields,
						afflaiteGroup: window.affliateGroup
					}, 
					type: "POST"
				});
			}
		}
	});
	api.modifyClass('route:signup', {
		beforeModel(transition){
			this._super();
			var signUpUrl = transition.intent.url
			if(signUpUrl.indexOf('/signup/')!= -1 && signUpUrl.indexOf('/signup/?')== -1){
				var affliateGroup = signUpUrl.substring(signUpUrl.indexOf('/signup/')+'/signup/'.length,signUpUrl.length);
				if(affliateGroup.length>0){
					window.affliateGroup  = affliateGroup;
				}
			}
		}
	});
}
export default {
	name: "affliate-link.js",
	initialize() {
		withPluginApi("0.1", affliateInit);
	}
};