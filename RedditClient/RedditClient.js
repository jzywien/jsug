enyo.kind({
	name: "RedditClient",
	kind: "FittableRows",
	fit: true,
	published: {
		posts: []
	},
	components: [
		{kind: "onyx.Toolbar", components: [
			{content: "Reddit Client :: "},
			{ content: "Limit"},
			{kind: "onyx.Input", name: "limit", value: 10, onchange: "fetch", style: "padding: 5px;font-size:14px;"}
		]},
		{kind: "enyo.List", fit: true, name: "postList", touch: true, onSetupItem: "setupItem", components: [
			{kind: "RedditPost", fit: true, name: "post"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.fetch();
	},

	setupItem: function(sender, event) {
		var post = this.posts[event.index];
		var item = this.$.post;

		item.setThumb(post.thumbnail);
		item.setTitle(post.title);
		item.setScore(post.score);
		item.setUrl(post.url);
	},

	postsChanged: function() {
		this.$.postList.setCount(this.posts.length);
		this.$.postList.reset();
	},

	processFetch: function(request, response) {
		if(!response) return;
		this.setPosts(_.pluck(response.data.children, "data"));
	},



	fetch: function() {
		var request = new enyo.JsonpRequest({
			url: "http://www.reddit.com/r/pics/.json",
			callbackName: "jsonp"
		});

		request.response(enyo.bind(this, "processFetch"));
		request.go({limit: this.$.limit.getValue()});
	}
});