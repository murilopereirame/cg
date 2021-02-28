const calc = () => {
    let R = $("#R").val();
    let G = $("#G").val();
    let B = $("#B").val();

    let result = rgb2hsi(R, G, B);

    $("#H").val(result.H);
    $("#S").val(result.S);
    $("#I").val(result.I);
}

$("#calc").click((e) => {
    calc();
})

const rgb2hsi = (R, G, B) => {
    R /= 255, G /= 255, B /= 255;

    let max = Math.max(R, G, B);
    let min = Math.min(R, G, B);
    let H, S, I = (max + min) / 2;

    if (max == min) {
        H = S = 0;

        if(max == 1)
            H = .665;
    } else {
        let d = max - min;
        S = I > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case R: 
                H = (G - B) / d + (G < B ? 6 : 0); 
            break;
            case G: 
                H = (B - R) / d + 2; 
            break;
            case 
                B: H = (R - G) / d + 4; 
            break;
        }

        H /= 6;
    }

    return {
        H: Math.round(H * 240.0),
        S: Math.round(S * 240.0),
        I: Math.round(I * 240.0),
    }
}