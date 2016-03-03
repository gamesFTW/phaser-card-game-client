var OutlineFilter = function (viewWidth, viewHeight, thickness, color) {
    PIXI.AbstractFilter.call(this);

    this.uniforms = {
        thickness: {type: '1f', value: thickness},
        outlineColor: {type: '4f', value: null},
        pixelWidth: {type: '1f', value: null},
        pixelHeight: {type: '1f', value: null}
    };

    this.color = color;
    this.viewWidth = viewWidth;
    this.viewHeight = viewHeight;
    this.passes = [this];

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'uniform sampler2D texture;',
        'uniform float thickness;',
        'uniform vec4 outlineColor;',
        'uniform float pixelWidth;',
        'uniform float pixelHeight;',
        'vec2 px = vec2(pixelWidth, pixelHeight);',
        'void main(void) {',
        '    const float PI = 3.14159265358979323846264;',
        '    vec4 ownColor = texture2D(texture, vTextureCoord);',
        '    vec4 curColor;',
        '    float maxAlpha = 0.;',
        '    for (float angle = 0.; angle < PI * 2.; angle += ' + (1 / thickness).toFixed(7) + ') {',
        '        curColor = texture2D(texture, vec2(vTextureCoord.x + thickness * px.x * cos(angle), vTextureCoord.y + thickness * px.y * sin(angle)));',
        '        maxAlpha = max(maxAlpha, curColor.a);',
        '    }',
        '    float resultAlpha = max(maxAlpha, ownColor.a);',
        '    gl_FragColor = vec4((ownColor.rgb + outlineColor.rgb * (1. - ownColor.a)) * resultAlpha, resultAlpha);',
        '}'
    ];
};

OutlineFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
OutlineFilter.prototype.constructor = OutlineFilter;


Object.defineProperty(OutlineFilter.prototype, 'color', {
    set: function(value) {
        var r = ((value & 0xFF0000) >> 16) / 255,
            g = ((value & 0x00FF00) >> 8) / 255,
            b = (value & 0x0000FF) / 255;
        this.uniforms.outlineColor.value = {x: r, y: g, z: b, w: 1};
        this.dirty = true;
    }
});

Object.defineProperty(OutlineFilter.prototype, 'viewWidth', {
    set: function(value) {
        this.uniforms.pixelWidth.value = 1 / value;
        this.dirty = true;
    }
});

Object.defineProperty(OutlineFilter.prototype, 'viewHeight', {
    set: function(value) {
        this.uniforms.pixelHeight.value = 1 / value;
        this.dirty = true;
    }
});


export default {
    OutlineFilter: OutlineFilter
}