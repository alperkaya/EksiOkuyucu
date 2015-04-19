
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/modal.html',
], function($, _, Backbone, ModalTemplate) {
  return {

    version: '',
    isExtension: true,
    urlPrefix: 'https://eksisozluk.com/',

    initialize: function(version) {
      this.version = version;

      if (document.domain.match(/(github\.io|eksi\.ninja)$/)) {
        this.isExtension = false;
        this.urlPrefix   = 'http://proxy.eksi.ninja/';
      }
    },

    modal: function(title, message) {

      $('#generic-modal').remove();
      $('body').append(_.template(ModalTemplate, { title: title,
                                                   message: message }));
      $('#generic-modal').modal('show');

    }

  };

});
