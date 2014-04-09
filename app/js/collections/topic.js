
define([
  'jquery',
  'underscore',
  'backbone',
  'models/entry'
], function ($, _, Backbone, EksiEntry) {

  var Topic = Backbone.Collection.extend ({

    // 0 ASC
    // 1 DESC
    // 2 TODAY_ASC
    // 3 SUKELA
    order: 2,

    title: '',
    external_url: '',

    page: -1,
    pageCount: -1,
  

    url: function  () {
      var url = 'https://eksisozluk.com/' + this.external_url;

      url += this.external_url.match (/\?/) ? '&' : '?';
      url += 'p=' + (this.page <= 0 ? 1 : this.page);

      if (this.order == 2) {
        url += '&a=popular';
      } else if (this.order == 3) {
        url += '&a=nice';
      }

      return url;
    },


    parse: function (resp) {

      var that = this;

      var entries = [];
      var htmlDoc = $.parseHTML (resp);

      this.title = $(htmlDoc).find ('#title a').text ();
      this.pageCount = $(htmlDoc).find ('div.pager').attr ('data-pagecount');

      this.external_url = $(htmlDoc).find ('#topic a')
                                    .attr ('href')
                                    .replace (/^\/*/, '');

      $(htmlDoc).find ('article').each (function () {
        var entry = new EksiEntry ({ htmlDoc: this });

        // add entry to end of array if order is desc
        if (that.order == 1) {
          entries.unshift (entry);
        } else {
          entries.push (entry);
        }
      });

      return entries;

    },


    firstPage: function () {

      if (this.order == 1) {
        this.page = this.pageCount;
      } else {
        this.page = 1;
      }

    },

    nextPage: function () {

      console.log ("CURRET PAGE: " + this.page);

      if (this.order == 1) {
        this.page--;
      } else {
        this.page++;
      }

      console.log ("NEXT PAGE IS: " + this.page);

    },

    lastPage: function () {

      // if pageCount is not defined, there's only one page
      // and it's our last page
      if (!this.pageCount)
        return true;

      if (this.order == 1) {
        return this.pageCount <= 1;
      } else {
        return this.page >= this.pageCount;
      }

    },


    fetch: function (options) {
      options = options || {};
      options.dataType = 'html';

      // if order is DESC, getting last page number
      // last page number is out first page in this collection
      if (this.order == 1 && this.page == -1) {
        var response = $.ajax ({
          type: 'GET',
          async: false,
          url: this.url ()
        }).responseText;
        var pageCount = $($.parseHTML (response)).find ('div.pager')
                                                 .attr ('data-pagecount');
        this.page = pageCount;
      }
      
      // if order is not DESC
      // first page is 1
      else if (this.page == -1) {
        this.page = 1;
      }

      return Backbone.Collection.prototype.fetch.call (this, options);
    }

  });


  return Topic;
});
