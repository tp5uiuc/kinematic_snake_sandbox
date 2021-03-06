/* Copyright 2021
         Tejaswin Parthasarathy and GazzolaLab, see LICENSE
*/

// src='//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML'>

// for typesetting mathjax
// let math_promise = Promise.resolve(); // Used to hold chain of typesetting
// calls

/* Mock */
class Simulator {
    constructor() {
        this.times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }

    com(index) {
        return [Math.cos(this.times[index]), Math.sin(this.times[index])];
    }

    call(index) {
        return [
            [this.com(index)[0] + 0.1, this.com(index)[0] + 0.2],
            [this.com(index)[1] + 0.3, this.com(index)[0] + 0.4]
        ];
    }
    time(index) {
        return this.times[index];
    }
}

/* Utilities */
/**
 * @param value
 * @param precision
 */
function round(value, precision = 1) {
    const multiplier = Math.pow(10, precision || 0);

    return (Math.round(value * multiplier) / multiplier).toFixed(precision);
}

/**
 * @param slider_value
 */
function transform(slider_value) {

    // range from 1--100, so we multiply by 0.1 to get the actual value
    return parseInt(slider_value) == 0 ? 0.1 : (parseFloat(slider_value)) * 0.1;
}

/**
 * @param value
 */
function inverse_transform(value) {
    return parseInt(value * 10);
}

/**
 * @param start
 * @param stop
 * @param num
 * @param endpoint
 */
function linspace(start, stop, num, endpoint = true) {
    const div = endpoint ? (num - 1) : num;
    const step = (stop - start) / div;

    return Array.from({ length: num }, (_, i) => start + step * i);
}

// function typeset(code) {
//   MathJax.startup.promise =
//       MathJax.startup.promise.then(() => MathJax.typesetPromise(code()))
//           .catch((err) => console.log('Typeset failed: ' + err.message));
//   return MathJax.startup.promise;
// }

/* Default params */

class DefaultStraightSlitheringParameters {
    static defaultFroudeNumber() {
        return inverse_transform(0.1);
    }
    static defaultLateralFriction() {
        return inverse_transform(2.0);
    }
    static defaultSinAmplitude() {
        return inverse_transform(7.0);
    }
    static defaultSinWaveNumber() {
        return 1;
    }
    static defaultLiftSinWaveAmplitude() {
        return 0.0;
    }
    static defaultLiftSinWaveNumber() {
        return DefaultStraightSlitheringParameters.defaultSinWaveNumber();
    }
    static defaultLiftSinPhase() {
        return 0;
    }
    static defaultLiftExpCoeff() {
        return inverse_transform(0.0);
    }
}
class DefaultTurningSlitheringParameters {
    static defaultFroudeNumber() {
        return inverse_transform(0.1);
    }
    static defaultLateralFriction() {
        return inverse_transform(2.0);
    }
    static defaultSinAmplitude() {
        return inverse_transform(7.0);
    }
    static defaultSinWaveNumber() {
        return 1;
    }
    static defaultLiftSinWaveAmplitude() {
        return parseInt(0.2 * 100);
    }
    static defaultLiftSinWaveNumber() {
        return DefaultTurningSlitheringParameters.defaultSinWaveNumber();
    }
    static defaultLiftSinPhase() {
        return 0;
    }
    static defaultLiftExpCoeff() {
        return inverse_transform(0.0);
    }
}
class DefaultSpinningParameters {
    static defaultFroudeNumber() {
        return inverse_transform(0.1);
    }
    static defaultLateralFriction() {
        return inverse_transform(2.0);
    }
    static defaultSinAmplitude() {
        return inverse_transform(7.0);
    }
    static defaultSinWaveNumber() {
        return 1;
    }
    static defaultLiftSinWaveAmplitude() {
        return parseInt(1.0 * 100);
    }
    static defaultLiftSinWaveNumber() {
        return DefaultSpinningParameters.defaultSinWaveNumber();
    }
    static defaultLiftSinPhase() {
        return 0;
    }
    static defaultLiftExpCoeff() {
        return inverse_transform(0.0);
    }
}
class DefaultTurningSidewindingParameters {
    static defaultFroudeNumber() {
        return inverse_transform(0.1);
    }
    static defaultLateralFriction() {
        return inverse_transform(2.0);
    }
    static defaultSinAmplitude() {
        return inverse_transform(7.0);
    }
    static defaultSinWaveNumber() {
        return 1;
    }
    static defaultLiftSinWaveAmplitude() {
        return parseInt(1.0 * 100);
    }
    static defaultLiftSinWaveNumber() {
        return DefaultTurningSidewindingParameters.defaultSinWaveNumber();
    }
    static defaultLiftSinPhase() {
        return parseInt(0.2 * 100);
    }
    static defaultLiftExpCoeff() {
        return inverse_transform(0.0);
    }
}
class DefaultStraightSidewindingParameters {
    static defaultFroudeNumber() {
        return inverse_transform(0.1);
    }
    static defaultLateralFriction() {
        return inverse_transform(1.0);
    }
    static defaultSinAmplitude() {
        return inverse_transform(7.0);
    }
    static defaultSinWaveNumber() {
        return 1;
    }
    static defaultLiftSinWaveAmplitude() {
        return parseInt(0.7 * 100);
    }
    static defaultLiftSinWaveNumber() {
        return DefaultStraightSidewindingParameters.defaultSinWaveNumber();
    }
    static defaultLiftSinPhase() {
        return parseInt(0.25 * 100);
    }
    static defaultLiftExpCoeff() {
        return inverse_transform(0.1);
    }

