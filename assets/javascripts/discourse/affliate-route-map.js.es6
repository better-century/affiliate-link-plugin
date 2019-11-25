export default function () {
	this.route("signup", { path: "/signup" },function() {
		this.route("affliateGroup", { path: "/:affliateGroup" });
	});
}