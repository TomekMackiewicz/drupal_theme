/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.bwcs = {
    attach: function (context, settings) {

    }
  };

  $(document).ready(function() {
    $('body').addClass('loaded');
    initMenu();
    if ($(window).width() > 1182) {
      $(".dropdown-menu:not(#searchDropdown)").css("display", "none");
      $('.dropdown-item > a:not(#searchTrigger)').on('click', function() {
        self.location = $(this).attr('href');
      });
    }
    $('.contextual-menu-item').each(function() {
      if ($(this).find('a.is-active').length === 0) {
        $(this).find('ul').css('display','none');
      } else {
        $(this).find('ul').css('display','block');
      }
    });
    initCamera();
    $('.camera_caption > div').addClass('d-flex align-items-end flex-column col-12 col-xl-8 offset-xl-2');

    $('.mobile-menu').addClass('hide');
    $('.mobile-menu').hide();
    $('.mobile-link').on('click', function() {
      if ($(this).next().hasClass('hide')) {
        $(this).next().removeClass('hide');
        $(this).next().addClass('show');
        $(this).next().show(500);
      } else if ($(this).next().hasClass('show')) {
        $(this).next().removeClass('show');
        $(this).next().addClass('hide');
        $(this).next().hide(500);
      }
    });
  });
})(jQuery, Drupal);

function initMenu() {
  var menu = document.getElementById('block-mainnavigation');
  var $menu = jQuery(menu);
  var li = $menu.find('li');

  jQuery('.dropdown:not(#searchItem):not(#searchDropdownItem)').mouseenter(function() {
    if (jQuery(window).width() > 1182) {
      jQuery('.navbar .dropdown > a').removeAttr('data-bs-toggle');
      var childrenMenu = jQuery(this).children('ul:not(#dynamic-search-form-wraper):not(.contextual-links)');
      var flag = false;
      jQuery(this).addClass('hovered');
      var parent = this.parentElement.parentElement.tagName;

      if (parent == 'LI' || parent == 'li') {
        flag = true;
      }

      if (childrenMenu.length > 0 && !flag) {
        childrenMenu.show();
      } else if (childrenMenu.length > 0 && flag) {
        childrenMenu.show(0);
        var left_off = childrenMenu.offset().left;
        if (left_off + childrenMenu.width() >= jQuery(window).width()) {
          childrenMenu.css({
            'left' : '-100%',
            'top' : '0px',
            'border-left-color' : '#ffffff',
            'border-left-width' : '1px',
            'border-left-style' : 'solid'
          });
        } else {
          childrenMenu.css({
            'left' : '100%',
            'top' : '0px',
            'border-left-color' : '#ffffff',
            'border-left-width' : '1px',
            'border-left-style' : 'solid'
          });                 
        }
      }
    }
  });

  jQuery('.dropdown:not(#searchItem):not(#searchDropdownItem)').mouseleave(function() {
    if (jQuery(window).width() > 1182) {
      var childrenMenu = jQuery(this).find('ul:not(#dynamic-search-form-wraper):not(.contextual-links)');
      jQuery(this).removeClass('hovered');
      if (childrenMenu.length > 0) {
        childrenMenu.hide();
      }
    }
  });
};

function initCamera() {
  if (jQuery('.slider').length) {
    jQuery('.slider').camera({
      alignment: 'bottomCenter'
    });
  }
}