    // defaultFroudeNumber() { return inverse_transform(0.1); }
    // defaultLateralFriction() { return inverse_transform(1.0); }
    // defaultSinAmplitude() { return inverse_transform(7.0); }
    // defaultSinWaveNumber() { return 1; }
    // defaultLiftSinWaveAmplitude() { return parseInt(0.7 * 100); }
    // defaultLiftSinWaveNumber() { return this.defaultSinWaveNumber(); }
    // defaultLiftSinPhase() { return parseInt(0.25 * 100); }
    // defaultLiftExpCoeff() { return inverse_transform(0.1); }
}

/* Display of curvature */
/**
 *
 */
function typesetCurvature() {
    switch (curvatureSelection.value) {

        // case "none":
        //     return "";
        case "sin":
            return "\\epsilon \\cos\\left( 2\\pi k (s + t)\\right)";
        default:
            return "";

    // case 'test':
    //   return '\\alpha = 2';
    }
}

/**
 *
 */
function getCurvatureParams() {
    switch (curvatureSelection.value) {

        // case "none":
        //     return new Map();
        case "sin":
            return new Map([
                ["epsilon", parseFloat(sinAmplitude())],
                ["wave_number", parseFloat(sinWaveNumber())]
            ]);
        default:
            return new Map();

    // case 'test':
    //   return new Map();
    }
}

/**
 *
 */
function getCurvatureMethodName() {
    switch (curvatureSelection.value) {
        case "sin":
            return "sin";
        default:
            return "";
    }
}

const curvatureParamIDs = ["noneParams", "sinParams", "testParams"];

/**
 *
 */
async function hideCurvatureParams() {
    curvatureParamIDs.forEach(
        elementID => {
            document.getElementById(elementID).className = "hide";
        }
    );
}

/**
 *
 */
async function showCurvatureActivation() {

    // Mathjax3
    // await typeset(() => {
    //   // console.log(typeset_curvature());
    //   curvatureActivationReadout.innerHTML = typesetCurvature();
    //   return [ curvatureActivationReadout ];
    // });

    const math = MathJax.Hub.getAllJax(curvatureActivationReadout)[0];

    // MathJax.Hub.Queue([ "Typeset", MathJax.Hub, math ]);
    MathJax.Hub.Queue(["Text", math, typesetCurvature()]);

    // MathJax.Hub.Queue([ "Typeset", MathJax.Hub, curvatureActivationReadout
    // ]); curvatureActivationReadout.innerHTML = typeset_curvature();
}

/**
 *
 */
async function showCurvatureParameters() {
    hideCurvatureParams();
    const elementID = (() => {
        switch (curvatureSelection.value) {
            case "none":
                return curvatureParamIDs[0];
            case "sin":
                return curvatureParamIDs[1];

        // case 'test':
        //   return curvatureParamIDs[2];
        }
    })();


    // console.log(elementID);
    document.getElementById(elementID).className = "vis";
}

/**
 *
 */
async function showCurvatureInfo() {
    showCurvatureActivation();
    showCurvatureParameters();
}

/**
 *
 */
