const twdm_options = [
    "pixels",
    "tiles",
    "fraction"
];

const twdm_dropdown = document.querySelector(".target_width_definition_method");
const result_display = document.querySelector(".result_display");
const precision = 5;

function twdm_changed() {
    twdm_options.forEach(element => {
        document.querySelector(`.twdm-${element}`)
            .style.setProperty("display",
                element == twdm_dropdown.value ? "block" : "none")
        
        let children = document.querySelector(`.twdm-${element}`).children;
        for (let i = 0; i < children.length; i++) {
            let child = children.item(i);
            if (child.nodeName == "INPUT") {
                child.value = 0;
            }
        }
    });
}

function getTextureScale(total_texture_width) {
    switch (twdm_dropdown.value) {
        case "pixels":
            let target_width = document.querySelector(".twdm-targetwidth-pixels").value;
            return target_width / total_texture_width;
        case "tiles":
            let full_tiles = document.querySelector(".twdm-fullwidth-tiles").value;
            let target_tiles = document.querySelector(".twdm-targetwidth-tiles").value;
            return target_tiles / full_tiles;
        case "fraction":
            return document.querySelector(".twdm-fraction-input").value;
    }
}

function calculateTextureScale(x, y, W, k) {
    /*
        Seeing as how texture scale is units/texel, it can be expressed
        as Sz = z / Pz, where z is the hypotenuse (in units) and Pz is the 
        amount of texels wide it is.

        Following Pythagoras' theorem, z = sqrt(x^2 + y^2) where x and y are
        the sides of the right triangle.

        If we take the width of the texture applied to the diagonal face
        as W texels with a fraction k of it visible, the visible part of
        the texture in texels Pz = Wk.

        Substituting variables into the topmost expression, we get
                            Sz = sqrt(x^2 + y^2)/Wk
    */
    return (
        Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        /
        (W * k)
    );
}

function calculate() {
    let x = document.querySelector(".triangle_x").value;
    let y = document.querySelector(".triangle_y").value;

    let W = document.querySelector(".full_texture_width").value;
    let k = getTextureScale(W);
    let hypot = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    result_display.innerHTML = `Texture scale: ${calculateTextureScale(x, y, W, k)}<br>
        <math><mi>z</mi><mo> = ${hypot.toFixed(precision)}</mo></math>units<br>
        <math><mi>sin</mi><mi>&alpha;</mi><mo>=</mo><mi>cos</mi><mi>&beta;</mi><mo> = ${(x / hypot).toFixed(precision)} </mo></math><br>
        <math><mi>cos</mi><mi>&alpha;</mi><mo>=</mo><mi>sin</mi><mi>&beta;</mi><mo> = ${(y / hypot).toFixed(precision)} </mo></math><br>
        <math><mo>&ang;</mo><mi>&alpha;</mi><mo> = ${(Math.asin(x / hypot) * (180 / Math.PI)).toFixed(precision)}&deg;</mo></math><br>
        <math><mo>&ang;</mo><mi>&beta;</mi><mo> = ${(Math.acos(x / hypot) * (180 / Math.PI)).toFixed(precision)}&deg;</mo></math><br>`;
}

twdm_changed()