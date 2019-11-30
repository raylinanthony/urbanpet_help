/**
@author Raylin Aquino <info@raylinaquino.com>
@website raylinaquino.com
@date Nov 29, 2019
**/


/* Chatbox **/
;
(function($) {

    $(function() {


        var cls = 'active', _clsShow = 'show',
        _bubbles = '.chatbox .bubbles a',
        _chatIcon = '.chatbox .wrap-icon i',
        _table = '.chatbox .c-sect .aside-content table',
        _chatSelect = '.chatbox .c-sect .aside-content select',
        breedSizesJSON = 'data/breedSizes.json';

        const sizesMatch = {
            leash: 'Correa',
            collar: 'Collar',
            leash_ruff: 'Ruff Leash',
            stepin: 'Arnés',
            meshplus: 'Mesh Plus',
        };

        /** Put info on table **/
        const putTable = data => {

            var tr = '';

            Object.entries(JSON.parse(data)).map((val, key) => {

                tr += `
                <tr>
                    <td class="name">${sizesMatch[val[0]]}</td>
                    <td class="size">${val[1][1]}</td>
                </tr>
                `;
            });

            return tr;
        }    

        /** Set breed on select */
        const setBreeds = () => {

            var breed_list = '';

            const prom = fetch(breedSizesJSON)
            .then(data => data.json())
            .then(breeds => {

                return new Promise((resolve, reject) => {
                    var c = 0;
                    Object.entries(breeds).map(val => {

                        const sizes = {
                            leash: val[1].leash,
                            collar: val[1].collar,
                            leash_ruff: val[1].leash_ruff,
                            stepin: val[1].stepin,
                            meshplus: val[1].meshplus,
                        };


                        if(c == 0){
                            $(_chatIcon).attr('class', 'icon_'+val[1].fullName);
                            $(_table).html(putTable(JSON.stringify(sizes))); 
                        }

                        breed_list += `
                        <option value="${val[0]}" data-ref="${val[0]}" data-sizes='${JSON.stringify(sizes)}' data-icon="icon_${val[1].fullName}">${val[0]}</option> 
                        `;
                        c++;
                    });

                    $(_chatSelect).html(breed_list);

                    resolve();

                    }); //end promise


            }).catch(console.log);

            return Promise.all([prom]);

        }

        setBreeds();

        $(_bubbles).on('click', function() {

            var _id = $(this).attr('href');

            if ($(this).hasClass('no-click')) return true;

            $('.c-sect').removeClass(cls);
            $(_id).addClass(cls);
            $(_bubbles).removeClass(cls);
            $(this).addClass(cls);


            return false;
        });


        $('.chatbox .btn-help').on('click', function(){
            
            $(this).toggleClass(cls);

            $(_bubbles).each(function(i, e){
                
                var _this = $(this);
         
               
                 _this.css('transitionDelay','.'+i+'s').toggleClass(_clsShow);
                
            
            });
            return false;
        })

        $(document).on('change',_chatSelect, function(){

            var currentValue = $(_chatSelect+' :selected'),
            sizes = currentValue.attr('data-sizes'),
            icon = currentValue.attr('data-icon'),
            tr = '';


            $(_table).html(putTable(sizes));
            $(_chatIcon).attr('class',icon);

        });

    });
})(jQuery);