function typesetLift() {
    switch (liftSelection.value) {
        case "none":
            return "";
        case "sin":
            return "\\scriptstyle \\max\\{0,A \\cos(2 \\pi k_l (s+t+\\Phi))+1 \\}";
        case "exp":
            return "\\exp \\left( -A^{2} \\kappa^{2}\\right)";
    }
}

/**
 *
 */
function getLiftParams() {
    switch (liftSelection.value) {
        case "none":
            return new Map();
        case "sin":
            return new Map([
                ["lift_amp", parseFloat(liftSinAmplitude())],
                ["lift_wave_number", parseFloat(liftSinWaveNumber())],
                ["phase", parseFloat(liftSinPhase())]
            ]);
        case "exp":
            return new Map([["lift_a_value", parseFloat(liftExpCoeff())]]);
    }
}

/**
 *
 */
function getLiftMethodName() {
    switch (liftSelection.value) {
        case "none":
            return "no_lift";
        case "sin":
            return "sin_lift";
        case "exp":
            return "exp_lift";
    }
}

const liftParamIDs = ["liftNoneParams", "liftSinParams", "liftExpParams"];

/**
 *
 */
async function hideLiftParams() {
    liftParamIDs.forEach(
        elementID => {
            document.getElementById(elementID).className = "hide";
        }
    );
}

/**
 *
 */
async function showLiftActivation() {

    // await typeset(() => {
    //   // console.log(typeset_curvature());
    //   liftActivationReadout.innerHTML = typesetLift();
    //   return [ liftActivationReadout ];
    // });

    const math = MathJax.Hub.getAllJax(liftActivationReadout)[0];

    MathJax.Hub.Queue(["Text", math, typesetLift()]);
}

/**
 *
 */
async function showLiftParameters() {
    hideLiftParams();
    const elementID = (() => {
        switch (liftSelection.value) {
            case "none":
                return liftParamIDs[0];
            case "sin":
                return liftParamIDs[1];
            case "exp":
                return liftParamIDs[2];
        }
    })();


    // console.log(elementID);
    document.getElementById(elementID).className = "vis";
}

/**
 *
 */
async function showLiftInfo() {
    showLiftActivation();
    showLiftParameters();
}

/**
 *
 */
function froudeNumber() {
    return round(transform(froudeNumberSlider.value));
}

/**
 *
 */
function showFroudeNumber() {
    froudeNumberReadout.innerHTML = froudeNumber();
}

/**
 *
 */
function lateralFriction() {
    return round(transform(lateralFrictionSlider.value));
}

/**
 *
 */
function showLateralFriction() {
    lateralFrictionReadout.innerHTML = lateralFriction();
}

// function backwardFriction() {
//   return round(transform(backwardFrictionSlider.value))
// }
// function showBackwardFriction() {
//   backwardFrictionReadout.innerHTML = backwardFriction();
// }

/**
 *
 */
function sinAmplitude() {
    return round(transform(sinAmplitudeSlider.value));
}

/**
 *
 */
function showSinAmplitude() {
    sinAmplitudeReadout.innerHTML = sinAmplitude();
}

/**
 *
 */
function sinWaveNumber() {
    return parseInt(sinWaveNumberSlider.value);
}

/**
 *
 */
function showSinWaveNumber() {
    sinWaveNumberReadout.innerHTML = sinWaveNumber();
}

/**
 *
 */
function liftSinAmplitude() {

    // 0 to 200 in steps of 10, but without zeroing it out
    return round(parseInt(liftSinAmplitudeSlider.value) * 0.01);
}

/**
 *
 */
function showLiftSinAmplitude() {
    liftSinAmplitudeReadout.innerHTML = liftSinAmplitude();
}

// sin Wave number is now sine wave number ratio lambda
/**
 *
 */
function liftSinWaveNumber() {

    // always an integer, so parse an Int
    return sinWaveNumber() * parseInt(liftSinWaveNumberSlider.value);
}

/**
 *
 */
function showLiftSinWaveNumber() {
    liftSinWaveNumberReadout.innerHTML = liftSinWaveNumber();
}

/**
 *
 */
function liftSinPhase() {
    return round(parseFloat(liftSinPhaseSlider.value) * 0.01, precision = 2);
}

/**
 *
 */
function showLiftSinPhase() {
    liftSinPhaseReadout.innerHTML = liftSinPhase();
}

/**
 *
 */
function liftExpCoeff() {
    return round(parseFloat(liftExpCoeffSlider.value) * 0.1);
}

