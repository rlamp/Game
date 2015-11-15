var blocker = document.getElementById( 'blocker' );
var menu = document.getElementById("menu");

// http://www.html5rocks.com/en/tutorials/pointerlock/intro/

var controlsEnabled = false;
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if ( havePointerLock ) {

    var element = document.body;

    var pointerlockchange = function ( event ) {

        if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

            controlsEnabled = true;
            controls.enabled = true;

            blocker.style.display = 'none';
            document.getElementById('hud').style.display = '';

        } else {

            controlsEnabled = false;
            controls.enabled = false;

            blocker.style.display = '-webkit-box';
            blocker.style.display = '-moz-box';
            blocker.style.display = 'box';

            document.getElementById('hud').style.display = 'none';

            if(gameover) {
                document.getElementById('gameover').style.display = '';
                document.getElementById('reload').addEventListener('click', function() {window.location.reload(false);}, false)
            }
            else {
                menu.style.display = '';
            }

        }

    };

    var pointerlockerror = function ( event ) {

        menu.style.display = '';

    };

    // Hook pointer lock state change events
    document.addEventListener( 'pointerlockchange', pointerlockchange, false );
    document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
    document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

    document.addEventListener( 'pointerlockerror', pointerlockerror, false );
    document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
    document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

    document.getElementById("instructions").addEventListener("click", function() {
        var div = document.getElementById("instructionsText");
        div.style.display = div.style.display == "none" ? "block" : "none";
    });

    document.getElementById("about").addEventListener("click", function() {
        var div = document.getElementById("aboutText");
        div.style.display = div.style.display == "none" ? "block" : "none";
    });


    document.getElementById("play").addEventListener( 'click', function ( event ) {

        menu.style.display = 'none';

        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

        if ( /Firefox/i.test( navigator.userAgent ) ) {

            var fullscreenchange = function ( event ) {

                if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

                    document.removeEventListener( 'fullscreenchange', fullscreenchange );
                    document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

                    element.requestPointerLock();
                }

            };

            document.addEventListener( 'fullscreenchange', fullscreenchange, false );
            document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

            element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

            element.requestFullscreen();

        } else {

            element.requestPointerLock();

        }

    }, false );

} else {

    menu.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

}