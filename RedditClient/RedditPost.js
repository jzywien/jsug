enyo.kind({
	name: "RedditPost",
	kind: "enyo.Control",
	published: {
		thumb: "",
		title: "",
		score: "",
		url: ""
	},
	components: [
		{name:"item", fit: true, ontap: "postClick", style: "", classes: "reddit-post", components: [
			{tag:"img", name: "thumb", style: "float: left; width: 50px; height: 50px; margin-right: 10px"},
			{style: "float:left; overflow:hidden", components: [
				{name: "title", style: "margin-right: 25px;"},
				{tag: "a", name: "url", style: "font-size: 12px", attributes: {
					target: "_blank"
				}}
			]},
			{ name: "score", style: "display: inline-block; float:right;"}
		]}
	],

	create: function() {
		this.inherited(arguments);
	},

	thumbChanged: function() {
		this.$.thumb.setAttribute("src", this.thumb);
	},

	titleChanged: function() {
		this.$.title.setContent(this.title);
	},

	scoreChanged: function() {
		this.$.score.setContent(this.score);
	},

	urlChanged: function() {
		this.$.url.setAttribute("href", this.url);
		this.$.url.setContent(this.url);
	}
});