/**
 *
 */
function showLiftExpCoeff() {
    liftExpCoeffReadout.innerHTML = liftExpCoeff();
}

// selections
const curvatureSelection = document.querySelector("#curvatureSelection");
const liftSelection = document.querySelector("#liftSelection");
const archetypeSelection = document.querySelector("#archetypeSelection");

// sliders
const froudeNumberSlider = document.querySelector("#froudeNumberSlider");
const lateralFrictionSlider = document.querySelector("#lateralFrictionSlider");

// const backwardFrictionSlider =
//     document.querySelector("#backwardFrictionSlider");
const sinAmplitudeSlider = document.querySelector("#sinAmplitudeSlider");
const sinWaveNumberSlider = document.querySelector("#sinWaveNumberSlider");
const liftSinAmplitudeSlider =
    document.querySelector("#liftSinAmplitudeSlider");
const liftSinWaveNumberSlider =
    document.querySelector("#liftSinWaveNumberSlider");
const liftSinPhaseSlider = document.querySelector("#liftSinPhaseSlider");
const liftExpCoeffSlider = document.querySelector("#liftExpCoeffSlider");

// readouts for selections
const curvatureActivationReadout =
    document.querySelector("#curvatureActivationReadout");
const liftActivationReadout = document.querySelector("#liftActivationReadout");

// readouts for sliders
const froudeNumberReadout = document.querySelector("#froudeNumberReadout");
const lateralFrictionReadout =
    document.querySelector("#lateralFrictionReadout");

// const backwardFrictionReadout =
//     document.querySelector("#backwardFrictionReadout");
const sinAmplitudeReadout = document.querySelector("#sinAmplitudeReadout");
const sinWaveNumberReadout = document.querySelector("#sinWaveNumberReadout");
const liftSinAmplitudeReadout =
    document.querySelector("#liftSinAmplitudeReadout");
const liftSinWaveNumberReadout =
    document.querySelector("#liftSinWaveNumberReadout");
const liftSinPhaseReadout = document.querySelector("#liftSinPhaseReadout");
const liftExpCoeffReadout = document.querySelector("#liftExpCoeffReadout");

// button
const simulateButton = document.querySelector("#simulateButton");

// const resetButton = document.querySelector('#resetButton');

/**
 *
 */
function startSimulatorWithLoadingButton() {
    simulateButton.classList.add("button--loading");
    startSimulator();
    simulateButton.classList.remove("button--loading");
}

simulateButton.addEventListener("click", startSimulatorWithLoadingButton);

// resetButton.addEventListener('click', defaultSimulationParameters);

/**
 *
 */
function addListeners() {

    /**
     * @param {...any} fns
     */
    function reset_and_(...fns) {

        // return a closure
        return () => {
            fns.forEach(fn => fn());

        // startSimulatorWithLoadingButton();
        };
    }

    const slider_pairs = [
        [froudeNumberSlider, reset_and_(showFroudeNumber)],
        [lateralFrictionSlider, reset_and_(showLateralFriction)],

        // [ backwardFrictionSlider, reset_and_(showBackwardFriction) ],
        [sinAmplitudeSlider, reset_and_(showSinAmplitude)],
        [sinWaveNumberSlider, reset_and_(showSinWaveNumber)],
        [liftSinAmplitudeSlider, reset_and_(showLiftSinAmplitude)],
        [liftSinWaveNumberSlider, reset_and_(showLiftSinWaveNumber)],
        [liftSinPhaseSlider, reset_and_(showLiftSinPhase)],
        [liftExpCoeffSlider, reset_and_(showLiftExpCoeff)]
    ];

    slider_pairs.forEach(p => {

        // added back since we are not starting a new simulation everytime
        p[0].addEventListener("input", p[1]);
        p[0].addEventListener("change", p[1]);
    });

    const selection_pairs = [
        [curvatureSelection, reset_and_(showCurvatureInfo)],
        [liftSelection, reset_and_(showLiftInfo)],
        [archetypeSelection, reset_and_(defaultSimulationParameters)]
    ];

    selection_pairs.forEach(p => {
        p[0].addEventListener("change", p[1]);
    });
}

/**
 *
 */
async function reRenderMath() {
    showCurvatureInfo();
    showLiftInfo();
}

/**
 *
 */
