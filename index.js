var menu = document.querySelector('#navbar div');
    var sidebar = document.querySelector('#sidebar');
    sidebar.setAttribute('class', 'hidden');
    menu.addEventListener('click', function(){
        if (sidebar.className=="hidden"){
            sidebar.style.left = "0px";
            sidebar.style.zIndex = 3;
            sidebar.setAttribute('class', 'visible');
        }
        else {
            sidebar.style.left = "-240px";
            sidebar.setAttribute('class', 'hidden');
        }
    });
    window.addEventListener('resize', function(){
        if(this.window.innerWidth >= 927 && sidebar.className=="hidden"){
            // sidebar.style.display = "flex";
            sidebar.style.left = "0px";
            sidebar.style.zIndex = 3;
            sidebar.setAttribute('class', 'visible');
        }
        else if(this.window.innerWidth<=927){
            sidebar.style.left = "-240px";
            sidebar.setAttribute('class', 'hidden');
        }
    });