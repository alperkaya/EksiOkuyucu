define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar',
  'views/topic',
  'views/hot',
  'views/sukela',
  'views/conf'
], function ($, _, Backbone, SidebarView, TopicView,
             HotView, SukelaView, ConfView) {
  var AppRouter = Backbone.Router.extend ({
    routes: {
      '': 'defaultAction',
      't/:order/:topic': 'topic',
      'hot/:channel': 'hotchannel',
      'hot': 'hot',
      'sukela': 'sukela',
      'conf': 'conf'
    },
  });

  var initialize = function () {
    var router = new AppRouter;
    router.on ('route:defaultAction', function () {
    });
    router.on ('route:topic', function (order, topic) {
      var topicView = new TopicView ();
      topicView.render (order, topic);
    });
    router.on ('route:hot', function () {
      var hotView = new HotView ();
      hotView.render ();
    });
    router.on ('route:hotchannel', function (channel) {
      var hotView = new HotView ();
      hotView.render (channel);
    });
    router.on ('route:sukela', function () {
      var sukelaView = new SukelaView ();
      sukelaView.render ();
    });
    router.on ('route:conf', function () {
      var confView = new ConfView ();
      confView.render ();
    });
    Backbone.history.start ();
  };

  return {
    initialize: initialize
  };
});