function showStaticParameterInfo() {

    // physical parameters
    showFroudeNumber();
    showLateralFriction();

    // showBackwardFriction();
}

/**
 *
 */
function showParameterInfo() {

    reRenderMath().then(() => {
        showStaticParameterInfo();

        // curvature
        showSinAmplitude();
        showSinWaveNumber();

        // lift
        showLiftSinAmplitude();
        showLiftSinWaveNumber();
        showLiftSinPhase();

        showLiftExpCoeff();
    });
}

/* Plotting */
/**
 *
 */
function getPlotLayout() {
    return {
        xaxis: {
            title: "x",
            range: [-0.5, 2.5],
            zeroline: false

        // linecolor : 'black',
        // linewidth : 2,
        },
        yaxis: {
            title: "y",
            scaleanchor: "x",
            scaleratio: 1,
            range: [-0.5, 0.5],
            zeroline: false

            // linecolor : 'black',
            // linewidth : 2,
        },
        autosize: true,
        margin: { l: 40, r: 40, b: 40, t: 40 },
        showlegend: false
    };
}

// placehold plot
/**
 *
 */
function placeholderPlot() {

    // window.PlotlyConfig = {MathJaxConfig : 'local'};
    const plot = document.getElementById("plot_div");

    Plotly.newPlot(plot,
        [
            {
                x: [0],
                y: [0],
                mode: "lines",
                type: "scatter",

                // marker : {size : 30}
                line: { color: "rgb(219, 64, 82)", width: 3 }
            }
        ],
        getPlotLayout());
}

/**
 * @param data
 * @param col
 */
function assembleDataForPlot(data, col) {
    return [{
        x: data[0],
        y: data[1],
        mode: "lines",
        type: "scatter",
        line: { color: col, width: 3 }
    }];
}

// function staticPlot(all_data, all_com, all_alpha) {
//   plot_data = [];
//   for (var i = 0; i < all_data.length; ++i) {
//     const curr_alpha = all_alpha[i];

//     plot_data = plot_data.concat(
//         assembleDataForPlot(all_data[i], `rgba(41, 118, 187,
//         ${curr_alpha})`));
//   }

//   // add a scatter to the plot data
//   const com_x = all_com.map(res => res[0][0]);
//   const com_y = all_com.map(res => res[1][0]);

//   plot_data = plot_data.concat([ {
//     x : com_x,
//     y : com_y,
//     mode : 'lines',
//     type : 'scatter',
//     line : {color : 'rgb(0, 0, 0)', dash : 'dot', width : 1}
//     // marker : {size : 8, color : 'rgb(0, 0, 0)'}
//   } ]);

//   // console.log(plot_data);

//   Plotly.newPlot('plot_div', plot_data, getPlotLayout());
// }

/**
 * @param all_data
 * @param all_com
 * @param all_alpha
 */
function staticPlot(all_data, all_com, all_alpha) {
    plot_data = [];
    const plotDiv = document.getElementById("plot_div");

    // add a scatter to the plot data
    const com_x = all_com.map(res => res[0][0]);
    const com_y = all_com.map(res => res[1][0]);

    plot_data = [{
        x: com_x,
        y: com_y,
        mode: "lines",
        type: "scatter",
        line: { color: "rgb(0, 0, 0)", dash: "dot", width: 1 }

    // marker : {size : 8, color : 'rgb(0, 0, 0)'}
    }];

    // Plotly.newPlot(plotDiv, plot_data, getPlotLayout());

    // var i_counter = 0; // To keep under proper scope
    for (let i = 0; i < all_data.length; ++i) {
        setTimeout((data, alpha, index) => {
            const curr_alpha = alpha[index];

            Plotly.addTraces(
                plotDiv, assembleDataForPlot(data[index],
                    `rgba(41, 118, 187, ${curr_alpha})`)
            );
        }, 40, all_data, all_alpha, i);

        // const curr_alpha = all_alpha[i];

    // Plotly.addTraces(
    //     plotDiv,
    //     assembleDataForPlot(all_data[i], `rgba(41, 118, 187,
    //     ${curr_alpha})`));
    }

    Plotly.addTraces(plotDiv, plot_data);

    // console.log(plot_data);
}

// build up config
/**
 *
 */
