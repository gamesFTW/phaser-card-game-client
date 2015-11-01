import _ from 'lodash';

global.PIXI = require('pixi.js');
global.p2 = require('p2');

var Phaser = require('phaser');

import FiledObjectsViewEvent from 'field/FiledObjectsViewEvent';


/**
 * Create, set up, and contain instance of Phaser.Game. Singleton.
 */
class PhaserWrapper {
    set createFinished(value) { this._createFinished = value; }
    get game() { return this._game; }


    constructor() {
        this._game = new Phaser.Game(
            1200, 800, Phaser.AUTO, 'gameView', null, false, false
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


    /**
     *
     * @param {String} name
     * @param {Phaser.Sprite} sprite
     * @param {BaseFieldObjectView} [view]
     * @link _createGroups
     * @link refreshGroupSorting
     */
    addToGroup(name, sprite, view) {
        if (this._groups[name]) {
            this._groups[name].add(sprite);
            this.refreshGroupSorting(name);

            // TODO подумать как еще сделать можно, кажется проеб в архитектуре
            // Подписываемся на события перевежения
            view && view.on(FiledObjectsViewEvent.MOVED, this.refreshGroupSorting.bind(this, name));
        } else {
            console.warn('Группы с названием "%s" не существует', name);
        }
    }

    /**
     * @param {String} name
     * @link _sortGroupZByY
     */
    refreshGroupSorting(name) {
        console.info('Обновляем сортировку группы ', name);
        this._sortGroupZByY(name);
    }

    _sortGroupZByY(name) {
        this._groups[name].sort('y', Phaser.Group.SORT_ASCENDING)
    }


    _preload() {
        this._game.load.image('tile', '../assets/tile.png');
        this._game.load.image('orc', '../assets/orc.png');
    }


    _create() {
        this._createGroups();
        this._createFinished();
    }


    _update() {

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
            'cards'
        ];

        this._groups = _.reduce(groupNames, function (obj, name) {
            obj[name] = this._game.add.group(undefined, name);
            return obj;
        }.bind(this), {});
    }
}


// Всегда отдает один инстанс
export default new PhaserWrapper();
