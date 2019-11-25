# name: russell-affiliate-link
# about: Affiliate Links
# version: 1.0
after_initialize do
  UsersController.class_eval do
    alias_method :old_create, :create
    def create
      returnData = old_create
      affliateGroup =  params[:afflaiteGroup]
      unless affliateGroup.nil?
        status = JSON.parse(returnData)
        if(status['success'])
          group = Group.find_by(name:affliateGroup)
          newUser = User.find(status['user_id'])
          unless group.nil?
            group.add(newUser)
          end
        end
      end
      return returnData
    end
  end
  Discourse::Application.routes.append do
    get "signup/:affliateGroup" => "static#show", id: "signup"
  end
end