async function buildSimulationConfig() {

    const froude = parseFloat(froudeNumber());
    const mu_f = parseFloat(1.0);

    // const mu_b = parseFloat(backwardFriction() * mu_f);

    // I set it to a default value since Mattia wants it
    const mu_b = 1.5;
    const mu_lat = parseFloat(lateralFriction() * mu_f);

    const physicalParams = new Map([
        ["froude", froude],
        ["mu_f", 1.0],
        ["mu_b", mu_b],
        ["mu_lat", mu_lat]
    ]);

    return new Map(
        [...physicalParams, ...getCurvatureParams(), ...getLiftParams()]
    );
}

/**
 *
 */
function defaultSimulationParameters() {

    // set default here
    // choose case from the drop down menu
    const defaults = (() => {
        switch (archetypeSelection.value) {
            case "ssid":
                return DefaultStraightSidewindingParameters;
            case "ssli":
                return DefaultStraightSlitheringParameters;
            case "tsli":
                return DefaultTurningSlitheringParameters;
            case "spin":
                return DefaultSpinningParameters;
            case "tsid":
                return DefaultTurningSidewindingParameters;

        // case 'test':
        //   return curvatureParamIDs[2];
        }
    })();

    // switch (.value) {
    // case 'none':
    //   return new Map();
    // case 'sin':
    //   return new Map([
    //     [ 'lift_amp', parseFloat(liftSinAmplitude()) ],
    //     [ 'lift_wave_number', parseFloat(liftSinWaveNumber()) ],
    //     [ 'phase', parseFloat(liftSinPhase()) ]
    //   ]);
    // case 'exp':
    //   return new Map([ [ 'lift_a_value', parseFloat(liftExpCoeff()) ] ]);
    // }

    // sliders
    froudeNumberSlider.value = defaults.defaultFroudeNumber();
    lateralFrictionSlider.value = defaults.defaultLateralFriction();
    sinAmplitudeSlider.value = defaults.defaultSinAmplitude();
    sinWaveNumberSlider.value = defaults.defaultSinWaveNumber();
    liftSinAmplitudeSlider.value = defaults.defaultLiftSinWaveAmplitude();
    liftSinWaveNumberSlider.value = defaults.defaultLiftSinWaveNumber();
    liftSinPhaseSlider.value = defaults.defaultLiftSinPhase();
    liftExpCoeffSlider.value = defaults.defaultLiftExpCoeff();

    showStaticParameterInfo();
    showParameterInfo();
}

// this function return the promise of pyodide runPython function
/**
 * @param final_time
 * @param n_points
 * @param config
 */
function generateSimulator(final_time, n_points, config) {

    // return gistFetchPromise.then(res => pyodide.runPython(res))
    //     .then(_ => { return pyodide.globals.walk(stepNumber); })
    // return new Promise(function(resolve, reject) {
    //   // var sim = new Simulator;
    //   resolve(new Simulator());
    // });

    const method_name = `simulate_snake_with_${getCurvatureMethodName()}_${
        getLiftMethodName()}`;


    // console.log(method_name);
    return fileFetchPromise.then(res => pyodide.runPython(res)).then(_ => pyodide.globals.get(method_name)(final_time, n_points, config));
}

// this function execute the animation
/**
 * @param config
 */
async function runSimulator(config) {
    const final_time = 24.0; // increases to twice the earlier amount
    const n_samples = 25;
    const com_n_samples = 3 * n_samples;
    const iters = linspace(0, com_n_samples, n_samples, endpoint = false);
    const com_iters = linspace(0, com_n_samples, com_n_samples, endpoint = false);

    // const times = linspace(0.0, final_time, n_samples, endpoint = false);

    simulatorPromise = generateSimulator(final_time, com_n_samples, config);

    simulatorPromise.then(sim => {

        // stores (4,) tuples
        const dataArr = new Array(n_samples);
        const comArr = new Array(com_n_samples);
        const alphaArr = new Array(n_samples);

        // populate the data_arr
        iters.forEach((sim_index, arr_index) => {
            const pyresult = sim.call(sim_index);
            const result = [...pyresult];

            pyresult.destroy();

            // console.log(result);
            const local_data = result.map(res => res.toJs());


            // console.log(local_data);
            // [2, 50] sort of an array
            dataArr[arr_index] = local_data;

            alphaArr[arr_index] = Math.pow(10, (arr_index / (n_samples - 1) - 1));
        });

        com_iters.forEach(index => {

            // dataArr[index] = sim.call(index);
            const pyCOMresult = sim.com(index);

            // (2, ) float
            const COMresult = [...pyCOMresult];

            pyCOMresult.destroy();

            comArr[index] = COMresult.map(res => res.toJs());
        });

        // clear the plot first
        placeholderPlot();

        // with this data array
        staticPlot(dataArr, comArr, alphaArr);
    });
}

