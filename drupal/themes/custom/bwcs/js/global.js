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
      $(".dropdown-menu").css("display", "none");
      // $('.dropdown-item > a').on('click', function() {
      //   self.location = $(this).attr('href');
      // });
    }
    $('.contextual-menu-item').each(function() {
      if ($(this).find('a.is-active').length === 0) {
        $(this).find('ul').css('display','none');
      } else {
        $(this).find('ul').css('display','block');
      }
    });
    initCamera();
  });

})(jQuery, Drupal);

// jQuery(window).on('resize', function() {
//   //console.log('resize '+jQuery(window).width());
//   if (jQuery(window).width() > 1182) {
//     jQuery(".dropdown-menu").css("display", "none");
//     jQuery('.navbar .dropdown > a').click(function() {
//       location.href = this.href;
//     });
//   } else {
//     console.log('else');
//     jQuery(".dropdown-menu").css("display", "");
//     jQuery('.navbar .dropdown').off('mouseover').off('mouseout');
//     jQuery('.navbar .dropdown > a').click(function(e) {
//       e.preventDefault();
//     });    
//   }
// });

function initMenu() {
    var menu = document.getElementById('block-mainnavigation');
    var $menu = jQuery(menu);
    var li = $menu.find('li');
  
    li.mouseenter(function() {
      if (jQuery(window).width() > 1182) {

        jQuery('.navbar .dropdown > a').removeAttr('data-bs-toggle');
        //jQuery('.navbar .dropdown > a').attr('data-bs-hover', 'dropdown');

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
      } else {
        // jQuery('.navbar .dropdown > a').click(function(e) {
        //   console.log('click');
        //   e.preventDefault();
        // }); 
        jQuery('.navbar .dropdown > a').removeAttr('data-bs-hover');
        jQuery('.navbar .dropdown > a').attr('data-bs-toggle', 'dropdown');
        jQuery(".dropdown-menu").css("display", "");
        jQuery('.navbar .dropdown').off('mouseover').off('mouseout');
      }
    });
  
    li.mouseleave(function() {
      if (jQuery(window).width() > 1182) {
        var childrenMenu = jQuery(this).find('ul:not(#dynamic-search-form-wraper):not(.contextual-links)');
        jQuery(this).removeClass('hovered');
        if (childrenMenu.length > 0) {
          childrenMenu.hide();
        }
      } else {
        jQuery('.navbar .dropdown').off('mouseover').off('mouseout'); 
      }
    });

};

// function searchForm() {
//   var menu    = document.getElementById('navigation');
//   var $menu   = jQuery(menu);
  
//   var formularz    = document.getElementById('search-block-form');
//   var $formularz   = jQuery(formularz);
//   var clonedForm   = $formularz.clone(true);
//   clonedForm.css('display', 'block');
  
//   var ulElement    = document.createElement('ul');
//       ulElement.id = 'dynamic-search-form-wraper';
//   var liElement    = document.createElement('li');
//   var $liElement   = jQuery(liElement);
  
//   $liElement.append(clonedForm);
  
//   ulElement.appendChild($liElement[0]);
  
//   var szukaj  = document.getElementById('edit-submit'); //$menu.find('a[title="szukaj"]');
//   var $szukaj = jQuery(szukaj);
//   var parentSzukaj = szukaj.parent();

//   parentSzukaj.append(ulElement);
  
//   $szukaj.click(function(e) {
//       e.preventDefault();
//       ulElement.classList.toggle('show-form');
//   });

// }


function initCamera() {
  if (jQuery('.slider').length) {
    jQuery('.slider').camera();
  }
}