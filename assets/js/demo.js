//
// Demo
// Demo code to toggle layout options
//

'use strict';

var Demo = (function() {

  //
  // Variables
  //

  // Selectors
  var form = document.querySelector('#switchColor');
  var topnav = document.querySelector('#topnav');
  var topbar = document.querySelector('#topbar');
  var sidebar = document.querySelector('#sidebar');
  var sidebarUser = document.querySelector('#sidebarUser');
  var containers = document.querySelectorAll('[class^="container"]');
  var stylesheets = document.querySelectorAll('#stylesheetLight, #stylesheetDark');
  var stylesheetLight = document.querySelector('#stylesheetLight');
  var stylesheetDark = document.querySelector('#stylesheetDark');

  // Config
  var config = {
    colorScheme: ( localStorage.getItem('dashkitColorScheme') ) ? localStorage.getItem('dashkitColorScheme') : 'light',
    navPosition: ( localStorage.getItem('dashkitNavPosition') ) ? localStorage.getItem('dashkitNavPosition') : 'sidenav',
    sidebarColor: ( localStorage.getItem('dashkitSidebarColor') ) ? localStorage.getItem('dashkitSidebarColor') : 'default',
  }


  //
  // Methods
  //

  function parseUrl() {
    var search = window.location.search.substring(1);
    var params = search.split('&');

    for ( var i = 0; i < params.length; i++ ) {
      var arr = params[i].split('=');
      var prop = arr[0];
      var val = arr[1];

      if ( prop == 'colorScheme' || prop == 'navPosition' || prop == 'sidebarColor' ) {

        // Save to localStorage
        localStorage.setItem('dashkit' + prop.charAt(0).toUpperCase() + prop.slice(1), val);

        // Update local variables
        config[prop] = val;
      }
    }
  }

  function toggleColorScheme(colorScheme) {
    if ( colorScheme == 'light' ) {
      stylesheetLight.disabled = false;
      stylesheetDark.disabled = true;
    } else if ( colorScheme == 'dark' ) {
      stylesheetLight.disabled = true;
      stylesheetDark.disabled = false;
    }
  }

  function toggleNavPosition(navPosition) {
    if ( topnav && topbar && sidebar && sidebarUser) {
      if ( navPosition == 'topnav' ) {
        hideNode(topbar);
        hideNode(sidebar);

        for (var i = 0; i < containers.length; i++) {
          containers[i].classList.remove('container-fluid');
          containers[i].classList.add('container');
        }
      } else if ( navPosition == 'combo' ) {
        hideNode(topnav);
        hideNode(sidebarUser);

        for (var i = 0; i < containers.length; i++) {
          containers[i].classList.remove('container');
          containers[i].classList.add('container-fluid');
        }
      } else if ( navPosition == 'sidenav') {
        hideNode(topnav);
        hideNode(topbar);

        for (var i = 0; i < containers.length; i++) {
          containers[i].classList.remove('container');
          containers[i].classList.add('container-fluid');
        }
      }
    }

    function hideNode(node) {
      node.setAttribute('style', 'display: none !important');
    }
  }

  function toggleSidebarColor(sidebarColor) {
    if (sidebar) {
      if ( sidebarColor == 'default' ) {
        sidebar.classList.remove('navbar-dark', 'bg-vibrant');
        sidebar.classList.add('navbar-light');
      } else if ( sidebarColor == 'vibrant' ) {
        sidebar.classList.remove('navbar-light');
        sidebar.classList.add('navbar-dark', 'bg-vibrant');
      }
    }
  }

  function toggleFormControls(form, colorScheme, navPosition, sidebarColor) {
    $(form).find('[name="colorScheme"][value="' + colorScheme + '"]').closest('.btn').button('toggle');
    $(form).find('[name="navPosition"][value="' + navPosition + '"]').closest('.btn').button('toggle');
    $(form).find('[name="sidebarColor"][value="' + sidebarColor + '"]').closest('.btn').button('toggle');
  }

  function submitForm(form) {
    var colorScheme = form.querySelector('[name="colorScheme"]:checked').value;
    var navPosition = form.querySelector('[name="navPosition"]:checked').value;
    var sidebarColor = form.querySelector('[name="sidebarColor"]:checked').value;

    // Save data to localStorage
    localStorage.setItem('dashkitColorScheme', colorScheme);
    localStorage.setItem('dashkitNavPosition', navPosition);
    localStorage.setItem('dashkitSidebarColor', sidebarColor);

    // Reload page
    window.location = window.location.pathname;
  }


  //
  // Event
  //

  // Parse url
  parseUrl();

  // Toggle color scheme
  toggleColorScheme(config.colorScheme);

  // Toggle nav position
  toggleNavPosition(config.navPosition);

  // Toggle sidebar color
  toggleSidebarColor(config.sidebarColor);

  // Toggle form controls
  toggleFormControls(form, config.colorScheme, config.navPosition, config.sidebarColor);

  // Enable body
  document.body.style.display = 'block';


})();