/**
 *
 */
async function startSimulator() {
    const config = await buildSimulationConfig();

    console.log(config);
    runSimulator(config);
}

// Finally initialize the engine
// Interface to python
/* Initialization functions*/

// dynamically load the script on demand
class ScriptLoader {
    constructor(script) {
        this.script = script;
        this.scriptElement = document.createElement("script");
        this.head = document.querySelector("head");
    }

    load() {
        return new Promise((resolve, reject) => {
            this.scriptElement.src = this.script;
            this.scriptElement.onload = e => resolve(e);
            this.scriptElement.onerror = e => reject(e);
            this.head.appendChild(this.scriptElement);
        });
    }
}

// async function to fetch the raw content of the gist
/**
 * @param filename
 */
async function fetchFile(filename) {

    // const gistID = 'ea4b6c8e831ff923640aeda185241d14'
    // const url = `https://api.github.com/gists/${gistID}`
    // const fileName = "random_walk_2d.py"

    const rawContent = await fetch(filename)

    // .then(res => res.json())
        .then(data =>

        // console.log(data.text());
            data.text()

            // return data.files[fileName].content;
        );

    // console.log(rawContent);

    return rawContent;
}

/**
 *
 */
async function init() {
    initButton.classList.add("button--loading");

    // loadingIndicator.classList.add('mr-2', 'progressAnimate');
    const loader = new ScriptLoader(
        "https://cdn.jsdelivr.net/pyodide/v0.17.0/full/pyodide.js"
    );

    await loader.load();
    await loadPyodide(
        { indexURL: "https://cdn.jsdelivr.net/pyodide/v0.17.0/full/" }
    );
    await pyodide.loadPackage(["numpy", "scipy", "sympy"]);

    // loader.load()
    //     .then(
    //         e => {
    //             loadPyodide(
    //                 {indexURL :
    //                 "https://cdn.jsdelivr.net/pyodide/v0.17.0/full/"})
    //                 .then(
    //                     () => {
    //                         pyodide
    //                             .loadPackage([
    //                               'numpy',
    //                               'scipy',
    //                             ])
    //                             // .then(() => {pyodide.runPythonAsync(`
    //                             //           import micropip; await
    //                             //
    //                             micropip.install('parallel_slab-1.0.0-py3-none-any.whl');
    //                             //           import parallel_slab
    //                             //            `)})
    //                             .then(() => {
    //                               console.log("Numpy, Scipy is now
    //                               available");
    //                               // reset styles of buttons
    //                               loadingIndicator.classList.remove(
    //                                   'mr-2', 'progressAnimate');
    //                               startButton.removeAttribute('disabled');
    //                               pauseButton.removeAttribute('disabled');
    //                               resetButton.removeAttribute('disabled');
    //                             })})})
    //     .catch(e => {console.log(e)});
    await pyodide.runPythonAsync(
        "import micropip; await micropip.install('kinematic_snake_core-1.0.0-py3-none-any.whl');"
    );

    console.log("Numpy, Scipy, Sympy is now available ");

    // reset styles of buttons
    // loadingIndicator.classList.remove('mr-2', 'progressAnimate');
    simulateButton.removeAttribute("disabled");

    // pauseButton.removeAttribute('disabled');
    // resetButton.removeAttribute('disabled');

    curvatureSelection.removeAttribute("disabled");
    liftSelection.removeAttribute("disabled");
    archetypeSelection.removeAttribute("disabled");

    // now change the curvature and lift selection to sin
    curvatureSelection.selectedIndex = 1; // select sin
    liftSelection.selectedIndex = 1; // select sin lift
    archetypeSelection.selectedIndex = 0; // select straight sidewinding

    // show all info
    showParameterInfo();

    initButton.classList.remove("button--loading");
}

const initButton = document.querySelector("#initButton");

initButton.addEventListener("click", init, { once: true });

// placeholder plot
addListeners();

// display at first go
MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
defaultSimulationParameters();

// showStaticParameterInfo();

placeholderPlot();

// perform the gist fetching
const fileFetchPromise = fetchFile("snake_sandbox.py");
