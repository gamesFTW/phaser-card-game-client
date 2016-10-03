import _ from 'lodash';


import Backend from 'Backend';


global.PIXI = require('pixi');
global.p2 = require('p2');


var Phaser = require('phaser');


/**
 * Create, set up, and contain instance of Phaser.Game. Singleton.
 */
class PhaserWrapper {
    set createFinished(value) { this._createFinished = value; }
    get game() { return this._game; }


    constructor() {
        this._game = new Phaser.Game(
            1680, 920, Phaser.AUTO, 'gameView', null, false, true
        );

        // Объект из Phaser.Group, где ключ название группы. @see this._createGroups
        this._groups = {};

        this._game.state.add('Boot', {
            preload: this._preload.bind(this),
            create: this._create.bind(this),
            update: this._update.bind(this),
            render: this._render.bind(this)
        });

        this._game.state.start('Boot');
    }

    loadImage(id, url) {
        this._game.load.image(id, url);
    }

    /**
     *
     * @param {String} name
     * @param {Phaser.Sprite} sprite
     * @link _createGroups
     * @link refreshGroupSorting
     */
    addToGroup(name, sprite) {
        if (this._groups[name]) {
            this._groups[name].add(sprite);
        } else {
            console.warn('Группы с названием "%s" не существует', name);
        }
    }


    refreshAllGroupSorting() {

        this.refreshCardsSorting();
        this.refreshCreaturesSorting();
        this.refreshAreasSorting();
    }

    refreshCardsSorting() {
        this._sortGroupZByHoverAndX('cards');
        this._sortGroupZByHoverAndX('cardsList');
    }

    refreshCreaturesSorting() {
        this._sortGroupZByY('creatures');
    }

    refreshAreasSorting() {
        this._sortGroupZByY('areas');
    }

    _sortGroupZByHoverAndX(name) {
        this._groups[name].customSort(function(a, b) {
            var result;
            var hoverA = a.highlight;
            var hoverB = b.highlight;
            if (hoverA) {
                result = 1;
            } else if (hoverB) {
                result = -1;
            } else {
                if (a.x > b.x) {
                    result = 1;
                } else if (a.x < b.x) {
                    result = -1;
                } else {
                    if (a.y > b.y) {
                        result = 1;
                    } else if(a.y < b.y) {
                        result = -1;
                    } else {
                        result = 0;
                    }
                }
            }
            return result;
        })
    }


    _sortGroupZByY(name) {
        this._groups[name].sort('y', Phaser.Group.SORT_ASCENDING)
    }


    _preload() {
        this._game.load.image('isometric-tile', '/assets/isometric-tile.png');

        this._game.load.image('counter', '/assets/counter.png');

        this._game.load.image('lines', '/assets/bg/lines.png');


        //this._game.load.atlas('field_bg', '/assets/bg/field.jpg', null, getFieldBgAtlasData(24, 24));

        Backend.getCardImages().forEach(i => this.loadImage(i._id, i.url));

        
        // Card view
        this._game.load.image('card_bg', '/assets/card1.png');
        this._game.load.image('card_bg_facedown', '/assets/card2.png');
        this._game.load.image('card_bg_big', '/assets/card3.png');

        // Buttons
        this._game.load.image('button_eot', '/assets/button_eot.png');
    }


    _create() {
        this._createGroups();
        this._createFinished();
    }


    _update() {
       this.refreshAllGroupSorting();
    }


    _render() {

    }


    /*
     Создает объект из Phaser.Group, где ключ название группы
     */
    _createGroups() {
        let groupNames = [
            'tiles',
            'areas',
            'creatures',
            'cards',
            'cardsList', // просмотр стека(дека или грейвард)
            'fullCards' // зазумленные карты
        ];

        this._groups = _.reduce(groupNames, function (obj, name) {
            obj[name] = this._game.add.group(undefined, name);
            return obj;
        }.bind(this), {});
    }
}


//function getFieldBgAtlasData(w, h) {
//    var FieldObjectView = require('FieldObjectView');
//
//    var frames = [];
//    var size = FieldObjectView.SIZE;
//    _.range(w).forEach(function(x) {
//        _.range(h).forEach(function(y) {
//            frames.push({
//                "filename": 's' + x + '_' + y,
//                "frame": {"x": x*size, "y": y*size ,"w":size,"h":size},
//                "rotated": false,
//                "trimmed": false,
//                "spriteSourceSize": {"x":0, "y":0, "w":size, "h":size},
//                "sourceSize": {"w": size,"h":size}
//            });
//        });
//    });
//
//    return JSON.stringify({
//        frames: frames
//    });
//}

// Всегда отдает один инстанс
export default new PhaserWrapper();
