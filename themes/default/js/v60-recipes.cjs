// Pure V60 pour-over recipe math. Loaded as a plain <script> in the browser
// (attaches to globalThis.V60Recipes) and imported by Vitest (module.exports).
// No import/export — this file is concatenated into the JS bundle.
(function () {
    function r(n) { return Math.round(n); }

    function tetsu(c, w, taste, strength) {
        var firstPart = r(0.4 * w);
        var first = r(({ sweet: 2, standard: 3, bright: 4 }[taste] || 3) * c);
        var steps = [
            { number: 1, time: "0:00", amount: first, cumulative: first, accent: "cyan" },
            { number: 2, time: "0:45", addAmount: Math.max(0, firstPart - first), cumulative: firstPart, accent: "cyan" },
        ];
        var counts = { light: 1, medium: 2, strong: 3 }[strength] || 3;
        var times = ["1:30", "2:15", "2:45"];
        var prev = firstPart;
        for (var i = 1; i <= counts; i++) {
            var target = (i === counts) ? w : firstPart + r((w - firstPart) * i / counts);
            steps.push({
                number: 2 + i,
                time: times[i - 1],
                addAmount: Math.max(0, target - prev),
                cumulative: target,
                accent: "accent",
            });
            prev = target;
        }
        return steps;
    }

    function hoffmann(c, w) {
        var firstPart = r(0.6 * w);
        var bloom = r(2 * c);
        return [
            { number: 1, time: "0:00", amount: bloom, cumulative: bloom, accent: "cyan" },
            { number: 2, time: "0:45", addAmount: Math.max(0, firstPart - bloom), cumulative: firstPart, accent: "cyan" },
            { number: 3, time: "1:15", timeLabel: "1:15 → 1:45", addAmount: Math.max(0, w - firstPart), cumulative: w, accent: "accent" },
            { number: 4, time: "1:45", message: "Stir one round, then another in reverse." },
            { number: 5, message: "Midway through the drawdown, swirl the V60 to flatten the bed." },
        ];
    }

    function switchBrew(w) {
        return [
            { number: 1, time: "0:00", amount: w, cumulative: w, message: "Pour all the water. Steep for 2 minutes.", accent: "cyan" },
            { number: 2, time: "2:00", message: "Stir, then wait 15 seconds." },
            { number: 3, time: "2:15", message: "Open the switch and let it draw down." },
        ];
    }

    function iced(c, w) {
        var ice = r(0.6 * w);
        var hot = r(0.4 * w); // total hot-water budget
        var bloom = Math.min(r(3 * c), hot); // never exceed the budget
        return [
            { number: 1, time: "0:00", amount: ice, cumulative: ice, message: "Add " + ice + " ml as ice to the carafe.", accent: "accent" },
            { number: 2, time: "0:00", amount: bloom, cumulative: bloom, message: "Bloom with hot water.", accent: "cyan" },
            { number: 3, time: "2:00", addAmount: Math.max(0, hot - bloom), cumulative: hot, message: "Add the rest in 50 ml increments.", accent: "cyan" },
        ];
    }

    function steps(state) {
        var c = Math.max(0, +state.coffee || 0);
        var w = Math.max(0, +state.water || 0);
        switch (state.method) {
            case "tetsu":    return tetsu(c, w, state.taste, state.strength);
            case "hoffmann": return hoffmann(c, w);
            case "switch":   return switchBrew(w);
            case "iced":     return iced(c, w);
            default:         return [];
        }
    }

    var V60Recipes = { steps: steps, tetsu: tetsu, hoffmann: hoffmann, switchBrew: switchBrew, iced: iced };

    if (typeof globalThis !== "undefined") { globalThis.V60Recipes = V60Recipes; }
    if (typeof module !== "undefined" && module.exports) { module.exports = V60Recipes; }
})();
